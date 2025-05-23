import React from 'react';
import { View } from 'react-native';
import { createStyles } from './CarouselSection.style';
import { useTheme } from '../../../hooks/UseTheme';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'react-native-linear-gradient';

export const CarouselShimmer = () => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    
    return (
      <View style={styles.container}>
        <ShimmerPlaceholder style={styles.imageContainer} LinearGradient={LinearGradient}/>
      </View>
    );
  };