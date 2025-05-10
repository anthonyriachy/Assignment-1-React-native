export type ThemeType = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  border: string;
  card: string;
  error: string;
  success: string;
  inputBackground: string;
  inputText: string;
  
}

export const lightTheme: ThemeColors = {
  background: '#FFFFFF',
  text: '#000000',
  primary:'#6055D8',
  secondary:'#F8F7F7',
  border: '#E5E5EA',
  card: '#F2F2F7',
  error: '#FF3B30',
  success: '#34C759',
  inputBackground: '#F2F2F7',
  inputText: '#000000',
};

export const darkTheme: ThemeColors = {
  background: '#09090B',
  text: '#FFFFFF',
  primary:'#6055D8',
  secondary:'#F8F7F7',
  border: '#38383A',
  card: '#1C1C1E',
  error: '#FF453A',
  success: '#32D74B',
  inputBackground: '#29292C',
  inputText: '#FFFFFF',
};

export const getThemeColors = (theme: ThemeType): ThemeColors => {
  return theme === 'light' ? lightTheme : darkTheme;
}; 