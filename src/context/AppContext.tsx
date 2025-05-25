import React, { useReducer, useCallback } from 'react';
import { musicEngine } from '../musicEngine';
import { type ChatMessage } from '../services/claudeService';
import { type AppState, type AppAction, type AppContextType } from './AppTypes';
import { AppContext } from './AppContextDefinition';

// Maximum number of messages to keep in chat history
const MAX_CHAT_MESSAGES = 20;
// Maximum number of execution history items to keep
const MAX_EXECUTION_HISTORY = 10;

const initialState: AppState = {
  code: musicEngine.getDefaultCode(),
  isPlaying: false,
  isLoading: false,
  isChatLoading: false,
  messages: [
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m here to help you with Tone.js. I can help you write code, modify existing code, and create musical compositions. What would you like to create?',
      timestamp: new Date().toLocaleTimeString()
    }
  ],
  executionHistory: []
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_CODE':
      return { ...state, code: action.payload };
    
    case 'UPDATE_CODE':
      return { 
        ...state, 
        code: action.payload.newCode 
      };
    
    case 'SET_PLAYING':
      return { ...state, isPlaying: action.payload };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_CHAT_LOADING':
      return { ...state, isChatLoading: action.payload };
    
    case 'ADD_MESSAGE': {
      const newMessages = [...state.messages, action.payload];
      
      // If we exceed the message limit, trim old messages while keeping the initial message
      if (newMessages.length > MAX_CHAT_MESSAGES) {
        const initialMessage = newMessages[0]; // Keep the welcome message
        const recentMessages = newMessages.slice(-(MAX_CHAT_MESSAGES - 1)); // Keep recent messages
        return {
          ...state,
          messages: [initialMessage, ...recentMessages]
        };
      }
      
      return { 
        ...state, 
        messages: newMessages 
      };
    }
    
    case 'CLEAR_MESSAGES':
      return { 
        ...state, 
        messages: [initialState.messages[0]] 
      };
    
    case 'ADD_EXECUTION_RESULT': {
      const newHistory = [
        ...state.executionHistory,
        {
          id: Date.now().toString(),
          code: action.payload.code,
          timestamp: new Date().toISOString(),
          success: action.payload.success,
          error: action.payload.error
        }
      ];
      
      // Keep only the most recent execution history items
      const trimmedHistory = newHistory.length > MAX_EXECUTION_HISTORY 
        ? newHistory.slice(-MAX_EXECUTION_HISTORY)
        : newHistory;
      
      return {
        ...state,
        executionHistory: trimmedHistory
      };
    }
    
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const fullMessage: ChatMessage = {
      ...message,
      id: state.messages.length + 1,
      timestamp: new Date().toLocaleTimeString()
    };
    dispatch({ type: 'ADD_MESSAGE', payload: fullMessage });
  }, [state.messages.length]);

  const updateCode = useCallback((newCode: string, source: 'user' | 'claude') => {
    dispatch({ type: 'UPDATE_CODE', payload: { newCode, source } });
  }, []);

  const executeCode = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const result = await musicEngine.executeCode(state.code);
      
      dispatch({ 
        type: 'ADD_EXECUTION_RESULT', 
        payload: { 
          code: state.code, 
          success: result.success, 
          error: result.error 
        } 
      });

      if (result.success) {
        dispatch({ type: 'SET_PLAYING', payload: true });
        addMessage({
          type: 'assistant',
          content: 'Great! Your Tone.js code has been executed successfully. The audio should be playing now!'
        });
      } else {
        addMessage({
          type: 'assistant',
          content: `Error executing code: ${result.error}. Please check your syntax and try again.`
        });
      }
    } catch (error) {
      addMessage({
        type: 'assistant',
        content: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.code, addMessage]);

  const stopAudio = useCallback(() => {
    musicEngine.stopAudio();
    dispatch({ type: 'SET_PLAYING', payload: false });
    addMessage({
      type: 'assistant',
      content: 'Audio stopped and all synths disposed.'
    });
  }, [addMessage]);

  const clearMessages = useCallback(() => {
    dispatch({ type: 'CLEAR_MESSAGES' });
  }, []);

  const setChatLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_CHAT_LOADING', payload: loading });
  }, []);

  const value: AppContextType = {
    state,
    dispatch,
    updateCode,
    executeCode,
    stopAudio,
    addMessage,
    clearMessages,
    setChatLoading
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

