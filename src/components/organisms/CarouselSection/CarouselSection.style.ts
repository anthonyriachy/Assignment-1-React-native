import { StyleSheet, Dimensions } from 'react-native';
import { ThemeColors } from '../../../constants/theme';

const { width } = Dimensions.get('window');

export const createStyles = (_colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      height: 200,
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 10,
      marginHorizontal: 16,
      position: 'relative',
      overflow: 'hidden',
    },
    imageContainer: {
      width: width - 32, // Full width minus margins
      height: 200,
      borderRadius: 10,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      borderRadius: 10,
    },
    paginationWrapper: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      paddingVertical: 10,
    },
  });
