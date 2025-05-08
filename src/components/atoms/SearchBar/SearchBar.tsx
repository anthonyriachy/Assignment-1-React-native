import { View } from 'react-native';
import  SearchIcon from '../../../assets/icons/BottomTabSearch.svg';
import { TextInput } from 'react-native-gesture-handler';
import { createStyles } from './SearchBar.style';
import { useTheme } from '../../../hooks/UseTheme';

export const SearchBar = () => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
  return <View style={styles.container}>
    <SearchIcon />
    <TextInput
      placeholder="Search here"
      placeholderTextColor={colors.inputText}
      style={styles.input}
    />
  </View>
    ;
};
