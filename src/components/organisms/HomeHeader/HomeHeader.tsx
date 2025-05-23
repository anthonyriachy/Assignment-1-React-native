import React from 'react';
import { View } from 'react-native';
import { SearchBar } from '../../atoms/SearchBar';
import { CarouselSection } from '../CarouselSection';
import { createStyles } from './HomeHeader.style.ts';
import { useNavigation } from '@react-navigation/native';
import { AppStackRoutes } from '../../../constants/AppStackRoutes';
import { ProductDTO } from '../../../types/productDTO';

interface HomeHeaderProps {
  search: string;
  setSearch: (search: string) => void;
  products: ProductDTO[];
  isLoading: boolean;
}

function HomeHeader({ search, setSearch, products, isLoading }: HomeHeaderProps) {
  const styles = createStyles();
  const navigation = useNavigation<any>();

  const handleSearch = (searchText: string) => {
    setSearch(searchText);
    if (searchText.trim()) {
      navigation.navigate(AppStackRoutes.Products, {
        search: searchText,
        title: 'Search Results'
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar search={search} setSearch={handleSearch} autoSearch={false}/>
      </View>
      <CarouselSection products={products} isLoading={isLoading} />
    </View>
  );
}

export { HomeHeader }; 