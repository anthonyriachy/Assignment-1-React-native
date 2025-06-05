import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/theme";

export const createStyles = (colors: ThemeColors) => StyleSheet.create({
	container: {
		flex: 1,
        backgroundColor:colors.background,
        borderWidth:1,
        borderBottomWidth:0,
        borderColor:colors.border,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        height:140,
        
	},
    imageContainer: {
      borderRadius:100,
    },
    image: {
       borderTopLeftRadius:15,
       borderTopRightRadius:15,
        resizeMode:'contain',
        width:'100%',
        height:'100%',
        backgroundColor:colors.background,
    },
    heartIconContainer: {
        position:'absolute',
        top:10,
        right:10,
        backgroundColor:colors.secondary,
        padding:8,
        borderRadius:100,
        paddingLeft:10,
        width:35,
        height:35,
        justifyContent:'center',
        alignItems:'center',
    },
});
