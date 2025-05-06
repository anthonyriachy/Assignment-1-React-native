import { View } from 'react-native';
import { AuthHeaderText } from '../../components/atoms/AuthHeaderText';
import { InputField } from '../../components/atoms/InputField';
import { CustomButton } from '../../components/atoms/CustomButton';
import { AuthSmallText } from '../../components/atoms/AuthSmallText';
import { styles } from './Signup.style';
import { AuthStackRoutes } from '../../constants/AuthStackRoutes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { SignupSchema, SignupSchemaType } from '../../schemas/Signup.schema.ts';
export const Signup = ({navigation}:any)=>{
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
    },
  });
  const onSubmit = (data: SignupSchemaType) => {
    console.log(data);
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
        
        <CustomButton title="Signup" onPress={handleSubmit(onSubmit)} />
        <AuthSmallText text="Already have an account?" linkText="Login" onPress={()=>{navigation.replace(AuthStackRoutes.Login)}} />
      </View>
    </View>
    );
};
