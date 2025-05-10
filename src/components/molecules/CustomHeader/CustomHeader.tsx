import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyles } from './CustomHeader.style';
import { ThemeToggleButton } from '../../atoms/ThemeToggleButton/ThemeToggleButton';
import { useTheme } from '../../../hooks/UseTheme';
import { AppStackRoutes } from '../../../constants/AppStackRoutes';
import { useNavigation } from '@react-navigation/native';
import ProfileIcon from '../../../assets/icons/SmallProfile.svg'
export const CustomHeader = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation<any>();
  return (
    <View style={[styles.container, { paddingTop: insets.top+20 }]}>
      <View style={styles.leftContainer}>
        <Pressable onPress={() => navigation.navigate(AppStackRoutes.Profile)} style={styles.ImageContainer}> 
          <ProfileIcon/>
        </Pressable>
        <View>
          <Text style={{fontWeight:'light', color: colors.text}}>Hello,</Text>
          <Text style={styles.name}>John Doe</Text>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <ThemeToggleButton />
      </View>
    </View>
  );
};
