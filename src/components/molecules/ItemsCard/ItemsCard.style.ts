import { StyleSheet } from 'react-native';
import { window } from '../../../constants/sizes'
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		width:window.width * 0.4,
		height:250,
		borderTopLeftRadius:15,
		borderTopRightRadius:15,	
	},
});
