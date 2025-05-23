import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../constants/theme';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    imageContainer: {
      zIndex: 100,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      gap: 10,
      paddingHorizontal: 15,
    },
    shareButton: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    cartButton: {
      flex: 1,
      backgroundColor: colors.primary,
    },
     
	backButton: {
		position: 'absolute',
		top: 15,
		left: 15,
		zIndex: 200,
	},
  });
