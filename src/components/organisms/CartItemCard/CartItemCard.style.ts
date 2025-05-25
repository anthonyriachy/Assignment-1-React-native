import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/theme";

export const createStyles = (colors:ThemeColors) => StyleSheet.create({
    container:{
     borderRadius:8,
     backgroundColor:colors.secondary,
     flexDirection:'row',
     gap:10,
    },
    imageContainer:{
        width:120,
        height:100,
        borderRadius:8,
        overflow:'hidden',
    },
    image:{
        resizeMode:'cover',
        width:'100%',
        height:'100%',
    }
})