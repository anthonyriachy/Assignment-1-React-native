import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../../constants/theme';
import { globalStyles } from '../../../constants/globalStyles';

export const createStyles = (colors: ThemeColors) => StyleSheet.create({
    errorText: {
        color:colors.error,
        fontSize:12,
        fontFamily:globalStyles.regular,
    },
});