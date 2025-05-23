import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/theme";
import { globalStyles } from "../../../constants/globalStyles";

export const createStyles=(colors:ThemeColors)=>StyleSheet.create({
    container:{
    },
    label:{
        color:colors.text,
        fontSize:12,
        fontFamily:globalStyles.semiBold,
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
        borderTopStartRadius:8,
        borderBottomStartRadius:8,
        borderWidth:1,
        borderRightWidth:0,
        borderColor:colors.primary,
    },
    input:{
        flex:1,
        padding:10,
        borderTopEndRadius:8,
        borderBottomEndRadius:8,
        borderWidth:1,
        borderColor:colors.border,
        borderLeftWidth:0,
        fontFamily:globalStyles.regular,
        color:colors.text,
    },
    error:{
        color:colors.error,
        fontSize:12,
        fontFamily:globalStyles.regular,
    }
})