import React, { useMemo, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { createStyles } from './Home.style';
import { useTheme } from '../../hooks/UseTheme';
import { useNavigation } from '@react-navigation/native';
import { HomeHeader } from '../../components/organisms/HomeHeader/HomeHeader';
import { HomeFooter } from '../../components/organisms/HomeFooter/HomeFooter';

function Home() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  
  const navigateToProducts = (title: string) => {
    navigation.navigate('Products', { title });
  }

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={
          <HomeHeader search={search} setSearch={setSearch} />
        }
        ListFooterComponent={
          <HomeFooter onNavigateToProducts={navigateToProducts} />
        }
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
}

export { Home };

