import React, { useState } from 'react';

interface ApiKeySettingsProps {
  onKeyValidated: (apiKey: string) => void;
  onClose: () => void;
  isValidKey?: boolean;
  onClearKey?: () => void;
}

export const ApiKeySettings: React.FC<ApiKeySettingsProps> = ({ 
  onKeyValidated, 
  onClose, 
  isValidKey = false,
  onClearKey 
}) => {
  const [inputKey, setInputKey] = useState('');
  const [error, setError] = useState('');

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const trimmedKey = inputKey.trim();
    if (trimmedKey.startsWith('sk-ant-')) {
      onKeyValidated(trimmedKey);
      setInputKey('');
      onClose();
    } else {
      setError('Invalid API key. Please enter a valid Anthropic API key starting with "sk-ant-"');
    }
  };

  const handleClearKey = () => {
    if (onClearKey) {
      onClearKey();
    }
    setInputKey('');
    setError('');
  };

  return (
    <section>
        <p>
          To use Claude 4 Opus for intelligent Tone.js assistance, please enter your Anthropic API key.
        </p>
        <p>
          <strong>Get your API key:</strong>{' '}
          <a href="https://console.anthropic.com/account/keys" target="_blank" rel="noopener noreferrer">
            Anthropic Console
          </a>
        </p>

      <form onSubmit={handleSaveKey}>
        <input
          type="password"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          placeholder="sk-ant-api03-..."
          required
          autoFocus
        />
        
        {error && (
          <p>
            {error}
          </p>
        )}

        <div>
          <button type="submit" disabled={!inputKey.trim()}>
            Save API Key
          </button>
          
          {isValidKey && (
            <button type="button" onClick={handleClearKey}>
              Clear Key
            </button>
          )}
        </div>
      </form>

      <aside>
        <small>
          <strong>Privacy:</strong> Your API key is stored locally in your browser and sent only to Anthropic's servers. 
          We never see or store your API key.
        </small>
      </aside>
    </section>
  );
}; 