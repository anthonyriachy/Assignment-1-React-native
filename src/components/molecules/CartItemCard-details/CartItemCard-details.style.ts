import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/theme";
import { globalStyles } from "../../../constants/globalStyles";

export const createStyles = (colors:ThemeColors) => StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.card,
        paddingVertical:10,
        paddingRight:10,
        justifyContent:'space-between',
        borderEndEndRadius:10,
        borderEndStartRadius:10,
    },
    title:{
        fontSize:16,
        fontFamily:globalStyles.semiBold,
        color:colors.text,
        flexShrink: 1,
    },
    rowContainerTop:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
    },
    rowContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-end',
    },
    price:{
        fontFamily:globalStyles.semiBold,
        color:colors.primary,
    }
})