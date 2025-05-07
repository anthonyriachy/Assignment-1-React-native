import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';
export const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.secondary,
        paddingHorizontal:15,
        paddingVertical:5,
        borderBottomRightRadius:15,
        borderBottomLeftRadius:15,
        height:70,
        justifyContent:'space-around',
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
    },
    price:{
        fontSize:16,
        fontWeight:'bold',
        color:colors.primary,
    },
});
