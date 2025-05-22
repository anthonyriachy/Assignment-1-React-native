import { StyleSheet } from 'react-native';
 
export const createStyles = (colors: any) => StyleSheet.create({
  
    input: {
        height: 48,
        backgroundColor: colors.inputBackground,
        color: colors.text,
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: colors.border,
    },
    row: {
        backgroundColor: colors.inputBackground,
        padding: 13,
        height: 44,
        flexDirection: 'row',
    },
    listView: {
        backgroundColor: colors.inputBackground,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        marginTop: 4,
    },
    description: {
        color: colors.text,
    },
    emptyContainer: {
        padding: 16,
        alignItems: 'center',
    },
    emptyText: {
        color: colors.text,
    },
}); 