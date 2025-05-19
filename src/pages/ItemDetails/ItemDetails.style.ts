import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../constants/theme';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 16,
      gap: 12,
    },
    shareButton: {
      flex: 1,
      backgroundColor: colors.secondary,
    },
    cartButton: {
      flex: 1,
      backgroundColor: colors.primary,
    },
  });
