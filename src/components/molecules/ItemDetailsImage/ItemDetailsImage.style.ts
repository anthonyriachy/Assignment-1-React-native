import { StyleSheet } from "react-native";
import { window } from "../../../constants/sizes";

export const styles = StyleSheet.create({
	container: {
		width: window.width,
		height: window.height*0.45,
		paddingVertical:50,
		paddingHorizontal:15,
		backgroundColor:'white',
		borderBottomLeftRadius:15,
		borderBottomRightRadius:15,	
		elevation:3,
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode:'contain',
	},
});
