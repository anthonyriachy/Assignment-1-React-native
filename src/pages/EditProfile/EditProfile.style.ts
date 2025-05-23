import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../constants/theme';
 import { window } from '../../constants/sizes';
import { ErrorStyle } from '../../Shared/ErrorStyle';

export const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container:{
        paddingHorizontal: 15,
        paddingTop: window.height * 0.1, 
        backgroundColor: colors.background,
    },
    inputContainer:{
        gap: 16,
    },
    
    profileContainer:{
        alignItems:'center',
        justifyContent:'center',
        gap:10,
    },
    profileInnerContainer:{
      overflow:'hidden',
        width:80,
        height:80,
        borderRadius:100,
    },
    profile:{
        borderRadius:100,
        borderWidth:1,
        width:80,
        height:80,
        marginBottom:'auto',
    },

    profileBtn:{
        position:'absolute',
        bottom:-10,
        right:-10,
        padding:8,
        borderRadius:100,
        backgroundColor:colors.white,
        borderWidth:1,
    },
    buttonContainer:{
        marginTop:'auto',
    },
}); 