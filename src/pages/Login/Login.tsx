import React from 'react';
import { View, Alert } from 'react-native';
import { AuthHeaderText } from '../../components/atoms/AuthHeaderText';
import { InputField } from '../../components/atoms/InputField';
import { styles } from './Login.style';
import { CustomButton } from '../../components/atoms/CustomButton';
import { AuthSmallText } from '../../components/atoms/AuthSmallText';
import { AuthStackRoutes } from '../../constants/AuthStackRoutes';
import { Controller, useForm } from 'react-hook-form';
import { LoginSchemaType } from '../../schemas/Login.schema';
import { LoginSchema } from '../../schemas/Login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthContext } from '../../hooks/useAuthContext';

function Login({ navigation }: any) {
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

  const { setIsAuthenticated, setUser } = useAuthContext();

  const onSubmit = (data: LoginSchemaType) => {
    console.log(data);
    if(data.email === 'eurisko@gmail.com' && data.password === 'academy2025'){
      setUser({ email: data.email });
      setIsAuthenticated(true);
    } else {
      Alert.alert('Invalid email or password');
    }
  };

  return (
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
            return <InputField placeholder="Password" error={errors.password?.message} onChangeText={onChange} value={value} onBlur={onBlur} />;
          }}
        />
      </View>
      <CustomButton title="Login" onPress={handleSubmit(onSubmit)} />
      <AuthSmallText
        text="Don't have an account?"
        linkText="Sign up"
        onPress={() => {
          navigation.replace(AuthStackRoutes.Signup);
        }}
      />
    </View>
  );
}

export { Login };
