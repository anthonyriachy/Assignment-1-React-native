import { StyleSheet } from "react-native";
import { ThemeColors} from "../../constants/theme";

export const createStyles = (colors:ThemeColors) => StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.background,
        paddingHorizontal:15,
        paddingVertical:30,
        
    }
})