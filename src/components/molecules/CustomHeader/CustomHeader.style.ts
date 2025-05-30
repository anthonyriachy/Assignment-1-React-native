import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/theme";
import { globalStyles } from "../../../constants/globalStyles";

export const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      backgroundColor: colors.background,
    },
    ImageContainer:{
      width: 50,
      height: 50,
      borderRadius: 100,
      backgroundColor: colors.secondary,
      alignItems:'center',
      justifyContent:'center'
    },
    leftContainer: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    },
    rightContainer: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    },
    name:{
      fontFamily:globalStyles.semiBold,
      fontSize: 18,
      color: colors.text,
    }, 
    profileImage:{
      width: "100%",
      height: "100%",
      borderRadius: 100,
      objectFit: 'contain',
    }
}); 