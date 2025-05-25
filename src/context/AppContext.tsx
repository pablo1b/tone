import React, { useReducer, useCallback } from 'react';
import { musicEngine } from '../musicEngine';
import { type ChatMessage } from '../services/claudeService';
import { type AppState, type AppAction, type AppContextType } from './AppTypes';
import { AppContext } from './AppContextDefinition';

const initialState: AppState = {
  code: musicEngine.getDefaultCode(),
  isPlaying: false,
  isLoading: false,
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
    
    case 'ADD_MESSAGE':
      return { 
        ...state, 
        messages: [...state.messages, action.payload] 
      };
    
    case 'CLEAR_MESSAGES':
      return { 
        ...state, 
        messages: [initialState.messages[0]] 
      };
    
    case 'ADD_EXECUTION_RESULT':
      return {
        ...state,
        executionHistory: [
          ...state.executionHistory,
          {
            id: Date.now().toString(),
            code: action.payload.code,
            timestamp: new Date().toISOString(),
            success: action.payload.success,
            error: action.payload.error
          }
        ]
      };
    
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

  const value: AppContextType = {
    state,
    dispatch,
    updateCode,
    executeCode,
    stopAudio,
    addMessage,
    clearMessages
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

