import React, { useState, useRef } from 'react';
import * as Tone from 'tone';
import {
  Main, Section, Header, Footer, Article, Div, Button,
  Input, Textarea, Form,
  P, H3, Time
} from './components';

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
    <Main flex flexDirection="row">
      {/* Left Panel - Code Editor */}
      <Section panel flex flexDirection="column" style={{ flex: 1, borderRight: '1px solid #e5e7eb' }}>
        <Header bordered flex justifyContent="between" alignItems="center" padding="md">
          <H3>Tone.js Code Editor</H3>
          <Div flex gap="sm">
            <Button variant="primary" size="small" onClick={handleRunCode}>
              ▶ Run Code
            </Button>
            <Button 
              variant="secondary" 
              size="small" 
              onClick={handleStopCode}
              disabled={!isPlaying}
            >
              ⏹ Stop
            </Button>
            <Button variant="secondary" size="small" onClick={() => setCode('')}>
              Clear
            </Button>
          </Div>
        </Header>

        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{
            flex: 1,
            fontFamily: 'Monaco, Consolas, "Courier New", monospace',
            fontSize: '14px',
            lineHeight: '1.5',
            resize: 'none',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            padding: '1rem'
          }}
          placeholder="Write your Tone.js code here..."
        />
      </Section>

      {/* Right Panel - LLM Chatbot */}
      <Section panel flex flexDirection="column" style={{ flex: 1 }}>
        <Header bordered padding="md">
          <H3>Tone.js Assistant</H3>
          <P size="small" variant="muted">Ask me anything about Tone.js!</P>
        </Header>

        {/* Chat Messages */}

        {messages.map((message) => (
          <Article
            key={message.id}
            card={message.type === 'assistant'}
            elevated={message.type === 'assistant'}
            style={{
              alignSelf: message.type === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              backgroundColor: message.type === 'user' ? '#3b82f6' : undefined,
              color: message.type === 'user' ? 'white' : undefined
            }}
          >
            <P variant={message.type === 'assistant' ? 'default' : undefined}>
              {message.content}
            </P>
            <Time
              variant="subtle"
              size="small"
              style={{
                color: message.type === 'user' ? 'rgba(255,255,255,0.8)' : undefined
              }}
            >
              {message.timestamp}
            </Time>
          </Article>
        ))}

        {/* Chat Input */}
        <Footer bordered padding="md">
          <Form onSubmit={handleSendMessage}>
            <Div flex gap="sm">
              <Input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about Tone.js, request code examples, or get help..."
                style={{ flex: 1 }}
              />
              <Button type="submit" variant="primary" disabled={!inputMessage.trim()}>
                Send
              </Button>
            </Div>
          </Form>
        </Footer>
      </Section>
    </Main>
  );
}

export default App;
