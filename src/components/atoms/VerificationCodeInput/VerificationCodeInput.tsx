import React, { useRef } from 'react';
import { View, TextInput } from 'react-native';
import { styles } from './VerificationCodeInput.style';

interface VerificationCodeInputProps {
    onCodeComplete: (code: string) => void; 
    code: string[];
    setCode: (code: string[]) => void;
}

export const VerificationCodeInput = ({ onCodeComplete, code, setCode }: VerificationCodeInputProps) => {
    const inputRefs = useRef<Array<TextInput | null>>([]);

    const handleCodeChange = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        //move to next input
        if (text && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }

        //all inputs are filled
        if (newCode.every(digit => digit !== '')) {
            onCodeComplete(newCode.join(''));
        }
    };

    // const handleKeyPress = (e: any, index: number) => {
    //     //delete and move back
    //     console.log('e.nativeEvent.key');
    //     if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
    //         inputRefs.current[index - 1]?.focus();
    //     }
    // };

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
 