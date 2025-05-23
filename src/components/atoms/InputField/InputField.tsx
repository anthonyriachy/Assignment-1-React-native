import React, { useState } from 'react';
import { TextInput,View, Text, TouchableOpacity } from 'react-native';
import { createStyles } from './InputField.style';
import { useTheme } from '../../../hooks/UseTheme';
import { InputFieldProps } from './InputField.type';
import Eye from '../../../assets/icons/iconmonstr-eye-1.svg';
import EyeSlash from '../../../assets/icons/iconmonstr-eye-10.svg';
import { ErrorText } from '../ErrorText/ErrorText';
export const InputField = ({ placeholder, error, password=false, ...props }: InputFieldProps) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View>
            {error && <ErrorText error={error}/>}
            <View style={styles.input}>
                <TextInput 
                    placeholder={placeholder}
                    placeholderTextColor={colors.inputText}
                    {...props}
                    style={styles.inputField}
                    secureTextEntry={password && !showPassword}
                />
                 {password && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Eye fill={colors.text}/> : <EyeSlash fill={colors.text}/>}
                </TouchableOpacity>
            )}
            </View>
        </View>
    );
};
