import { StyleSheet } from "react-native";
import { window } from "../../../constants/sizes";
import { ThemeColors } from "../../../constants/theme";
export const createStyles = (colors: ThemeColors) => StyleSheet.create({
	container: {
		flex: 1,
        paddingHorizontal:15,
        paddingVertical:15,
        justifyContent:'space-between',
        gap:30,

	},
    infoContainer:{
        gap:20,
    },
    titleContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    title:{
        fontSize:24,
        fontFamily:'Poppins-SemiBold',
        color:colors.text,
    },
    price:{
        fontSize:20,
        fontFamily:'Poppins-Bold',
        color:colors.primary,
    },
    descriptionTitle:{
        fontSize:18,
        fontFamily:'Poppins-SemiBold',
        marginBottom:5,
        color:colors.text,
    },
    description:{
        fontSize:16,
        fontFamily:'Poppins-Regular',
        color:colors.text,
    },
    buttonContainer:{
        gap:10,
        flexDirection:'row',
        alignItems:'center',
    },
    cardBtn:{
        width:window.width*0.20,
        height:56,
        borderRadius:100,
        backgroundColor:'#F8F7F7',
        justifyContent:'center',
        alignItems:'center',
    }
});