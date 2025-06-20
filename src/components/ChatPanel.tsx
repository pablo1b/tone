import React, { useEffect, useRef } from 'react';
import { type ChatMessage } from '../services/claudeService';
import { MarkdownRenderer } from './MarkdownRenderer';

interface ChatPanelProps {
  messages: ChatMessage[];
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  isChatLoading: boolean;
  isValidKey: boolean;
  onShowApiKeyModal: () => void;
  onClearMessages: () => void;
}

export function ChatPanel({ 
  messages, 
  inputMessage, 
  setInputMessage, 
  onSendMessage, 
  isChatLoading,
  isValidKey, 
  onShowApiKeyModal, 
  onClearMessages 
}: ChatPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isChatLoading]);

  return (
    <section style={{ maxWidth: '400px' }}>
      <header>
        <div style={{ justifyContent: 'flex-end' }}>
        <div>
            {isValidKey ? (
              <div>
                <p>Claude 4</p>
                <small style={{ color: 'var(--text-muted)' }}>
                  {messages.length}/20 messages
                </small>
              </div>
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
          <button onClick={onClearMessages} style={{ outline: 'auto' }}>
            Clear
          </button>
        </div>
      </header>

        {messages.map((message) => (
          <div key={message.id} style={{ flex: 0, flexDirection: 'column', gap: 0 }}>
            <MarkdownRenderer>{message.content}</MarkdownRenderer>
            <small style={{ color: 'var(--text-muted)' }}>{message.timestamp}</small>
          </div>
        ))}

        {isChatLoading && (
          <div style={{ flex: 0, flexDirection: 'column', gap: 0 }}>
            <p style={{ color: 'var(--text-muted)' }}>
              <em className="thinking">Thinking</em>
            </p>
          </div>
        )}

        <div ref={messagesEndRef} />

        <div style={{ flexGrow: 0, position: 'sticky', bottom: 0, backgroundColor: 'var(--bg-primary)' }}>
          <form onSubmit={onSendMessage}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about Tone.js, request code examples, or get help..."
            />
            <button type="submit" disabled={!inputMessage.trim() || !isValidKey || isChatLoading}>
              {isChatLoading ? 'Loading...' : 'Send'}
            </button>
          </form>
        </div>
    </section>
  );
} 