import { useState, useEffect } from 'react';

const API_KEY_STORAGE_KEY = 'anthropic_api_key';

export const useApiKey = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isValidKey, setIsValidKey] = useState<boolean>(false);

  useEffect(() => {
    const savedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (savedKey) {
      setApiKey(savedKey);
      setIsValidKey(true);
    }
  }, []);

  const saveApiKey = (key: string) => {
    const trimmedKey = key.trim();
    if (trimmedKey.startsWith('sk-ant-')) {
      localStorage.setItem(API_KEY_STORAGE_KEY, trimmedKey);
      setApiKey(trimmedKey);
      setIsValidKey(true);
      return true;
    } else {
      setIsValidKey(false);
      return false;
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    setApiKey('');
    setIsValidKey(false);
  };

  return {
    apiKey,
    isValidKey,
    saveApiKey,
    clearApiKey
  };
}; 