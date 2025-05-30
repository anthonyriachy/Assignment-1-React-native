import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/theme";
import { globalStyles } from "../../../constants/globalStyles";

export const createStyles = (colors: ThemeColors) => StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',


	},
	title: {
		color:colors.text,
		fontSize: 25,
		fontFamily:globalStyles.semiBold
	},
	viewAll: {
		fontSize: 16,
		color:colors.primary,
		fontFamily:'Poppins-Medium'
	},
});