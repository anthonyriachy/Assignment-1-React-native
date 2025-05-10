import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/theme";
export const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:colors.inputBackground,
        borderRadius:100,
        paddingHorizontal:16,
        
    },
    input:{
        color: colors.inputText ,
        flex:1,
        marginLeft:10,
        fontFamily:'Poppins-Regular',
        alignSelf:'center',
    }
})