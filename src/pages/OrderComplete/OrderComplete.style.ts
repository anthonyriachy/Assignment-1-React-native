import { StyleSheet } from "react-native";
import { ThemeColors } from "../../constants/theme";
import { globalStyles } from "../../constants/globalStyles";

export const createStyles = (colors:ThemeColors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap:30,
            backgroundColor:colors.background,
        },
        textContainer: {
            alignItems: 'center',
            gap: 5,
        },
        title: {
            fontSize: 24,
            fontFamily:globalStyles.semiBold,
            color:colors.text,
        },
        description: {
            fontSize: 16,
            fontFamily:globalStyles.regular,
            color:colors.text,
        },
    })
}