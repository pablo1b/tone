import React from 'react';
import { type ChatMessage } from '../services/claudeService';

interface ChatPanelProps {
  messages: ChatMessage[];
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  isLoading: boolean;
  isValidKey: boolean;
  onShowApiKeyModal: () => void;
  onClearMessages: () => void;
}

export function ChatPanel({ 
  messages, 
  inputMessage, 
  setInputMessage, 
  onSendMessage, 
  isLoading, 
  isValidKey, 
  onShowApiKeyModal, 
  onClearMessages 
}: ChatPanelProps) {
  return (
    <section style={{ maxWidth: '400px' }}>
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
              onClick={onShowApiKeyModal}
              aria-label="API Settings"
              title="Configure Claude API Key"
            >
              Settings
            </button>
          <button onClick={onClearMessages} className="outline">
            Clear
          </button>
        </div>
      </header>

        {messages.map((message) => (
          <div key={message.id} style={{ flex: 0, flexDirection: 'column', gap: 0 }}>
            <p>{message.content}</p>
            <small style={{ color: 'var(--text-muted)' }}>{message.timestamp}</small>
          </div>
        ))}

        <div style={{ flexGrow: 0 }}>
          <form onSubmit={onSendMessage}>
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
  );
} 