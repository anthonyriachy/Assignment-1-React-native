import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SearchBar } from '../../components/atoms/SearchBar';
import { createStyles } from './Home.style';
import { ItemsSection } from '../../components/organisms/ItemsSection';
import { useTheme } from '../../hooks/UseTheme';
import { useNavigation } from '@react-navigation/native';
import { CarouselSection } from '../../components/organisms/CarouselSection';
import { useGetProducts } from '../../hooks/queries/products/useGetProducts';
import { useErrorAlert } from '../../hooks/useErrorAlert/useErrorAlert';
import { Loading } from '../../components/atoms/Loading';

function Home() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');
  
  const navigateToProducts = (title: string) => {
    navigation.navigate('Products', { title });
  }

  const { data, isLoading, error, refetch } = useGetProducts({ searchQuery: search });

  useErrorAlert({
    error: error || null,
    onRetry: refetch
  });

  if (isLoading) return <Loading />;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          <View style={styles.searchContainer}>
            <SearchBar search={search} setSearch={setSearch}/>
          </View>
          <CarouselSection/>
          <ItemsSection data={data} title="Most Popular" horizontal={true} onClick={() => navigateToProducts('Most Popular')} />
          <ItemsSection data={data} title="New Arrivals" horizontal={false} onClick={() => navigateToProducts('New Arrivals')} />
        </View>
      </ScrollView>
    </View>
  );
}

export { Home };

