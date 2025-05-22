import React from 'react';
import { View, KeyboardAvoidingView, ScrollView, Platform, Alert, SafeAreaView } from 'react-native';
import { AuthHeaderText } from '../../components/atoms/AuthHeaderText';
import { InputField } from '../../components/atoms/InputField';
import { createStyles } from './Login.style';
import { CustomButton } from '../../components/atoms/CustomButton';
import { AuthSmallText } from '../../components/atoms/AuthSmallText';
import { AuthStackRoutes } from '../../constants/AuthStackRoutes';
import { Controller, useForm } from 'react-hook-form';
import { LoginSchemaType } from '../../schemas/Login.schema';
import { LoginSchema } from '../../schemas/Login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '../../hooks/UseTheme';

import { UserService } from '../../services/UserService/UserService';
import useAuthStore from '../../stores/authStore/authStore';
import { useMutation } from '@tanstack/react-query';
import { handleError } from '../../lib/handleError';

function Login({ navigation }: any) {
  const { colors } = useTheme();
  const { setTokens, setUser } = useAuthStore();
  const styles = createStyles(colors);
  
  const {mutate, isPending} = useMutation({
    mutationFn: async (data: LoginSchemaType) => {
      const loginResponse = await UserService.login(data);
      if (loginResponse.success) {
        setTokens(loginResponse.data.accessToken, loginResponse.data.refreshToken);
        // Then fetch user profile
        const userResponse = await UserService.getUserProfile();
        return { loginResponse, userResponse };
      }
      return { loginResponse, userResponse: null };
    },
    onSuccess: (data) => {
      if (data.loginResponse.success && data.userResponse?.success && data.userResponse.data?.user) {
        setUser(data.userResponse.data.user);
      }
    },
    onError: (error) => {
      Alert.alert('Error', handleError(error), [{ text: 'OK' }]);
    }
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      mutate({
        ...data,
        email: data.email.toLowerCase()
      });
    } catch (error) {
      Alert.alert('Error', handleError(error), [{ text: 'OK' }]);
    } 
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1, backgroundColor: colors.background }}
      >
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <AuthHeaderText title="Login" />
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="email"
                render={({ field:{onChange,value,onBlur} }) => {
                  return <InputField placeholder="Email" error={errors.email?.message} onChangeText={onChange} value={value} onBlur={onBlur} />;
                }}
              />
              <Controller
                control={control}
                name="password"
                render={({ field:{onChange,value,onBlur} }) => {
                  return <InputField password={true} placeholder="Password" error={errors.password?.message} onChangeText={onChange} value={value} onBlur={onBlur} />;
                }}
              />
            </View>
            <CustomButton 
              title="Login" 
              loading={isPending}
              onPress={handleSubmit(onSubmit)} 
              disabled={isPending}
            />
            <AuthSmallText
              text="Don't have an account?"
              linkText="Sign up"
              onPress={() => {
                navigation.replace(AuthStackRoutes.Signup);
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export { Login };
