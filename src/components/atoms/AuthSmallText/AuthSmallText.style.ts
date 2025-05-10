import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
    container:{
        flexDirection: 'row',
        gap:4,
    },
    text:{
        fontSize: 16,
        color: colors.text,
    },
    linkText:{
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primary,
    },
});
