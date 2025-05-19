import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeType } from '../../../constants/theme';

export const createStyles = (colors: ThemeColors, theme: ThemeType) => StyleSheet.create({
    container:{
        backgroundColor:colors.background,
        paddingHorizontal:15,
        paddingVertical:5,
        borderBottomRightRadius:15,
        borderBottomLeftRadius:15,
        height:120,
        justifyContent:'space-between',
        ...(theme === 'dark' && {
            borderWidth: 1,
            borderColor: colors.border,
        }),
    },
    title:{
        fontSize:17,
        fontFamily:'Poppins-normal',
        color:colors.text,
        lineHeight:40,
        flexShrink: 1,
    },
    price:{
        fontSize:16,
        fontFamily:'Poppins-Bold',
        color:colors.primary,
        lineHeight:16,
        marginBottom: 4,
    },
    dateContainer:{
        flexDirection:'row',
        alignItems:'center',
        gap:5,
    },
    locationContainer:{
        flexDirection:'row',
        alignItems:'center',
        gap:5,
    },
    date:{
        fontSize:12,
        fontFamily:'Poppins-Regular',
        color:colors.text,
    },
    location:{
        fontSize:12,
        fontFamily:'Poppins-Regular',
        color:colors.text,
    },
    bottomContainer:{
        gap:5
    },
});
