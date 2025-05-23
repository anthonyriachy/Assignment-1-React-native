import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/theme";
import { globalStyles } from "../../../constants/globalStyles";

export const createStyles=(colors:ThemeColors,isDescription:boolean)=>StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    error:{
        color:colors.error,
        fontSize:12,
    },
    label:{
        color:colors.text,
        fontSize:12,
        fontFamily:globalStyles.semiBold,
    },
    input:{
        borderWidth:1,
        color:colors.text,
        borderColor:colors.border,
        borderRadius:8,
        paddingVertical:10,
        paddingHorizontal:15,
        ...(isDescription && {height:120}),
        textAlignVertical:'top',
    },
    description:{
        borderWidth:1,
        borderColor:colors.border,
        borderRadius:20,
        paddingVertical:10,
        paddingHorizontal:15,
        height:200,
    }
})