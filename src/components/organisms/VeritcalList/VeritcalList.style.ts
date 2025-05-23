import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
	},
	verticalContainer: {
		gap: 16,
		paddingHorizontal: 15,
		paddingVertical: 8,
	},
	loaderContainer: {
		paddingVertical: 16,
		alignItems: 'center',
		width: '100%',
	},
	noMoreProductsContainer: {

        paddingHorizontal: 15,
        paddingBottom:30,
		alignItems: 'center',
		justifyContent: 'center',
	},
	noMoreProductsText: {
		fontSize: 14,
		color: colors.primary,
		fontWeight: '500',
	},
	itemContainer: {
		marginBottom: 5,
	},
});