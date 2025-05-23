import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeType } from '../../../constants/theme';
import { globalStyles } from '../../../constants/globalStyles';

export const createStyles = (colors: ThemeColors, theme: ThemeType) => StyleSheet.create({
    container:{
        backgroundColor:colors.background,
        paddingHorizontal:15,
        paddingVertical:10,
        borderBottomRightRadius:15,
        borderBottomLeftRadius:15,
        justifyContent:'space-between',
        ...(theme === 'dark' && {
            borderWidth: 1,
            borderColor: colors.border,
        }),
    },
    title:{
        fontSize:16,
        fontFamily:globalStyles.semiBold,
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
        overflow:'hidden'
    },
    date:{
        fontSize:12,
        fontFamily:globalStyles.regular,
        color:colors.text,
    },
    location:{
        fontSize:12,
        fontFamily:globalStyles.regular,
        color:colors.text,
        flexShrink: 1,
    },
    bottomContainer:{
        gap:5
    },
});
