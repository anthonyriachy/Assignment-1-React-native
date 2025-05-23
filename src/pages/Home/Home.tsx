import React, { useMemo, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { createStyles } from './Home.style';
import { useTheme } from '../../hooks/UseTheme';
import { useNavigation } from '@react-navigation/native';
import { HomeHeader } from '../../components/organisms/HomeHeader/HomeHeader';
import { HomeFooter } from '../../components/organisms/HomeFooter/HomeFooter';
import { useGetProducts } from '../../hooks/queries/products/useGetProducts';
import { ProductDTO } from '../../types/productDTO';

function Home() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');
  
  // Fetch products for both header and footer
  const { 
    data: productsData, 
    refetch, 
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useGetProducts({ limit: 10 });

  // Extract data for different sections
  const popularProducts = productsData?.pages[0]?.data ?? [];
  
  const newArrivals = productsData?.pages.reduce<ProductDTO[]>((acc, page) => {
    if (page.data) {
      return [...acc, ...page.data];
    }
    return acc;
  }, []) ?? [];
  
  const navigateToProducts = (title: string) => {
    navigation.navigate('Products', { title });
  }

  const onRefresh = async () => {
    await refetch();
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={
          <HomeHeader 
            search={search} 
            setSearch={setSearch}
            products={popularProducts.slice(0, 5)}
            isLoading={isLoading}
          />
        }
        ListFooterComponent={
          <HomeFooter 
            onNavigateToProducts={navigateToProducts}
            popularProducts={popularProducts}
            newArrivals={newArrivals}
            isLoading={isLoading}
            onLoadMore={handleLoadMore}
            hasMore={hasNextPage}
            isFetchingMore={isFetchingNextPage}
          />
        }
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading && !isFetchingNextPage}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
      />
    </View>
  );
}

export { Home };

