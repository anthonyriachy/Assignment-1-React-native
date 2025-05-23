import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../../constants/theme';
import { globalStyles } from '../../../constants/globalStyles';
 
export const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            backgroundColor: colors.background,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        headerText: {
            fontSize: 16,
            fontFamily: globalStyles.medium,
            color: colors.text,
        },
        sortContainer: {
    
            gap: 15,
            width: '100%',
        },
        section: {
            gap: 10,
        },
        label: {
            fontSize: 14,
            fontFamily: globalStyles.medium,
            color: colors.text,
            marginBottom: 8,
        },
        sortOptions: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
        },
        sortButton: {
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 16,
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
        },
        activeSortButton: {
            backgroundColor: colors.primary,
            borderColor: colors.primary,
        },
        sortButtonText: {
            fontSize: 12,
            fontFamily: globalStyles.regular,
            color: colors.text,
        },
        activeSortButtonText: {
            color: "white",
        },
        priceInputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
        },
        priceInputWrapper: {
            flex: 1,
        },
        priceInputLabel: {
            fontSize: 12,
            fontFamily: globalStyles.regular,
            color: colors.lightText,
        },
        priceInput: {
            height: 40,
            backgroundColor: colors.card,
            borderRadius: 8,
            paddingHorizontal: 12,
            fontSize: 14,
            fontFamily: globalStyles.regular,
            color: colors.text,
            borderWidth: 1,
            borderColor: colors.border,
        },
        priceInputSeparator: {
            fontSize: 16,
            fontFamily: globalStyles.medium,
            color: colors.text,
            marginTop: 20,
        },
        locationInput: {
            height: 40,
            backgroundColor: colors.card,
            borderRadius: 8,
            paddingHorizontal: 12,
            fontSize: 14,
            fontFamily: globalStyles.regular,
            color: colors.text,
            borderWidth: 1,
            borderColor: colors.border,
        },
        clearButton: {
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 12,
            backgroundColor: colors.card,
            marginTop: 8,
        },
        clearButtonText: {
            marginLeft: 4,
            fontSize: 12,
            fontFamily: globalStyles.medium,
            color: colors.primary,
        },
        filterContainer:{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
    }); 