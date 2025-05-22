import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';

export const styles = StyleSheet.create({
    button:{
        backgroundColor:colors.primary,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontFamily:'Poppins-SemiBold',
    },
});
