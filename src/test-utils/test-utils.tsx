import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../context/ThemeContext/ThemeContext';

// Mock theme hook
jest.mock('../hooks/UseTheme', () => ({
  useTheme: () => ({
    colors: {
      background: '#fff',
      text: '#000',
      primary: '#007AFF',
      border: '#ccc',
    },
    theme: 'light',
  }),
}));

// Custom render function that includes providers
const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: ThemeProvider, ...options });

// Re-export everything
export * from '@testing-library/react-native';

// Override render method
export { customRender as render }; 