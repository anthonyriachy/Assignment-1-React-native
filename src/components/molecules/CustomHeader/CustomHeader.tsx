/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyles } from './CustomHeader.style';
import { ThemeToggleButton } from '../../atoms/ThemeToggleButton/ThemeToggleButton';
import { useTheme } from '../../../hooks/UseTheme';
import { useNavigation } from '@react-navigation/native';
import ProfileIcon from '../../../assets/icons/SmallProfile.svg'
import useAuthStore from '../../../stores/authStore/authStore';
import { getImageUrl } from '../../../lib/imageUtils';
import { BottomTabRoutes } from '../../../constants/BottomTabRoutes';
import { CustomText } from '../../atoms/CustomText/CustomText';
 
export const CustomHeader = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation<any>();
  const {user}=useAuthStore()
  
  
  const profileImage = user?.profileImage?.url ? getImageUrl(user.profileImage.url) : undefined;
  const fullname=user?.firstName+' '+user?.lastName
  return (
    <View style={[styles.container, { paddingTop: insets.top+20 }]}>
      <View style={styles.leftContainer}>
        <Pressable onPress={() => navigation.navigate(BottomTabRoutes.ProfileStack)} style={styles.ImageContainer}> 
          {profileImage ? <Image source={{uri:profileImage}} style={styles.profileImage}/> : <ProfileIcon/>}
        </Pressable>
        <View>
          <CustomText style={{fontWeight:'light', color: colors.text}}>Hello,</CustomText>
          <CustomText style={styles.name}>{fullname}</CustomText>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <ThemeToggleButton />
      </View>
    </View>
  );
};
