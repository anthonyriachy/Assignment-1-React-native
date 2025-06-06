import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/theme";

export const createStyles = (colors: ThemeColors) => StyleSheet.create({
    wrapper: {
        width: '100%',
        height: 100,
        marginVertical: 8,
        backgroundColor: colors.background,
    },
    container: {
        borderRadius: 8,
        backgroundColor: colors.secondary,
        flexDirection: 'row',
        
    },
    deleteButtonContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        borderRadius: 8,
        backgroundColor: '#FF3B30',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    deleteButtonTouch: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    imageContainer: {
        width: 120,
        height: 100,
        borderTopLeftRadius:8,
        borderBottomLeftRadius:8,
        overflow: 'hidden',
        backgroundColor: colors.background,
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.background,
        resizeMode:'contain',
    }
});