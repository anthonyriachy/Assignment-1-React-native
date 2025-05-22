import { StyleSheet } from 'react-native';
import { window } from '../../constants/sizes';

export const createStyles = (colors: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal:15,
     },
    backButton: {
		zIndex: 100,
        position:'absolute',
	},
    title:{
        fontSize:20,
        fontFamily:'Poppins-Bold',
        color:colors.text,
        flex:1,
        textAlign:'center',
    },
    header:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:30,
        marginBottom:25,
    },
    form:{
        gap:15,
        flex:1,
    },
    button:{
        backgroundColor:colors.primary,
        
        flex:1,
    
    },
    buttonText:{
        color: colors.text,
        fontSize: 16,
        fontFamily: 'Inter-Bold',
    },
    buttonContainer:{
        gap:10,
        flexDirection:'row',
    },
    deleteButton:{
        backgroundColor:colors.error,        
        flex:1,
    },
});
