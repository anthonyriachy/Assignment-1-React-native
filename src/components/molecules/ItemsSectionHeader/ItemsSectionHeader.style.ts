import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		fontSize: 25,
		fontWeight: 'bold',
	},
	viewAll: {
		fontSize: 16,
		color:colors.primary,
		fontWeight:'light'
	},
});