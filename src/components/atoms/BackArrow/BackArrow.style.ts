import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";
export const styles = StyleSheet.create({
    container: {
        position:'absolute',
        top:15,
        left:15,
        backgroundColor:colors.secondary,
        width:50,
        height:50,
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
    }
})  