import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/theme";
import { globalStyles } from "../../../constants/globalStyles";

export const createStyles = (colors:ThemeColors) => {
    return StyleSheet.create({
        container: {
            gap:5,
            backgroundColor:colors.card,
            paddingVertical:15,
            borderRadius:10,
        },
        infoContainer: {
            paddingHorizontal:15,
            gap:5,
        },
        title: {
            fontSize: 20,
            fontFamily: globalStyles.semiBold,
            color: colors.text,
            paddingHorizontal:15,
        },
        divider: {
            height: 1,
            backgroundColor: 'black',
            marginVertical: 10,
        },
        totalContainer: {
            paddingHorizontal:15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        totalTitle: {
            fontSize: 20,
            fontFamily: globalStyles.semiBold,
            color: colors.text,
        },
        totalValue: {
            fontSize: 20,
            fontFamily: globalStyles.semiBold,
            color: colors.text,
        },
    });
};