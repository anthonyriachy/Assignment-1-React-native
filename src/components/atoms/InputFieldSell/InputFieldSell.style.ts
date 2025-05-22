import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/theme";
export const createStyles=(colors:ThemeColors,isDescription:boolean)=>StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    error:{
        color:colors.error,
        fontSize:12,
        fontFamily:'Poppins-Regular',
    },
    label:{
        color:colors.text,
        fontSize:12,
        fontFamily:'Poppins-SemiBold',
    },
    input:{
        borderWidth:1,
        borderColor:colors.border,
        borderRadius:20,
        paddingVertical:10,
        paddingHorizontal:15,
        fontFamily:'Poppins-Regular',
        ...(isDescription && {height:120}),
        textAlignVertical:'top',
    },
    description:{
        borderWidth:1,
        borderColor:colors.border,
        borderRadius:20,
        paddingVertical:10,
        paddingHorizontal:15,
        fontFamily:'Poppins-Regular',
        height:200,
    }
})