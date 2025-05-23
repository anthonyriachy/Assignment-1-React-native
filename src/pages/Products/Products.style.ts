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
      top: -10,
      zIndex: 100, 
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
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
        marginTop:5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:15,
        width:'100%',
        justifyContent:'space-between',
    },

    resultsContainerLeft:{
        flexDirection:'row',
        alignItems:'center',
    },
    results:{
        fontFamily:'Poppins-Regular',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
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
        paddingHorizontal:15,
        
    },
  
    resultsText3Container:{
        flexDirection:'row',
        alignItems:'center',
    },
    resultsText3: {
        fontFamily:'Poppins-Bold',
        color: colors.text,
        
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: colors.error,
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        textAlign: 'center',
        padding: 20,
    },
    footerLoader: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    filterButton: {
        position: 'absolute',
        right: 15,
        zIndex: 1,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    filterPanel: {
        paddingTop: 40,
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '80%',
        backgroundColor: colors.background,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: -2,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    filterHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    filterTitle: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: colors.text,
    },
    
});
