import 'react-native-get-random-values';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useTheme } from '../../../hooks/UseTheme';
import { createStyles } from './LocationAutocomplete.style.ts';
import { UseFormSetValue } from 'react-hook-form';
import { ProductSchemaType } from '../../../schemas/Product.schema';
import { config } from '../../../constants/Config.ts';
import { useRef, useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View, TextInputProps } from 'react-native';
import { InputField } from '../../atoms/InputField/InputField';

type LocationAutocompleteProps = {
    setValue: UseFormSetValue<ProductSchemaType>;
    value?: string;
};

export const LocationAutocomplete = ({ setValue, value }: LocationAutocompleteProps) => {
    const { colors } = useTheme();
    const styles = useMemo(() => createStyles(colors), [colors]);
    const ref = useRef<any>(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [inputValue, setInputValue] = useState(value || '');

    useEffect(() => {
        if (value && ref.current) {
            ref.current.setAddressText(value);
            setInputValue(value);
        }
    }, [value]);

    const handleLocationSelect = useCallback((data: any, details: any) => {
        console.log('data', data);
        console.log('details', details);
        
        try {
            if (details) {
                const locationName = data.description;
             
                setValue('location.name', locationName, { shouldValidate: true });
                setValue('location.latitude', details.geometry.location.lat, { shouldValidate: true });
                setValue('location.longitude', details.geometry.location.lng, { shouldValidate: true });
                setInputValue(locationName);
                setIsDropdownVisible(false);
            }
        } catch (error) {
            console.error('Error selecting location:', error);
        }
    }, [setValue]);

    const handleFail = (error: any) => {
        console.error('Google Places API Error:', error);
    }

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No locations found</Text>
        </View>
    );

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
                    <InputField
                        {...props}
                        placeholder="Search location"
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
                radius: 50000,                     // in meters
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
};
  