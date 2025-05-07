import React from 'react';
import { View } from 'react-native';
import { SearchBar } from '../../components/atoms/SearchBar';
import { styles } from './Home.style';
import { ItemsSection } from '../../components/organisms/ItemsSection';
import ScreenWrapper from '../../components/templates/ScreenWrapper/ScreenWrapper';



function Home() {
  return (

    <View style={styles.container}>
      <SearchBar />
      <ItemsSection title="Featured"/>
    </View>

  );
}

export {Home};

