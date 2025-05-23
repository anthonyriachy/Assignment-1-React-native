import { StyleSheet } from 'react-native';
import {window} from '../../constants/sizes';
import { globalStyles } from '../../constants/globalStyles';


export const createStyles = (colors: any) => StyleSheet.create({
    container:{
        paddingHorizontal: 20,
        paddingTop: window.height * 0.1,
        gap: 10,
        flex:1,
        backgroundColor: colors.background,
    },
    inputContainer:{
        marginTop: 20,
        gap: 16,
    },
    scrollView: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    forgotPasswordText:{
        color:colors.primary,
        fontSize:12,
        fontFamily:globalStyles.semiBold,
        textAlign:'right',
    }
    
});
