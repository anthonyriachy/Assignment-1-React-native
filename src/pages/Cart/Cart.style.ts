import { StyleSheet } from "react-native";
import { ThemeColors} from "../../constants/theme";

export const createStyles = (colors:ThemeColors) => StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.background,
        paddingHorizontal:15,
        paddingVertical:30,
        gap:15,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 15,
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        zIndex: 1,
    },
    expandButton: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    expandButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    bottomSheetBackground: {
        backgroundColor: colors.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    bottomSheetContent: {
        flex: 1,
        padding: 15,
        gap: 15,
        justifyContent: 'space-between',
        backgroundColor: colors.background,
    },
    checkoutButton: {
        marginTop: 10,
    }
});