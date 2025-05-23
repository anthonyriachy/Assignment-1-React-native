import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../hooks/UseTheme';
import { BackArrow } from '../../atoms/BackArrow';
import { createStyles } from './StackHeader.style';
import { CustomText } from '../../atoms/CustomText/CustomText';

interface StackHeaderProps {
  title: string;
}

export const StackHeader = ({ title }: StackHeaderProps) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.backButtonContainer}>
        <BackArrow />
      </View>
      <View style={styles.titleContainer}>
        <CustomText style={styles.title}>{title}</CustomText>
      </View>
      <View style={styles.rightContainer} />
    </View>
  );
}; 