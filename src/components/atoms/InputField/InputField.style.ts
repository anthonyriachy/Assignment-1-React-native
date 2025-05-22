import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../../constants/theme';

export const createStyles = (colors: ThemeColors) => StyleSheet.create({
    input:{
        borderRadius: 8,
        backgroundColor: colors.inputBackground,
        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 20,
    },
    inputField:{
        paddingHorizontal: 20,
        height: '100%',
        color: colors.inputText,
        flex:1,
    },
    errorText:{
        color: 'red',
        fontSize: 12,
    },
   
});
