import React from 'react';
import { TextInput, TextInputProps, View, Text   } from 'react-native';
import { styles } from './InputField.style';
import { colors } from '../../../constants/colors';

interface InputFieldProps extends TextInputProps {
    placeholder: string;
    error?: string;
}

export const InputField = ({ placeholder, error, ...props }: InputFieldProps) => {
    return (
        <View style={styles.container}>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <View style={styles.input}>
                <TextInput 
                    placeholder={placeholder}
                    placeholderTextColor={'gray'}
                    {...props}
                    style={styles.inputField}
                />
            </View>
        </View>
    );
};
