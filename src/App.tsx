import React, { useState, useEffect } from 'react';
import { musicEngine } from './musicEngine';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { claudeService, type ChatMessage } from './services/claudeService';
import { ApiKeySettings } from './components/ApiKeySettings';
import { Modal } from './components/Modal';
import { useApiKey } from './hooks/useApiKey';

function App() {
  const [code, setCode] = useState(musicEngine.getDefaultCode());
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m here to help you with Tone.js. What would you like to create?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const { apiKey, isValidKey } = useApiKey();

  useEffect(() => {
    if (isValidKey && apiKey) {
      claudeService.updateApiKey(apiKey);
    }
  }, [apiKey, isValidKey]);

  useEffect(() => {
    // Open modal by default if no API key is present
    if (!isValidKey) {
      setShowApiKeyModal(true);
    }
  }, [isValidKey]);

  const handleRunCode = async () => {
    const result = await musicEngine.executeCode(code);

    const newMessage: ChatMessage = {
      id: messages.length + 1,
      type: 'user',
      content: 'Ran the code in the editor',
      timestamp: new Date().toLocaleTimeString()
    };

    if (result.success) {
      const response: ChatMessage = {
        id: messages.length + 2,
        type: 'assistant',
        content: 'Great! Your Tone.js code has been executed successfully. The audio should be playing now. You can modify the code and run it again to hear the changes!',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, newMessage, response]);
    } else {
      const errorResponse: ChatMessage = {
        id: messages.length + 2,
        type: 'assistant',
        content: `Error: There was an error in your code: ${result.error}. Please check your syntax and try again.`,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, newMessage, errorResponse]);
    }
  };

  const handleStopCode = () => {
    musicEngine.stopAudio();

    const stopMessage: ChatMessage = {
      id: messages.length + 1,
      type: 'assistant',
      content: 'Audio stopped and all synths disposed.',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, stopMessage]);
  };

  const handleApiKeyValidated = (apiKey: string) => {
    claudeService.updateApiKey(apiKey);
  };

  const handleCloseApiKeyModal = () => {
    setShowApiKeyModal(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !isValidKey) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await claudeService.sendMessage({
        message: inputMessage,
        currentCode: code,
        messages: messages
      });

      const aiResponse: ChatMessage = {
        id: messages.length + 2,
        type: 'assistant',
        content: response.success 
          ? response.message || 'No response from Claude'
          : `Error: ${response.error}`,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      const errorResponse: ChatMessage = {
        id: messages.length + 2,
        type: 'assistant',
        content: `Failed to get response from Claude: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
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
          <CodeMirror
            value={code}
            onChange={(value) => setCode(value)}
            extensions={[javascript()]}
            theme={oneDark}
            placeholder="Write your Tone.js code here..."
            basicSetup={{
              lineNumbers: true,
              foldGutter: true,
              dropCursor: false,
              allowMultipleSelections: false,
            }}
            style={{
              fontSize: '14px',
              border: '1px solid var(--pico-border-color)',
              borderRadius: 'var(--pico-border-radius)',
              minHeight: '300px'
            }}
          />
        </article>
      </section>

      <section>
        <header>
          <div style={{ justifyContent: 'flex-end' }}>
          <div>
              {isValidKey ? (
                <p>
                  Claude 4
                </p>
              ) : (
                <b>
                  API Key Required
                </b>
              )}
            </div>
            <button 
                onClick={() => setShowApiKeyModal(true)}
                aria-label="API Settings"
                title="Configure Claude API Key"
              >
                Settings
              </button>
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
              <button type="submit" disabled={!inputMessage.trim() || !isValidKey || isLoading}>
                {isLoading ? 'Loading...' : 'Send'}
              </button>
            </form>
          </div>
      </section>

      <Modal 
        isOpen={showApiKeyModal} 
        onClose={handleCloseApiKeyModal}
        title="Claude 4 API Configuration"
      >
        <ApiKeySettings 
          onKeyValidated={handleApiKeyValidated} 
          onClose={handleCloseApiKeyModal}
        />
      </Modal>
    </main>
  );
}

export default App;
