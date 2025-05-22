import { StyleSheet } from "react-native";

export const ErrorStyle = (colors:any) => StyleSheet.create({
    errorText:{
        color:colors.error,
        fontSize:12,
        fontWeight:'bold',
    }
})