import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/theme";

export const createStyles=(colors:ThemeColors)=>StyleSheet.create({
    container:{
    },
    label:{
        color:colors.text,
        fontSize:12,
        fontFamily:'Poppins-SemiBold',
    },
    inputContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',

    },
    iconContainer:{
        backgroundColor:colors.primary,
        padding:10,
        paddingHorizontal:15,
        borderTopStartRadius:20,
        borderBottomStartRadius:20,
        borderWidth:1,
        borderRightWidth:0,
        borderColor:colors.primary,
    },
    input:{
        flex:1,
        padding:10,
        borderTopEndRadius:20,
        borderBottomEndRadius:20,
        borderWidth:1,
        borderColor:colors.border,
        borderLeftWidth:0,
        fontFamily:'Poppins-Regular',
    },
    error:{
        color:colors.error,
        fontSize:12,
        fontFamily:'Poppins-Regular',
    }
})