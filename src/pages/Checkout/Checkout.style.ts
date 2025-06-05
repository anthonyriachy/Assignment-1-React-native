import { StyleSheet } from "react-native";
import { useTheme } from "../../hooks/UseTheme";

type ThemeColors = ReturnType<typeof useTheme>['colors'];

export const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: 16,
        gap: 24,
    },
    title: {
        fontSize: 24,
        fontFamily: "Inter-Bold",
        color: colors.text,
        marginBottom: 16,
    },
    section: {
        gap: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: "Inter-SemiBold",
        color: colors.text,
    },
    paymentMethod: {
        padding: 16,
        backgroundColor: colors.card,
        borderRadius: 8,
    },
    address: {
        gap: 16,
    },
    selectedLocation: {
        padding: 12,
        backgroundColor: colors.card,
        borderRadius: 8,
    },
    locationName: {
        fontSize: 14,
        fontFamily: "Inter-Regular",
        color: colors.text,
    },
    errorText: {
        color: colors.error,
        fontSize: 12,
        fontFamily: "Inter-Regular",
        marginTop: 4,
    },
    button: {
        marginTop: 16,
    },
    additionalDetails: {
        gap: 12,
        marginTop: 8,
    },
    shippingInfoTable: {
        backgroundColor: colors.card,
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    tableLabel: {
        flex: 1,
        fontSize: 14,
        fontFamily: "Inter-SemiBold",
        color: colors.text,
    },
    tableValue: {
        flex: 2,
        fontSize: 14,
        fontFamily: "Inter-Regular",
        color: colors.text,
    },
});
