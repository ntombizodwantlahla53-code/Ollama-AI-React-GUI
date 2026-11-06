
import { useEffect, useState } from "react";
import styles from "./Chat.module.css";

type Message = {
  role: "user" | "assistant";
  content: string;
  duration?: number;
  tokensPerSecond?: number;
};
export function chat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem("smolchat_messages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("smolchat_messages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!prompt.trim()) return;

    const userMessage = prompt;
    setMessages((previousMessages) => [
      ...previousMessages,
      { role: "user", content: userMessage }
    ]);
    setPrompt("");
    setLoading(true);

    try {
      const result = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "smollm2:360m",
          system:"You are SmolChat, a helpful AI assistant. The user's name is Ntombizodwa Ntlahla. When asked who the user is, answer that their name is Ntombizodwa Ntlahla. Give clear and simple answers.",
          prompt: userMessage,
          stream: false
        })
      });
      const data = await result.json();

      if (!result.ok) {
        throw new Error("AI request failed");
      }
      const duration = data.total_duration / 1000000000;
      const tokensPerSecond = data.eval_count / (data.eval_duration / 1000000000);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content: data.response,
          duration: duration,
          tokensPerSecond: tokensPerSecond
        }
      ]);
    } catch {
      setMessages((previousMessages) => [
        ...previousMessages,
        { role: "assistant", content: "Could not connect to Ollama." }
      ]);
    }
    setLoading(false);
  };

  return (
    <div className={styles.chat}>
      <div className={styles.messages}>
        {messages.map((message, index) => (
          <div key={index}
            className={message.role === "user" ? styles.userMessage : styles.aiMessage}>
            <p>{message.content}</p>
            {message.duration !== undefined && (
              <small>
                Duration: {message.duration.toFixed(2)} seconds |
                Tokens/sec: {message.tokensPerSecond?.toFixed(2)}
              </small>
            )}
          </div>
        ))}

        {loading && (
          <div className={styles.loading}>
            <span></span>SmolChat is thinking...</div>
        )}
      </div>

      <div className={styles.inputArea}>
        <input value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && sendMessage()}
          placeholder="Ask SmolChat anything..."
        />
        <button onClick={sendMessage} disabled={loading}>Send</button>
      </div>
    </div>
  );
}
export default chat;
