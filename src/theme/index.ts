// Import both themes
import { lightTheme } from './light';
import { darkTheme } from './dark';

// Import and re-export types from declaration file
import type { Theme, ThemeName } from './index.d';

// Current active theme - can be switched at runtime
export let theme: Theme = darkTheme;

// Theme switching function
export const setTheme = (themeName: ThemeName) => {
  theme = themeName === 'light' ? lightTheme : darkTheme;
};

// Theme utilities
export const themes = {
  light: 'light',
  dark: 'dark',
} as const; 