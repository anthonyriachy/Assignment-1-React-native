import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../../constants/theme';

export const createStyles = (colors: ThemeColors) => StyleSheet.create({
    input:{
        borderRadius: 8,
        backgroundColor: colors.inputBackground,
        height: 60,
    },
    inputField:{
        paddingHorizontal: 20,
        height: '100%',
        color: colors.inputText,
    },
    errorText:{
        color: 'red',
        fontSize: 12,
    },
});
