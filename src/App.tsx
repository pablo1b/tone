import React, { useState, useRef } from 'react';
import * as Tone from 'tone';

function App() {
  const [code, setCode] = useState(`// Welcome to Tone.js playground!
// Try creating a simple synth:

const synth = new Tone.Synth().toDestination();

// Play a note
synth.triggerAttackRelease("C4", "8n");

// Create a sequence
const seq = new Tone.Sequence((time, note) => {
  synth.triggerAttackRelease(note, 0.1, time);
}, ["C4", "E4", "G4", "B4"]).start(0);

// Start the transport
Tone.Transport.start();`);

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m here to help you with Tone.js. What would you like to create?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const executionContextRef = useRef<Record<string, unknown>>({});

  const handleRunCode = async () => {
    try {
      // Ensure audio context is started
      if (Tone.context.state !== 'running') {
        await Tone.start();
      }

      // Stop any currently playing audio
      Tone.Transport.stop();
      Tone.Transport.cancel();

      // Clear previous synths and effects
      Object.values(executionContextRef.current).forEach((item: unknown) => {
        if (item && typeof item === 'object' && 'dispose' in item && typeof item.dispose === 'function') {
          item.dispose();
        }
      });
      executionContextRef.current = {};

      // Create a safe execution context with Tone.js available
      const executeCode = new Function('Tone', 'context', `
        ${code}
        return { Tone, context };
      `);

      // Execute the code
      const result = executeCode(Tone, executionContextRef.current);
      executionContextRef.current = result.context || {};

      setIsPlaying(true);

      // Add success message to chat
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        content: 'Ran the code in the editor',
        timestamp: new Date().toLocaleTimeString()
      };

      const response = {
        id: messages.length + 2,
        type: 'assistant',
        content: '🎵 Great! Your Tone.js code has been executed successfully. The audio should be playing now. You can modify the code and run it again to hear the changes!',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, newMessage, response]);

    } catch (error) {
      console.error('Error executing code:', error);

      const errorMessage = {
        id: messages.length + 1,
        type: 'user',
        content: 'Attempted to run code',
        timestamp: new Date().toLocaleTimeString()
      };

      const errorResponse = {
        id: messages.length + 2,
        type: 'assistant',
        content: `❌ There was an error in your code: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your syntax and try again.`,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, errorMessage, errorResponse]);
    }
  };

  const handleStopCode = () => {
    try {
      Tone.Transport.stop();
      Tone.Transport.cancel();

      // Dispose of all created objects
      Object.values(executionContextRef.current).forEach((item: unknown) => {
        if (item && typeof item === 'object' && 'dispose' in item && typeof item.dispose === 'function') {
          item.dispose();
        }
      });

      setIsPlaying(false);

      const stopMessage = {
        id: messages.length + 1,
        type: 'assistant',
        content: '⏹️ Audio stopped and all synths disposed.',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, stopMessage]);
    } catch (error) {
      console.error('Error stopping audio:', error);
    }
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
          <fieldset>
            <button onClick={handleRunCode}>
              Play
            </button>
            <button
              onClick={handleStopCode}
              disabled={!isPlaying}
            >
              Stop
            </button>
            <button onClick={() => setCode('')}>
              Clear
            </button>
          </fieldset>
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
          <p>Chat music</p>
          <fieldset>
            <button onClick={() => { }}>
              Clear
            </button>
          </fieldset>
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
