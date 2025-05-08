import { View, Pressable } from 'react-native';
import  SearchIcon from '../../../assets/icons/BottomTabSearch.svg';
import { TextInput } from 'react-native-gesture-handler';
import { createStyles } from './SearchBar.style';
import { useTheme } from '../../../hooks/UseTheme';
import Clear from '../../../assets/icons/Clear.svg';
import { SearchBarProps } from './Search.type';
export const SearchBar = ({search,setSearch}: SearchBarProps) => {
    const { colors } = useTheme();
    
    const styles = createStyles(colors);
    const handleClearSearch = () => {
        setSearch('');
    }  
  return <View style={styles.container}>
    <SearchIcon />
    <TextInput
      placeholder="Search here"
      placeholderTextColor={colors.inputText}
      style={styles.input}
      value={search}
      onChangeText={setSearch}
    />
    {search && <Pressable onPress={handleClearSearch}>
        <Clear stroke={colors.text}/>
    </Pressable>}
  </View>
    ;
};
