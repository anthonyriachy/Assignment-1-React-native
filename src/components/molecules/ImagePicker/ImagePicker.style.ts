import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/theme";

export const createStyles = (colors:ThemeColors)=>StyleSheet.create({       
        label:{
            color:colors.text,
            fontSize:12,
            fontFamily:'Poppins-SemiBold',
        },
        errorText: {
            color: colors.error,
            fontSize: 12,
            marginTop: 4,
            fontFamily: 'Poppins-Regular',
        },
        helperText: {
            fontSize: 12,
            marginTop: 4,
            fontFamily: 'Poppins-Regular',
        },
        scrollView: {
            flexDirection: 'row',
            paddingVertical:10,
         },
        scrollViewContent: {
            alignItems: 'center',
        },
        imageContainer: {
            marginRight: 10,
            position: 'relative',
            gap:10
        },
        image: {
            width: 100,
            height: 100,
            borderRadius: 8,
        },
        loadingOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
        },
        addButton: {
            width: 100,
            height: 100,
            borderRadius: 8,
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: '#ccc',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight:10,
        },
        removeButton: {
            position: 'absolute',
            top: -8,
            right: -8,
            zIndex: 1,
        },
        removeButtonInner: {
            width: 24,
            height: 24,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
        },
        removeButtonText: {
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
        },
        disabledButton: {
            opacity: 0.5,
        },
})