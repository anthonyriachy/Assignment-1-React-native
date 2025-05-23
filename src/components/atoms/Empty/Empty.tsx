import { StyleSheet, View } from "react-native";
import { CustomText } from "../CustomText/CustomText";
import { colors } from "../../../constants/colors";

export const Empty = ({value}:{value?:string}) => {
	return <View style={styles.container}>
		<CustomText style={styles.text}>{value}</CustomText>
	</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
	text: {
		fontSize: 16,
		color: colors.primary,
	},
});

