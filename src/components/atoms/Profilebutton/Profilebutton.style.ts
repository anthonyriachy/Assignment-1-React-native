    import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/theme";
import { globalStyles } from "../../../constants/globalStyles";

export const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: colors.inputBackground,
        paddingVertical: 10,
        paddingHorizontal: 15, 
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        elevation: 1,
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    title: {
        fontSize: 16,
        fontFamily: globalStyles.semiBold,
        color: colors.inputText,
    },
    leftContainer: {
       flexDirection: 'row',
       alignItems: 'center',
       gap: 10,
    },
    icon: {
        width: 30,
        height: 30,
    },
    
})  