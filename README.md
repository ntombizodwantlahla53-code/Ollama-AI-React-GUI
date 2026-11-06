# Ollama AI React GUI

<img src="https://socialify.git.ci/ntombizodwantlahla53-code/Ollama-AI-React-GUI/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="Ollama-AI-React-GUI" width="640" height="320" />

# Project Description
```
 This project is a simple React frontend that communicates with a locally running Ollama instance, allowing you to chat with powerful language models directly from your web browser.
```

## Features
```
Chat with a locally running AI model.
Simple and user-friendly interface.
Custom system message to define the AI's name and purpose.
Save and load conversations using LocalStorage.
Display AI response duration.
Display tokens generated per second.
Loading indicator while waiting for AI responses.
```
## Technologies Used
```
React
JavaScript
CSS
Ollama
LocalStorage
```

## Requirements
```
Before running the project, make sure you have installed:
Node.js
Ollama
You will also need to download an AI model from the Ollama Library. Choose a model that is less than 1 GB in size.
```

## Installation and Setup

1. Clone the Repository
git clone https://github.com/ntombizodwantlahla53-code/Ollama-AI-React-GUI.git
2. Open the Project Folder
cd Ollama-AI-React-GUI
3. Install Dependencies
npm install


## Download an AI Model
```
Choose an AI model from the Ollama Library and download it.
For example, this project can use SmolLM2:

> ollama pull smollm2:360m

2. Start Ollama

Make sure Ollama is installed and running on your computer.
To check your downloaded models, run:
> ollama list
```

## Run the React Application

Start the development server:
npm run dev
Open the local URL provided by Vite in your browser to use the application.
Ollama API

The application communicates with Ollama through the following API endpoint:
http://localhost:11434/api/generate

Ollama receives the user's prompt, processes it using the selected AI model and returns a response.

How the Application Works
The user enters a message in the chat interface.
The application sends the prompt to the Ollama API.
Ollama processes the request using the selected AI model.
The AI-generated response appears in the chat.
The application displays the response duration and tokens per second.
Conversations are saved in LocalStorage and loaded again when the page is refreshed.