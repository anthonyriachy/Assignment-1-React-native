import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/theme";
import { globalStyles } from "../../../constants/globalStyles";

export const createStyles = (colors:ThemeColors) => {
    return StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        title: {
            fontFamily: globalStyles.semiBold,
            color: '#484848',
            fontSize: 16,
        },
        value: {
            fontSize: 16,
            fontFamily: globalStyles.semiBold,
            color: colors.text,
        },
    });
};  