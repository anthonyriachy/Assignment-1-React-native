import { StyleSheet } from "react-native";

export const createStyles = (colors: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    backButton: {
		position: 'absolute',
		top:15,
        left:15,
		zIndex: 100,
	},
});    