import React, { useState } from 'react';
import { musicEngine } from './musicEngine';

function App() {
  const [code, setCode] = useState(musicEngine.getDefaultCode());

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m here to help you with Tone.js. What would you like to create?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');

  const handleRunCode = async () => {
    const result = await musicEngine.executeCode(code);

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: 'Ran the code in the editor',
      timestamp: new Date().toLocaleTimeString()
    };

    if (result.success) {
      const response = {
        id: messages.length + 2,
        type: 'assistant',
        content: '🎵 Great! Your Tone.js code has been executed successfully. The audio should be playing now. You can modify the code and run it again to hear the changes!',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, newMessage, response]);
    } else {
      const errorResponse = {
        id: messages.length + 2,
        type: 'assistant',
        content: `❌ There was an error in your code: ${result.error}. Please check your syntax and try again.`,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, newMessage, errorResponse]);
    }
  };

  const handleStopCode = () => {
    musicEngine.stopAudio();

    const stopMessage = {
      id: messages.length + 1,
      type: 'assistant',
      content: '⏹️ Audio stopped and all synths disposed.',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, stopMessage]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    // Simulate AI response
    const aiResponse = {
      id: messages.length + 2,
      type: 'assistant',
      content: `I understand you want to work with: "${inputMessage}". Here are some suggestions for your Tone.js code...`,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage, aiResponse]);
    setInputMessage('');
  };

  return (
    <main>
      <section>
        <header>
          <div>
            <p>Musical Agent</p>
          </div>
          <div style={{ flexGrow: 0 }}>
            <button onClick={handleRunCode}>
              Play
            </button>
            <button
              onClick={handleStopCode}
              disabled={!musicEngine.getIsPlaying()}
            >
              Stop
            </button>
            <button onClick={() => setCode('')} className="outline">
              Clear
            </button>
          </div>
        </header>

        <article>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your Tone.js code here..."
          />
        </article>
      </section>

      <section>
        <header>
          <div style={{ justifyContent: 'flex-end' }}>
            <button onClick={() => { }} className="outline">
              Clear
            </button>
          </div>
        </header>

          {messages.map((message) => (
            <div key={message.id}>
              <p>{message.content}</p>
              <small>{message.timestamp}</small>
            </div>
          ))}

          <div style={{ flexGrow: 0 }}>
            <form onSubmit={handleSendMessage}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about Tone.js, request code examples, or get help..."
              />
              <button type="submit" disabled={!inputMessage.trim()}>
                Send
              </button>
            </form>
          </div>
      </section>
    </main>
  );
}

export default App;
