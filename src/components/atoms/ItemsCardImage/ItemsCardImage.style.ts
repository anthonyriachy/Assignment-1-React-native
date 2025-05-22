import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
        backgroundColor:'white',
        padding:15,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        height:140,
        
	},
    imageContainer: {
      borderRadius:100,
    },
    image: {
       borderTopLeftRadius:15,
       borderTopRightRadius:15,
        resizeMode:'contain',
        width:'100%',
        height:'100%',
    },
    heartIconContainer: {
        position:'absolute',
        top:10,
        right:10,
    },
});
