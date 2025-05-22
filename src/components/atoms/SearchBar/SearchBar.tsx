import { View, Pressable } from 'react-native';
import  SearchIcon from '../../../assets/icons/BottomTabSearch.svg';
import { TextInput } from 'react-native-gesture-handler';
import { createStyles } from './SearchBar.style';
import { useTheme } from '../../../hooks/UseTheme';
import Clear from '../../../assets/icons/Clear.svg';
import { SearchBarProps } from './Search.type';
import { useEffect, useState } from 'react';

export const SearchBar = ({search, setSearch, autoSearch=true}: SearchBarProps) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const [inputValue, setInputValue] = useState(search);

    useEffect(() => {
        setInputValue(search)
    }, [search]);

    useEffect(() => {
        if (autoSearch) {
            const timer = setTimeout(() => {
                setSearch(inputValue);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [inputValue, setSearch, autoSearch]);

    const handleClearSearch = () => {
        setInputValue('');
        setSearch('');
    }  

    const handleSearch = () => {
        setSearch(inputValue);
    }

    return <View style={styles.container}>
        <SearchIcon />
        <TextInput
            placeholder="Search here"
            placeholderTextColor={colors.inputText}
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
        />
        {inputValue && <Pressable onPress={handleClearSearch}>
            <Clear stroke={colors.text}/>
        </Pressable>}
    </View>;
};
