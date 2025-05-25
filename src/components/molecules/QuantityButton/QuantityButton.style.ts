import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/theme";
import { globalStyles } from "../../../constants/globalStyles";

export const createStyles = (colors:ThemeColors) => StyleSheet.create({
    container:{
       flexDirection:'row',
       alignItems:'center',
       gap:8,
       flexShrink:1,
       

    },
    text:{
        fontSize:20,
        color:colors.text,
        lineHeight:20,
        fontFamily:globalStyles.light,
        textAlign:'center',
        minWidth:30,
    }
})