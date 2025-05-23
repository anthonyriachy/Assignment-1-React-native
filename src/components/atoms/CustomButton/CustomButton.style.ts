import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';
import { globalStyles } from '../../../constants/globalStyles';

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
        fontSize: 15,
        fontFamily:globalStyles.semiBold,
    },
});
