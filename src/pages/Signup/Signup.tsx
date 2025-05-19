import { KeyboardAvoidingView, Platform, ScrollView, Text, View, Image, Alert } from 'react-native';
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
import { useState } from 'react';
import SmallProfile from '../../assets/icons/SmallProfile.svg';
import CameraIcon from '../../assets/icons/photo-camera-svgrepo-com.svg';
import { showImagePickerOptions } from '../../lib/imageUtils';
import { UserService } from '../../services/UserService/UserService.ts';
import { handleError } from '../../lib/handleError/handleError.ts';
import { useMutation } from '@tanstack/react-query';

export const Signup = ({navigation}:any)=>{
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const handleImagePick = async () => {
    const result = await showImagePickerOptions();
    if (result.error) {
      Alert.alert('Error', result.error);
      return;
    }
    if (result.uri) {
      setProfileImage(result.uri);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SignupSchemaType) => {
      const formData = new FormData();
      formData.append('profileImage', {
        uri: profileImage,
        name: 'profileImage.jpg',
        type: 'image/jpeg',
      });
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      formData.append('password', data.password);
      return UserService.signup(formData);
    },
    onSuccess: (response, variables) => {
      if (response.success) {
        Alert.alert(response.data?.message || 'Signup successful');
        navigation.navigate(AuthStackRoutes.Verification, { email: variables.email });
      }
    },
    onError: (error) => {
      Alert.alert('Error', handleError(error), [{ text: 'OK' }]);
    }
  });

  const onSubmit = (data: SignupSchemaType) => {
    mutate(data);
  };
 
  return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
    <View style={styles.container}>
      <AuthHeaderText title="Signup" />
        <View style={styles.inputContainer}>
          <View style={styles.profileContainer}>
            <View style={styles.profile}>
              <View style={styles.profileInnerContainer}>
                {profileImage ? (
                  <Image 
                    source={{ uri: profileImage }} 
                    style={{ width: 80, height: 80, borderRadius: 40 }}
                    resizeMode="cover"
                  />
                ) : (
                  <SmallProfile width={80} height={80} />
                )}
              </View>
              <View style={styles.profileBtn} onTouchEnd={handleImagePick}>
                <CameraIcon width={24} height={24} />
              </View>
            </View>
            <Text>Upload Profile</Text>
          </View>
          <Controller
            control={control}
            name="firstName"
            render={({ field:{onChange,value,onBlur} }) => {
              return <InputField placeholder="First Name" error={errors.firstName?.message} onChangeText={onChange} value={value} onBlur={onBlur} />;
            }}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field:{onChange,value,onBlur} }) => {
              return <InputField placeholder="Last Name" error={errors.lastName?.message} onChangeText={onChange} value={value} onBlur={onBlur} />;
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
            name="password"
            render={({ field:{onChange,value,onBlur} }) => {
              return <InputField password={true} placeholder="Password" error={errors.password?.message} onChangeText={onChange} value={value} onBlur={onBlur} />;
            }}
          />
          <CustomButton title="Signup" onPress={handleSubmit(onSubmit)} loading={isPending} />
          <AuthSmallText text="Already have an account?" linkText="Login" onPress={()=>{navigation.replace(AuthStackRoutes.Login)}} />
      </View>
    </View>
    </ScrollView>
        </KeyboardAvoidingView>
    );
};
