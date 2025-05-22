import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ItemsSection } from '../ItemsSection';
import { createStyles } from './HomeFooter.style.ts';
import { useGetProducts } from '../../../hooks/queries/products/useGetProducts/useGetProducts.ts';
import { ProductDTO } from '../../../types/productDTO';

interface HomeFooterProps {
  onNavigateToProducts: (title: string) => void;
}

function HomeFooter({ onNavigateToProducts }: HomeFooterProps) {
  const styles = createStyles();
  
  // Most Popular products - horizontal list with more items
  const { data: popularProducts } = useGetProducts({ limit: 10 });
  const popularData = popularProducts?.pages[0]?.data ?? [];

  // New Arrivals - vertical list with infinite loading
  const { 
    data: newArrivalsData, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useGetProducts({ limit: 5 });

  const newArrivals = newArrivalsData?.pages.reduce<ProductDTO[]>((acc, page) => {
    if (page.data) {
      return [...acc, ...page.data];
    }
    return acc;
  }, []) ?? [];

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if(!popularData.length || !newArrivalsData?.pages[0]?.data) {
    return (
      <View style={styles.container}>
        <View style={[styles.loaderContainer, { paddingVertical: 20 }]}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ItemsSection 
        title="Most Popular" 
        horizontal={true} 
        onClick={() => onNavigateToProducts('Most Popular')} 
        data={popularData}
      />
      <ItemsSection 
        title="New Arrivals" 
        horizontal={false} 
        onClick={() => onNavigateToProducts('New Arrivals')}
        data={newArrivals}
        onLoadMore={handleLoadMore}
        isLoading={isFetchingNextPage}
        hasMore={hasNextPage}
      />
    </View>
  );
}

export { HomeFooter }; 