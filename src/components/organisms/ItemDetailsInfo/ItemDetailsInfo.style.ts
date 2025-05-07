import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";
import { window } from "../../../constants/sizes";
export const styles = StyleSheet.create({
	container: {
		flex: 1,
        minHeight:'100%',
        paddingHorizontal:15,
        paddingVertical:15,
        justifyContent:'space-between',
        gap:30,
	},
    infoContainer:{
        gap:20,
    },
    titleContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
    },
    price:{
        fontSize:20,
        fontWeight:'bold',
        color:colors.primary,
    },
    descriptionTitle:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:5,
    },      
    description:{
        fontSize:16,
        color:colors.text,
    },
    buttonContainer:{
        gap:10,
        flexDirection:'row',
        alignItems:'center',
    },
    cardBtn:{
        width:window.width*0.20,
        height:56,
        borderRadius:100,
        backgroundColor:colors.secondary,
        justifyContent:'center',
        alignItems:'center',
    }
});