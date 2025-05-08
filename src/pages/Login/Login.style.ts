import { StyleSheet } from 'react-native';
import {window} from '../../constants/sizes';

export const createStyles = (colors: any) => StyleSheet.create({
    container:{
        paddingHorizontal: 20,
        paddingTop: window.height * 0.1,
        gap: 40,
        flex:1,
        backgroundColor: colors.background,
    },
    inputContainer:{
        gap: 16,
    },
    errorText:{
        color: 'red',
        fontSize: 12,
    },
});
