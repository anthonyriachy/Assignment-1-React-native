import { StyleSheet } from "react-native";
import { ThemeColors } from "../../constants/theme";

export const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingVertical: 20,
    },
    backButton: {
      position: 'absolute',
      left: 15,
      top: 0,
      zIndex: 100, 
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontFamily: "Poppins-Bold",

    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontFamily: "Poppins-Bold",
        textAlign: 'center',
        color: colors.text,
    },
    list: {
        flex: 1,
        paddingTop: 10,
    },
    resultsContainer: {
        justifyContent:'flex-start',
        width:'100%',
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    resultsText: {
        fontFamily: "Poppins-Regular",
        color: colors.text,
    },
    resultsText2: {
        color: colors.text,
        fontFamily:'Poppins-Bold',
        paddingLeft:5,
    },
    searchContainer: {
        paddingTop: 20,
        width:'100%',
    },
    results: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal: 20 ,
    },
    resultsText3: {
        fontFamily:'Poppins-Bold',
        color: colors.text,
        flexDirection:'row',
        alignItems:'center',
    }
});
