import { StyleSheet } from 'react-native';
import { window } from '../../constants/sizes';

export const createStyles = (colors: any) => StyleSheet.create({
    container:{
        paddingHorizontal: 20,
        paddingTop: window.height * 0.1,
        gap: 40,    
        flex:1,
        backgroundColor: colors.background,
        height:window.height,
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
        borderColor:'black',
        backgroundColor:colors.white,
        
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

});
