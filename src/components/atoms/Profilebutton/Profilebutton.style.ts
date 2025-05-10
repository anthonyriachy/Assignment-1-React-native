    import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/theme";

export const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: colors.inputBackground,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 15,
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
        fontFamily: 'Poppins-SemiBold',
        color: colors.inputText,
    },
    leftContainer: {
       flexDirection: 'row',
       alignItems: 'center',
       gap: 10,
    },
    icon: {
        width: 40,
        height: 40,
    },
    
})  