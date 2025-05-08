import { Text, View, Alert } from 'react-native';

import { useAuthContext } from '../../hooks/useAuthContext';
import { AuthHeaderText } from '../../components/atoms/AuthHeaderText';
import { VerificationCodeInput } from '../../components/atoms/VerificationCodeInput/VerificationCodeInput';
import { CustomButton } from '../../components/atoms/CustomButton';
import { useState } from 'react';
import { useTheme } from '../../hooks/UseTheme';
import { createStyles } from './VerificationPage.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const VerificationPage = () => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const {setUser, setIsAuthenticated} = useAuthContext();
    const [code, setCode] = useState(['', '', '', '']);

    const handleVerificationComplete = async() => {
        console.log(code.join(''));
        if(code.join('') === '1234'){
            setUser({ email: 'eurisko@gmail.com' });
            setIsAuthenticated(true);
            await AsyncStorage.setItem('user', JSON.stringify({ email: 'eurisko@gmail.com' }));
        }else{
            Alert.alert('Invalid code');
        }
    };

    return (
        <View style={styles.container}>
            <AuthHeaderText title="Verification Code" />
            <View style={styles.content}>
                <Text style={styles.subtitle}>Enter the code sent to your email</Text>
                <VerificationCodeInput onCodeComplete={handleVerificationComplete} code={code} setCode={setCode} />
                <CustomButton
                    title="Verify"
                    onPress={() => {
                        handleVerificationComplete();
                    }}
                />
            </View>
        </View>
    );
};
