import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    ImageContainer:{
      width:50,
      height:50,
      borderRadius:100,
      backgroundColor:'#6055D8',
    },
    leftContainer: {
      flexDirection:'row',
      gap:8,
      alignItems:'center',
    },
    rightContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    name:{
      fontWeight:'bold',
      fontSize:18,
      color:'#000',
    }, 
}); 