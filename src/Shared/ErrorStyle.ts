import { StyleSheet } from "react-native";

export const createStyles = (colors:any) => StyleSheet.create({
    errorText:{
        color:colors.error,
        fontSize:12,
        fontFamily:'Poppins-Regular',
    }
})