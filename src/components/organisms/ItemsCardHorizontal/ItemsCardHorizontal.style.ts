
import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/theme";
import { window } from "../../../constants/sizes";
import { globalStyles } from "../../../constants/globalStyles";

export const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
		height:120,
        width:window.width - 32,
        marginHorizontal:'auto',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:15,
        borderWidth:1,
        borderColor:colors.border,
        backgroundColor:colors.background,
        elevation:1,
        shadowColor:'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 2,   
        marginBottom:10,
        
	},
    imageContainer: {
        width:100,
        height:100,
        borderRadius:15,
        borderTopLeftRadius:15,
        borderBottomLeftRadius:15,
        padding:5,
    },
    image: {
        resizeMode:'contain',
        width:'100%',
        height:'100%',
    },
    heartIconContainer: {
        position:'absolute',
        top:10,
        right:10,
    },
    infoContainer: {
        flex:1,
        padding:15,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        justifyContent:'space-evenly',
        gap:3,
        height:'100%',
    },
    title: {
        fontSize:16,
        fontFamily:globalStyles.semiBold,
        color:colors.text,
    },
    price: {
        fontSize:16,
        fontFamily:globalStyles.bold,
        color:colors.primary,
    },
    info: {
        flex:1,
        padding:15,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    arrowContainer: {
        width:40,
        height:40,
        borderRadius:100,
        backgroundColor:colors.secondary,
        justifyContent:'center',
        alignItems:'center',
        elevation:1,
        shadowColor:'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 2,   
    },
    
}); 