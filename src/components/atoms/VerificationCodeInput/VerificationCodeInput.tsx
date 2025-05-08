import React, { useRef } from 'react';
import { View, TextInput } from 'react-native';
import { createStyles } from './VerificationCodeInput.style';
import { useTheme } from '../../../hooks/UseTheme';

interface VerificationCodeInputProps {
    onCodeComplete: (code: string) => void; 
    code: string[];
    setCode: (code: string[]) => void;
}

export const VerificationCodeInput = ({ code, setCode }: VerificationCodeInputProps) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const inputRefs = useRef<Array<TextInput | null>>([]);

    const handleCodeChange = (text: string, index: number) => {
        if(isNaN(Number(text))) return;
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        
        if (text && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    return (
        <View style={styles.container}>
            {[0, 1, 2, 3].map((index) => (
                <TextInput
                    key={index}
                    ref={(ref) => {
                        inputRefs.current[index] = ref;
                    }}
                    style={styles.input}
                    maxLength={1}
                    keyboardType="number-pad"
                    value={code[index]}
                    onChangeText={(text) => handleCodeChange(text, index)}
                    // onKeyPress={(e) => handleKeyPress(e, index)}
                />
            ))}
        </View>
    );
};
 