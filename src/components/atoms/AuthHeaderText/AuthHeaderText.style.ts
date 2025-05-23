import { StyleSheet } from 'react-native';
import { globalStyles } from '../../../constants/globalStyles';

export const createStyles = (colors: any) => StyleSheet.create({
    title: {
        fontSize: 35,
        fontFamily: globalStyles.semiBold,
        color: colors.text,
    },
});
