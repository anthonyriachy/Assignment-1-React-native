import { StyleSheet } from 'react-native';
import { window } from '../../../constants/sizes'
export const styles = StyleSheet.create({
	parentContainer: {
		height:255,
		width:window.width * 0.45+4,

	},
	container: {
		width:window.width * 0.45,
		height:250,
		borderRadius:15,
		elevation:3,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.25,
		shadowRadius: 2.84,
	},
});
