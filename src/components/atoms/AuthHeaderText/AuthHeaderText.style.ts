import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: colors.text,
    },
});
