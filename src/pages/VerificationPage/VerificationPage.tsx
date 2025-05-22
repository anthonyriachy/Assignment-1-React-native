import { Alert, Pressable, Text, View } from 'react-native';
import { AuthHeaderText } from '../../components/atoms/AuthHeaderText';
import { VerificationCodeInput } from '../../components/atoms/VerificationCodeInput/VerificationCodeInput';
import { CustomButton } from '../../components/atoms/CustomButton';
import { useEffect, useState } from 'react';
import { useTheme } from '../../hooks/UseTheme';
import { createStyles } from './VerificationPage.style';
import { handleError } from '../../lib/handleError';
import { UserService } from '../../services/UserService/UserService';
import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { AuthStackRoutes } from '../../constants/AuthStackRoutes';


export const VerificationPage = ({route}:any) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const navigation = useNavigation<any>();
    const [code, setCode] = useState(['', '', '', '','','']);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const {email} = route.params;
    const verifyMutation = useMutation({
        mutationFn: (otp: string) => UserService.verifyOTP({ email, otp }),
        onSuccess: (response) => {
            Alert.alert('Success', response.data?.message || 'Email verified successfully');
            navigation.navigate(AuthStackRoutes.Login);
        },
        onError: (error) => {
            Alert.alert('Error', handleError(error), [{ text: 'OK' }]);
        },
    });

    const resendMutation = useMutation({
        mutationFn: () => UserService.resendOTP({ email }),
        onSuccess: (response) => {
            setTimer(60);
            setCanResend(false);
            Alert.alert('Success', response.data?.message || 'Code resent successfully');
        },
        onError: (error) => {
            Alert.alert('Error', handleError(error), [{ text: 'OK' }]);
            setCanResend(true);
        },
    });

    useEffect(() => {
        if (timer === 0) {
          setCanResend(true);
          return;
        }

        const interval = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const handleResendCode = async () => {
        if(!canResend) {return;}
        setCanResend(false);
        resendMutation.mutate();
    };

    const handleVerificationComplete = async() => {
        const otp = code.join('');
        if(otp === ''){
            Alert.alert('Error', 'Code is required');
            return;
        }
        verifyMutation.mutate(otp);
    };

    return (
        <View style={styles.container}>
            <AuthHeaderText title="Verification Code" />
            <View style={styles.content}>
                <Text style={styles.subtitle}>Enter the code sent to your email</Text>
                <VerificationCodeInput onCodeComplete={handleVerificationComplete} code={code} setCode={setCode} />
                <Pressable
                    onPress={handleResendCode}
                    disabled={!canResend || resendMutation.isPending}
                    style={{ opacity: canResend && !resendMutation.isPending ? 1 : 0.5 }}
                >
                    <Text style={{color:colors.primary}}>
                        {canResend ? 'Resend Code' : `Resend Code in ${timer}s`}
                    </Text>
                </Pressable>
                <CustomButton
                    title={'Verify'}
                    onPress={handleVerificationComplete}
                    disabled={verifyMutation.isPending}
                    loading={verifyMutation.isPending}
                />
            </View>
        </View>
    );
};
