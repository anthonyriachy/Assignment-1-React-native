import { StyleSheet } from "react-native";

export const createStyles = (colors: any) => StyleSheet.create({       
    map: {
        width: '100%',
        height: '100%',
    },
    fullScreenButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: colors.primary,
        padding:14,
        borderRadius: 100,
        zIndex: 1,
    },
    fullScreenButtonText: {
        color: colors.text,
        fontSize: 12,
        fontFamily: 'Inter-Bold',
    },
     
    modalContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    modalHeader: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: colors.background,
    },
    closeButton: {
        zIndex: 100,
        position:'absolute',
        top:15,
        left:15,
    },
    closeButtonText: {
        color: colors.primary,
        fontSize: 16,
        fontFamily: 'Inter-Bold',
    },
    mapContainer: {
        height: 200,
        marginVertical: 10,
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
    },
});