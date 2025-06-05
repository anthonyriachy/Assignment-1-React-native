import React from 'react';
import { View } from 'react-native';
import { SearchBar } from '../../atoms/SearchBar';
import { CarouselSection } from '../CarouselSection';
import { createStyles } from './HomeHeader.style.ts';
import { useNavigation } from '@react-navigation/native';
import { AppStackRoutes } from '../../../constants/AppStackRoutes';
import { HomeHeaderProps } from './HomeHeader.type';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamsList } from '../../../types/AppStackParamsList';

function HomeHeader({ search, setSearch, products, isLoading }: HomeHeaderProps) {
  const styles = createStyles();
  const navigation = useNavigation<StackNavigationProp<AppStackParamsList>>();

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