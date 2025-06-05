import React from 'react';
import { View } from 'react-native';
import { ItemsSection } from '../ItemsSection';
import { createStyles } from './HomeFooter.style.ts';
import { ProductDTO } from '../../../types/productDTO';
import { HomeFooterLoading } from './HomeFooter.loading.tsx';

interface HomeFooterProps {
  onNavigateToProducts: (title: string) => void;
  popularProducts: ProductDTO[];
  newArrivals: ProductDTO[];
  isLoading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
  isFetchingMore: boolean;
}

function HomeFooter({ 
  onNavigateToProducts, 
  popularProducts, 
  newArrivals,
  isLoading,
  onLoadMore,
  hasMore,
  isFetchingMore
}: HomeFooterProps) {
  const styles = createStyles();

  const handlePopularProductsClick = () => onNavigateToProducts('Most Popular');
  const handleNewArrivalsClick = () => onNavigateToProducts('New Arrivals');

  if(isLoading) {
    return <HomeFooterLoading onNavigateToProducts={onNavigateToProducts} />;
  }

  return (
    <View style={styles.container}>
      <ItemsSection 
        title="Most Popular" 
        horizontal={true} 
        onClick={handlePopularProductsClick} 
        data={popularProducts}
        isLoading={isLoading}
      />
      <ItemsSection 
        title="New Arrivals" 
        horizontal={false} 
        onClick={handleNewArrivalsClick}
        data={newArrivals}
        onLoadMore={onLoadMore}
        isLoading={isLoading}
        hasMore={hasMore}
        isFetchingMore={isFetchingMore}
      />
    </View>
  );
}

export { HomeFooter }; 