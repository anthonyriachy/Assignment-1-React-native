import { getThemeColors, ThemeType } from '../../constants/theme';

export type ThemeContextType = {
    theme: ThemeType;
    colors: ReturnType<typeof getThemeColors>;
    toggleTheme: () => void;
    setTheme: (theme: ThemeType) => void;
  }