import { StyleSheet } from "react-native";
import { window } from "../../../constants/sizes";

export const styles = StyleSheet.create({
	container: {
		width: window.width,
		height: window.height*0.45,
		paddingVertical:50,
		paddingHorizontal:15,
		marginBottom:10,
		backgroundColor:'white',
		borderBottomLeftRadius:15,
		borderBottomRightRadius:15,	
		elevation:5,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,


	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode:'contain',
	},
	backButton: {
		position: 'absolute',
		top:15,
        left:15,
		zIndex: 100,
	},
});
