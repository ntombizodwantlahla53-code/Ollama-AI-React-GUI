import {chat as Chat} from "./components/chat/chat";
import Logo from './assets/download (3).jpg'
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1><img src={Logo} className="framework" alt="React logo" /> Smol AI</h1>
      <p>MY personal AI assistant</p>
      <Chat />
    </div>
  );
}

export default App;


