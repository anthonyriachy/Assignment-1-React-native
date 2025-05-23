import { StyleSheet } from 'react-native';
 
export const createStyles = (colors: any) => StyleSheet.create({
  
    input: {
        borderWidth:1,
        borderColor:colors.border,
        borderRadius:8,
        paddingVertical:10,
        paddingHorizontal:15,
        textAlignVertical:'top',
        color:colors.text,
    },
    row: {
        backgroundColor: 'white',
        padding: 13,
        height: 44,
        flexDirection: 'row',
    },
    listView: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        marginTop: 4,
    },
    description: {
        color: 'black',
    },
    emptyContainer: {
        padding: 16,
        alignItems: 'center',
    },
    emptyText: {
        color: 'black',
    },
}); 