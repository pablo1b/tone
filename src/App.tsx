import React, { useState, useEffect } from 'react';
import { musicEngine } from './musicEngine';
import { claudeService, type ChatMessage } from './services/claudeService';
import { ApiKeySettings } from './components/ApiKeySettings';
import { Modal } from './components/Modal';
import { CodeEditor } from './components/CodeEditor';
import { ChatPanel } from './components/ChatPanel';
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
  const { apiKey, isValidKey, saveApiKey, clearApiKey } = useApiKey();

  // Initialize Claude service with existing API key on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('anthropic_api_key');
    if (savedKey && savedKey.startsWith('sk-ant-')) {
      claudeService.updateApiKey(savedKey);
    }
  }, []);

  useEffect(() => {
    if (isValidKey && apiKey) {
      claudeService.updateApiKey(apiKey);
    }
  }, [apiKey, isValidKey]);

  useEffect(() => {
    if (!isValidKey) {
      setShowApiKeyModal(true);
    } else {
      setShowApiKeyModal(false);
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
    const success = saveApiKey(apiKey);
    if (success) {
      claudeService.updateApiKey(apiKey);
    }
  };

  const handleCloseApiKeyModal = () => {
    setShowApiKeyModal(false);
  };

  const handleClearMessages = () => {
    setMessages([
      {
        id: 1,
        type: 'assistant',
        content: 'Hello! I\'m here to help you with Tone.js. What would you like to create?',
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
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
      <CodeEditor 
        code={code}
        setCode={setCode}
        onRunCode={handleRunCode}
        onStopCode={handleStopCode}
      />

      <ChatPanel 
        messages={messages}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        isValidKey={isValidKey}
        onShowApiKeyModal={() => setShowApiKeyModal(true)}
        onClearMessages={handleClearMessages}
      />

      <Modal 
        isOpen={showApiKeyModal} 
        onClose={handleCloseApiKeyModal}
        title="Claude 4 API Configuration"
      >
        <ApiKeySettings 
          onKeyValidated={handleApiKeyValidated} 
          onClose={handleCloseApiKeyModal}
          isValidKey={isValidKey}
          onClearKey={clearApiKey}
        />
      </Modal>
    </main>
  );
}

export default App;
