import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../constants/theme';

export const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: colors.background,
        paddingVertical: 20,
        justifyContent: 'space-between',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 20,
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
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    logoutText: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color:"#F55F1F",
        textAlign: 'center',
    },
}); 