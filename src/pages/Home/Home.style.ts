import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../constants/theme';

export const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 30,
    },
    list: {
        gap: 25,
        paddingBottom: 30,
    }
});
