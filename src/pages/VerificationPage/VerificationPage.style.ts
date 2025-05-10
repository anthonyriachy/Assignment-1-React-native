import { StyleSheet } from "react-native";
import { window } from "../../constants/sizes";

export const createStyles = (colors: any) => StyleSheet.create({
    container: {
        paddingTop: window.height * 0.1,
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        gap: 40,
        marginTop: 40,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});