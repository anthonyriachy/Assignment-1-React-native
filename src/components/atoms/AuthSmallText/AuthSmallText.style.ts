import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../constants/globalStyles';

export const createStyles = (colors: any) => StyleSheet.create({
    container:{
        flexDirection: 'row',
        gap:4,
    },
    text:{
        fontSize: 14,
        color: colors.text,
    },
    linkText:{
        fontSize: 14,
        fontFamily: globalStyles.semiBold,
        color: colors.primary,
    },
});
