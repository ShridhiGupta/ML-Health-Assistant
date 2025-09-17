import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import InputBox from "./components/InputBox";
import "./styles/App.css";

function App() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (text) => {
    setMessages([...messages, { sender: "user", text }]);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { sender: "bot", text: data.text }]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: "Sorry, something went wrong." }
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1 className="chat-title">LifeSense AI Chatbot</h1>
      <ChatWindow messages={messages} />
      <InputBox onSend={handleSend} disabled={loading} />
    </div>
  );
}

export default App;