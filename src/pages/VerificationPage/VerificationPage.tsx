import { Text, View } from "react-native";

import { useAuthContext } from "../../hooks/useAuthContext";
import { AuthHeaderText } from "../../components/atoms/AuthHeaderText";
import { styles } from "./VerificationPage.style";
import { VerificationCodeInput } from "../../components/atoms/VerificationCodeInput/VerificationCodeInput";
import { CustomButton } from "../../components/atoms/CustomButton";
import { useState } from "react";

export const VerificationPage = () => {
    const {setUser, setIsAuthenticated} = useAuthContext();
    const [code, setCode] = useState(['', '', '', '']);

    const handleVerificationComplete = () => {
        setUser({ email: 'eurisko@gmail.com' });
        setIsAuthenticated(true);
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