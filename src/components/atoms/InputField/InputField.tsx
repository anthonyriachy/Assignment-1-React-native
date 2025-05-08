import React from 'react';
import { TextInput, TextInputProps, View, Text   } from 'react-native';
import { createStyles } from './InputField.style';
import { useTheme } from '../../../hooks/UseTheme';

interface InputFieldProps extends TextInputProps {
    placeholder: string;
    error?: string;
}

export const InputField = ({ placeholder, error, ...props }: InputFieldProps) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    return (
        <View>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <View style={styles.input}>
                <TextInput 
                    placeholder={placeholder}
                    placeholderTextColor={colors.inputText}
                    {...props}
                    style={styles.inputField}
                />
            </View>
        </View>
    );
};
