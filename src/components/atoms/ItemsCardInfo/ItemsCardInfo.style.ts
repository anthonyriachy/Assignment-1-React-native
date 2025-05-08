import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeType } from '../../../constants/theme';

export const createStyles = (colors: ThemeColors, theme: ThemeType) => StyleSheet.create({
    container:{
        backgroundColor:colors.background,
        paddingHorizontal:15,
        paddingVertical:5,
        borderBottomRightRadius:15,
        borderBottomLeftRadius:15,
        height:70,
        justifyContent:'space-around',
        ...(theme === 'dark' && {
            borderWidth: 1,
            borderColor: colors.border,
        }),
    },
    title:{
        fontSize:18,
        fontFamily:'Poppins-SemiBold',
        color:colors.text,
    },
    price:{
        fontSize:16,
        fontFamily:'Poppins-Bold',
        color:colors.primary,
    },
});
