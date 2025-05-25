import { createContext } from 'react';
import { type AppContextType } from './AppTypes';

export const AppContext = createContext<AppContextType | undefined>(undefined); 