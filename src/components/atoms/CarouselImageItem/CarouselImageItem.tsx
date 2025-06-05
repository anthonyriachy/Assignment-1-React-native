import { useTheme } from "../../../hooks/UseTheme";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

export const CarouselImageItem = ({ 
    imageUrl, 
    onPress, 
    styles 
  }: { 
    imageUrl: string; 
    onPress: () => void;
    styles: any;
  }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { colors } = useTheme();
  
    return (
      <TouchableOpacity 
        style={styles.imageContainer}
        onPress={onPress}
        activeOpacity={0.9}
      >
        {isLoading && (
          <ShimmerPlaceholder
            style={styles.image}
            LinearGradient={LinearGradient}
            shimmerColors={[colors.background, colors.border, colors.background]}
          />
        )}
        <Image 
          source={{ uri: imageUrl }} 
          style={[styles.image, isLoading && { position: 'absolute', opacity: 0 }]}
          resizeMode="contain"
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
        />
      </TouchableOpacity>
    );
  };
  