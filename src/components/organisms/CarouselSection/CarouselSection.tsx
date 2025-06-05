import React, { useState, useRef } from 'react';
import { Image, View, FlatList, Dimensions, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { createStyles } from './CarouselSection.style';
import { useTheme } from '../../../hooks/UseTheme';
import { CarouselDots } from '../../molecules/CarouselDots';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';


import { ProductDTO } from '../../../types/productDTO';
import { getImageUrl } from '../../../lib/imageUtils';
import { CarouselShimmer } from './CarouselSectionLoading';
import { CarouselImageItem } from '../../atoms/CarouselImageItem';

const { width } = Dimensions.get('window');

interface CarouselSectionProps {
  products: ProductDTO[];
  isLoading: boolean;
}


export const CarouselSection: React.FC<CarouselSectionProps> = ({ products, isLoading }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation<any>();
  
  const carouselImages = products?.map((product: ProductDTO) => getImageUrl(product.images[0].url)) ?? [];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setCurrentIndex(index);
  };

  const handleDotPress = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const handleItemPress = (index: number) => {
    const product = products[index];
    if (product) {
      navigation.dispatch(
        CommonActions.navigate({
          name: 'Details',
          params: { itemId: product._id },
        })
      );
    }
  };

  if (isLoading) {
    return <CarouselShimmer />;
  }
  if(carouselImages.length === 0){
    return null;
  }
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
        renderItem={({ item, index }) => (
          <CarouselImageItem 
            imageUrl={item}
            onPress={() => handleItemPress(index)}
            styles={styles}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      {carouselImages.length > 0 && (
        <TouchableOpacity
          style={styles.paginationWrapper}
          onPress={() => handleDotPress((currentIndex + 1) % carouselImages.length)}
        >
          <CarouselDots currentIndex={currentIndex} total={carouselImages.length} />
        </TouchableOpacity>
      )}
    </View>
  );
}; 