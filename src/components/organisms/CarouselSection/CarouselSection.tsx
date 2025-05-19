import React, { useState, useRef } from 'react';
import { Image, View, FlatList, Dimensions, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { createStyles } from './CarouselSection.style';
import { useTheme } from '../../../hooks/UseTheme';
import { CarouselDots } from '../../molecules/CarouselDots';
import Products  from '../.././../../Products.json';
const { width } = Dimensions.get('window');

const carouselImages = [
  Products.data[0].images[0].url,
  Products.data[1].images[0].url,
  Products.data[2].images[0].url,
];


export const CarouselSection: React.FC = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setCurrentIndex(index);
  };

  const handleDotPress = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={carouselImages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: item }} 
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.paginationWrapper}
        onPress={() => handleDotPress((currentIndex + 1) % carouselImages.length)}
      >
        <CarouselDots currentIndex={currentIndex} total={carouselImages.length} />
      </TouchableOpacity>
    </View>
  );
}; 