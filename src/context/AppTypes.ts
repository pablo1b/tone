import { type ChatMessage } from '../services/claudeService';

export interface AppState {
  code: string;
  isPlaying: boolean;
  isLoading: boolean;
  messages: ChatMessage[];
  executionHistory: Array<{
    id: string;
    code: string;
    timestamp: string;
    success: boolean;
    error?: string;
  }>;
}

export type AppAction = 
  | { type: 'SET_CODE'; payload: string }
  | { type: 'UPDATE_CODE'; payload: { newCode: string; source: 'user' | 'claude' } }
  | { type: 'SET_PLAYING'; payload: boolean }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'CLEAR_MESSAGES' }
  | { type: 'ADD_EXECUTION_RESULT'; payload: { code: string; success: boolean; error?: string } };

export interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  
  // High-level actions
  updateCode: (newCode: string, source: 'user' | 'claude') => void;
  executeCode: () => Promise<void>;
  stopAudio: () => void;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
} 