import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../constants/theme';

export const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: colors.background,
        paddingVertical: 20,
        paddingTop: 30,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    profileContainer:{
        width: 80,
        height: 80,
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 'auto',
        borderRadius: 100,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
        alignSelf: 'center',
        objectFit: 'contain',

    },
    email: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: colors.text,
        textAlign: 'center',
        marginVertical: 20,
        width: '100%',
        
    },
    logoutButton: {
        paddingVertical: 10,
    },
    logoutText: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color:"#F55F1F",
        textAlign: 'center',
    },
    buttonContainer:{
        gap: 10,
    }
}); 