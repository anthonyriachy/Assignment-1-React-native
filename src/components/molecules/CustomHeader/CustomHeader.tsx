import React from 'react';
import { View, Text, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyles } from './CustomHeader.style';
import { ThemeToggleButton } from '../../atoms/ThemeToggleButton/ThemeToggleButton';
import { useTheme } from '../../../hooks/UseTheme';


export const CustomHeader = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={[styles.container, { paddingTop: insets.top+20 }]}>
      <View style={styles.leftContainer}>
        <Image source={require('../../../assets/images/Profile.png')} style={styles.ImageContainer} />
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
