import React, { useEffect, useState } from 'react';
import { enhancedClaudeService } from './services/enhancedClaudeService';
import { codeActionService } from './services/codeActionService';
import { ApiKeySettings } from './components/ApiKeySettings';
import { Modal } from './components/Modal';
import { CodeEditor } from './components/CodeEditor';
import { ChatPanel } from './components/ChatPanel';
import { useApiKey } from './hooks/useApiKey';
import { AppProvider } from './context/AppContext';
import { useAppContext } from './context/useAppContext';

function AppContent() {
  const { state, updateCode, executeCode, stopAudio, addMessage, clearMessages, setChatLoading } = useAppContext();
  const [inputMessage, setInputMessage] = useState('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const { apiKey, isValidKey, saveApiKey, clearApiKey } = useApiKey();

  // Initialize Claude service with existing API key on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('anthropic_api_key');
    if (savedKey && savedKey.startsWith('sk-ant-')) {
      enhancedClaudeService.updateApiKey(savedKey);
    }
  }, []);

  useEffect(() => {
    if (isValidKey && apiKey) {
      enhancedClaudeService.updateApiKey(apiKey);
    }
  }, [apiKey, isValidKey]);

  useEffect(() => {
    if (!isValidKey) {
      setShowApiKeyModal(true);
    } else {
      setShowApiKeyModal(false);
    }
  }, [isValidKey]);

  // Set up code action service callbacks
  useEffect(() => {
    codeActionService.setCallbacks({
      updateCode: (code: string) => updateCode(code, 'claude'),
      executeCode,
      stopAudio,
      getCurrentCode: () => state.code,
      getAppState: () => ({
        isPlaying: state.isPlaying,
        executionHistory: state.executionHistory
      })
    });
  }, [updateCode, executeCode, stopAudio, state.code, state.isPlaying, state.executionHistory]);

  const handleRunCode = async () => {
    addMessage({
      type: 'user',
      content: 'Ran the code in the editor'
    });
    await executeCode();
  };

  const handleStopCode = () => {
    stopAudio();
  };

  const handleApiKeyValidated = (apiKey: string) => {
    const success = saveApiKey(apiKey);
    if (success) {
      enhancedClaudeService.updateApiKey(apiKey);
    }
  };

  const handleCloseApiKeyModal = () => {
    setShowApiKeyModal(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !isValidKey) return;

    addMessage({
      type: 'user',
      content: inputMessage
    });

    setInputMessage('');
    setChatLoading(true);

    try {
      const response = await enhancedClaudeService.sendMessage({
        message: inputMessage,
        currentCode: state.code,
        messages: state.messages,
        appState: {
          isPlaying: state.isPlaying,
          executionHistory: state.executionHistory
        }
      });

      if (response.success) {
        addMessage({
          type: 'assistant',
          content: response.message || 'Action completed successfully'
        });

        // If code was updated and Claude also executed it, we don't need to show additional messages
        // as the execution feedback is already handled in the context
      } else {
        addMessage({
          type: 'assistant',
          content: `Error: ${response.error}`
        });
      }
    } catch (error) {
      addMessage({
        type: 'assistant',
        content: `Failed to get response from Claude: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <main>
      <CodeEditor 
        code={state.code}
        setCode={(code) => updateCode(code, 'user')}
        onRunCode={handleRunCode}
        onStopCode={handleStopCode}
      />

      <ChatPanel 
        messages={state.messages}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        onSendMessage={handleSendMessage}
        isChatLoading={state.isChatLoading}
        isValidKey={isValidKey}
        onShowApiKeyModal={() => setShowApiKeyModal(true)}
        onClearMessages={clearMessages}
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

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
