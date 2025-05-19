import { StyleSheet } from "react-native";
export const createStyles = (colors: any) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap:10,
    },
    input: {
        width: 50,
        height: 50,
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 24,
        backgroundColor: colors.inputBackground,
        color: colors.text,
    },
}); 