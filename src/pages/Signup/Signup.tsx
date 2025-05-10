import { View } from 'react-native';
import { AuthHeaderText } from '../../components/atoms/AuthHeaderText';
import { InputField } from '../../components/atoms/InputField';
import { CustomButton } from '../../components/atoms/CustomButton';
import { AuthSmallText } from '../../components/atoms/AuthSmallText';
import { createStyles } from './Signup.style';
import { AuthStackRoutes } from '../../constants/AuthStackRoutes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { SignupSchema, SignupSchemaType } from '../../schemas/Signup.schema.ts';
import { useTheme } from '../../hooks/UseTheme';

export const Signup = ({navigation}:any)=>{
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
    },
  });
  const onSubmit = () => {
    navigation.navigate(AuthStackRoutes.Verification);
  };
  return (
    <View style={styles.container}>
      <AuthHeaderText title="Signup" />
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="name"
          render={({ field:{onChange,value,onBlur} }) => {
            return <InputField placeholder="Name" error={errors.name?.message} onChangeText={onChange} value={value} onBlur={onBlur} />;
          }}
        />
        <Controller
          control={control}
          name="email"
          render={({ field:{onChange,value,onBlur} }) => {
            return <InputField keyboardType='email-address' placeholder="Email" error={errors.email?.message} onChangeText={onChange} value={value} onBlur={onBlur} />;
          }}
        />

        <Controller
          control={control}
          name="phoneNumber"
          render={({ field:{onChange,value,onBlur} }) => {
            return <InputField keyboardType='number-pad' placeholder="Phone Number" error={errors.phoneNumber?.message} onChangeText={onChange} value={value} onBlur={onBlur} />;
          }}
        />
        <Controller
          control={control}
          name="password"
          render={({ field:{onChange,value,onBlur} }) => {
            return <InputField password={true} placeholder="Password" error={errors.password?.message} onChangeText={onChange} value={value} onBlur={onBlur} />;
          }}
        />

        
        
        <CustomButton title="Signup" onPress={handleSubmit(onSubmit)} />
        <AuthSmallText text="Already have an account?" linkText="Login" onPress={()=>{navigation.replace(AuthStackRoutes.Login)}} />
      </View>
    </View>
    );
};
