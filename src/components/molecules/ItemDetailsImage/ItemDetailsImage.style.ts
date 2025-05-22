import { StyleSheet } from "react-native";
import { window } from "../../../constants/sizes";
import { ThemeColors } from "../../../constants/theme";

export const createStyles = (colors: ThemeColors) => StyleSheet.create({
	container: {
		zIndex:100,
		width: '100%',
		height: '100%',
		backgroundColor: 'white',
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,	
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	imageContainer: {
		width:window.width,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
	 
	backButton: {
		position: 'absolute',
		top: 15,
		left: 15,
		zIndex: 100,
	},
	paginationContainer: {
		position: 'absolute',
		bottom: 5,
		left: 0,
		right: 0,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
	},
	paginationDot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: colors.secondary,
	},
	paginationDotActive: {
		backgroundColor: colors.primary,
		width: 10,
		height: 10,
		borderRadius: 5,
	},
});
