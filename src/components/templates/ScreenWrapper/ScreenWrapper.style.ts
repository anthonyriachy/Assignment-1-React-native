import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../../constants/theme';


export const createStyles = (colors: ThemeColors) => StyleSheet.create({
    safeArea:{
        flex:1,
        backgroundColor:colors.background,
    },
});
 