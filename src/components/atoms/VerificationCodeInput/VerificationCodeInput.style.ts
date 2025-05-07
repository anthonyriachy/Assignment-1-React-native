import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";
export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
    },
    input: {
        width: 60,
        height: 60,
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 24,
        backgroundColor: colors.secondary,
        color: colors.primary,
    },
}); 