/* eslint-disable react-native/no-inline-styles */
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useTheme } from '../../hooks/UseTheme';
import { createStyles } from './EditProfile.style';
import { Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { getImageUrl, showImagePickerOptions } from '../../lib/imageUtils';
import { EditProfileSchema, EditProfileSchemaType } from '../../schemas/EditProfile.schema';
import { useForm } from 'react-hook-form';
import { UserService } from '../../services/UserService';
import { useMutation } from '@tanstack/react-query';
import { handleError } from '../../lib/handleError';
import { InputField } from '../../components/atoms/InputField';
import { CustomButton } from '../../components/atoms/CustomButton';
import useAuthStore from '../../stores/authStore/authStore';
import { ChangeProfile } from '../../components/atoms/ChangeProfile/ChangeProfile';

export const EditProfile = () => {
  const {user,setUser} = useAuthStore();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const profileImageUrl = user?.profileImage?.url ? getImageUrl(user.profileImage.url) : null;
  const [profileImage, setProfileImage] = useState<string>(profileImageUrl || '');
  const handleImagePick = async () => {
    const result = await showImagePickerOptions();
    if (result.error) {
      Alert.alert('Error', result.error);
      return;
    }
    if (result.uris[0]) {
      setProfileImage(result.uris[0]);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileSchemaType>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,

    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: EditProfileSchemaType) => {
      const formData = new FormData();
      if(data.profileImage?.url){
        formData.append('profileImage', {
          uri: data.profileImage.url,
          name: 'profileImage.jpg',
          type: 'image/jpeg',
        });
      }
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      return UserService.updateUser(formData);
    },
    onSuccess: (response) => {
      if (response.success) {
        Alert.alert(response.data?.message || 'Signup successful');
        if (response.data?.user) {
          setUser(response.data.user);
        }
      }
    },
    onError: (error) => {
      Alert.alert('Error', handleError(error), [{ text: 'OK' }]);
    },
  });

  const onSubmit = (data: EditProfileSchemaType) => {


    if(!user?.profileImage?.url?.includes(profileImage)){

      data.profileImage = {url:profileImage};
    }

    mutate(data);
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: colors.background}}
    >
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={{flex: 1}}
        >
          <View style={styles.container}>
            <View style={styles.inputContainer}>

              <ChangeProfile styles={styles} profileImage={profileImage} handleImagePick={handleImagePick} />
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, value, onBlur } }) => {
                  return <InputField placeholder="First Name" error={errors.firstName?.message} onChangeText={onChange} value={value} onBlur={onBlur} />;
                }}
              />
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, value, onBlur } }) => {
                  return <InputField placeholder="Last Name" error={errors.lastName?.message} onChangeText={onChange} value={value} onBlur={onBlur} />;
                }}
              />
              <View style={styles.buttonContainer}>
                <CustomButton title="Update" onPress={handleSubmit(onSubmit)} loading={isPending} />
              </View>
            </View>
          </View>
        </ScrollView>
    </KeyboardAvoidingView>
  );
};
