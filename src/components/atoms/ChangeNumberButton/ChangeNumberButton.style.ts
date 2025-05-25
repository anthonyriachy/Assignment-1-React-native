import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/theme";
import { globalStyles } from "../../../constants/globalStyles";

export const createStyles = (colors:ThemeColors) => StyleSheet.create({
    container:{
       backgroundColor:colors.primary,
       borderRadius:40,
       width:30,
       height:30,
       justifyContent:'center',
       alignItems:'center',
        opacity:0.8,
    },
    text:{
        fontSize:16,
        fontFamily:globalStyles.semiBold,
        color:'white',
        lineHeight:20,
    }
})  