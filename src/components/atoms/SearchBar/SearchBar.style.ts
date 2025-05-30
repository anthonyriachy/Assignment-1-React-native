import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/theme";
export const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:colors.inputBackground,
        borderRadius:8,
        paddingHorizontal:15,
        
    },
    input:{
        color: colors.inputText ,
        flex:1,
        marginLeft:10,
        fontFamily:'Poppins-Regular',
        alignSelf:'center',
        paddingVertical:10,
    }
})