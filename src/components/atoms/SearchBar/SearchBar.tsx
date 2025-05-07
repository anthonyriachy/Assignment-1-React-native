import { View } from 'react-native';
import  SearchIcon from '../../../assets/icons/BottomTabSearch.svg';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from './SearchBar.style';
export const SearchBar = () => {
  return <View style={styles.container}>
    <SearchIcon />
    <TextInput
      placeholder="Search here"
      style={styles.input}
    />
  </View>
    ;
};
