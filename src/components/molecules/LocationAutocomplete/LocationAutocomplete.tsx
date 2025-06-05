import 'react-native-get-random-values';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useTheme } from '../../../hooks/UseTheme';
import { createStyles } from './LocationAutocomplete.style.ts';
import { UseFormSetValue } from 'react-hook-form';
import { ProductSchemaType } from '../../../schemas/Product.schema';
import { config } from '../../../constants/Config.ts';
import { useRef, useCallback, useEffect, useMemo, useState, memo } from 'react';
import { Text, View, TextInputProps } from 'react-native';
import { InputFieldSell } from '../../atoms/InputFieldSell/InputFieldSell.tsx';
import { CustomText } from '../../atoms/CustomText/CustomText.tsx';

type LocationAutocompleteProps = {
    setValue: UseFormSetValue<ProductSchemaType>;
    value?: string;
    onLocationSelect?: (location: { name: string; latitude: number; longitude: number }) => void;
};

export const LocationAutocomplete = memo(({ setValue, value, onLocationSelect }: LocationAutocompleteProps) => {
    const { colors } = useTheme();
    const styles = useMemo(() => createStyles(colors), [colors]);
    const ref = useRef<any>(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (value && ref.current) {
            ref.current.setAddressText(value);
            setInputValue(value);
        }
    }, [value]);

    const handleLocationSelect = useCallback((data: any, details: any) => {
        try {
            if (details) {
                const locationName = data.description;
                const latitude = details.geometry.location.lat;
                const longitude = details.geometry.location.lng;

                // Update form values
                setValue('location.name', locationName, { shouldValidate: true });
                setValue('location.latitude', latitude, { shouldValidate: true });
                setValue('location.longitude', longitude, { shouldValidate: true });

                // Call the onLocationSelect callback if provided
                if (onLocationSelect) {
                    onLocationSelect({ name: locationName, latitude, longitude });
                }

                // Clear the search input
                setInputValue('');
                if (ref.current) {
                    ref.current.setAddressText('');
                }
                setIsDropdownVisible(false);
            }
        } catch (error) {
            console.error('Error selecting location:', error);
        }
    }, [setValue, onLocationSelect]);

    const handleFail = useCallback((error: any) => {
        console.error('Google Places API Error:', error);
    }, []);

    const renderEmptyComponent = useCallback(() => (
        <View style={styles.emptyContainer}>
            <CustomText style={styles.emptyText}>No locations found</CustomText>
        </View>
    ), [styles.emptyContainer, styles.emptyText]);

    if (!config.googlePlacesApiKey) {
        console.warn('Google Places API key is not configured');
        return null;
    }

    return (
        <GooglePlacesAutocomplete
            ref={ref}
            placeholder="Search location"
            fetchDetails={true}
            timeout={5000}
            textInputProps={{
                value: inputValue,
                onChangeText: (text) => {
                    setInputValue(text);
                },
                render: (props: TextInputProps) => (
                    <InputFieldSell
                        {...props}
                        placeholder="Search location"
                        label="Search location"
                        value={inputValue}
                        onChangeText={(text) => {
                            setInputValue(text);
                            props.onChangeText?.(text);
                        }}
                    />
                )
            }}
            onPress={handleLocationSelect}
            debounce={300}
            minLength={2}
            onFail={handleFail}
            query={{
                key: config.googlePlacesApiKey,            
                language: 'en',
                types: 'geocode',
                location: '33.888630,35.495480',  // Beirut coords
                radius: 50000,                    
                offset: 0  
            }}
            styles={{
                textInput: styles.input,
                listView: styles.listView,
                row: styles.row,
                description: styles.description,
            }}
            enablePoweredByContainer={false}
            predefinedPlaces={[]}
            keyboardShouldPersistTaps="handled"
            disableScroll={true}
            enableHighAccuracyLocation={false}
            nearbyPlacesAPI="GooglePlacesSearch"
            keepResultsAfterBlur={true}
            listEmptyComponent={renderEmptyComponent} 
            listViewDisplayed={isDropdownVisible}
            suppressDefaultStyles={true}
        />
    );
});

LocationAutocomplete.displayName = 'LocationAutocomplete';
  