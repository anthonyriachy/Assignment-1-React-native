import React from 'react';
import { ScrollView, View } from 'react-native';
import { SearchBar } from '../../components/atoms/SearchBar';
import { createStyles } from './Home.style';
import { ItemsSection } from '../../components/organisms/ItemsSection';
import { useTheme } from '../../hooks/UseTheme';


function Home() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          <SearchBar />
          <ItemsSection title="Featured" horizontal={true} />
          <ItemsSection title="Most Popular" horizontal={true} />
          <ItemsSection title="New Arrivals" horizontal={false} />
        </View>
      </ScrollView>
    </View>
  );
}

export { Home };

