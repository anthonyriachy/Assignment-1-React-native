import React from 'react';
import { FlatList, Text, View, Animated } from 'react-native';
import { createStyles } from './Products.style';
import { useTheme } from '../../hooks/UseTheme';
import { BackArrow } from '../../components/atoms/BackArrow';
import products from '../../../Products.json';
import { ItemsCard } from '../../components/molecules/ItemsCard';
import { SearchBar } from '../../components/atoms/SearchBar';
import { useState, useRef, useEffect } from 'react';

export const Products = ({route}: {route: any}) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const params = route?.params;
    const [search, setSearch] = useState('');
    const [isResultsVisible, setIsResultsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const heightAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.spring(heightAnim, {
            toValue: isResultsVisible ? 1 : 0,
            useNativeDriver: false,
            tension: 50,
            friction: 7
        }).start();
    }, [isResultsVisible, heightAnim]);

    const handleScroll = (event: any) => {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        if (currentScrollY > 20) {
            setIsResultsVisible(false);
        } else {
            setIsResultsVisible(true);
        }
        lastScrollY.current = currentScrollY;
    };

    return <View style={styles.container} >
        <View style={styles.header}>
            {params && <View style={styles.backButton}>
                <BackArrow />
            </View>}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{params?.title || 'Products'}</Text>
            </View>
        </View>
       
        
        <Animated.View style={[
            styles.results,
            {
                maxHeight: heightAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 100]
                }),
                overflow: 'hidden',
                flexDirection:'column',
            }
        ]}>
             <View style={styles.searchContainer}>
            <SearchBar search={params?.search || search} setSearch={setSearch}/>
        </View>
            {search&&
            <>
            <View style={styles.resultsContainer}>
                <Text style={styles.resultsText}>Result for:</Text>
                <Text style={styles.resultsText2}>{params?.search || search}</Text>
            </View>
            <View style={styles.resultsText3}>
                <Text style={{fontFamily:'Poppins-Bold',color:colors.primary}}>{products.data.length} </Text>
                <Text style={styles.resultsText3}> results </Text>
            </View>
            </>}
        </Animated.View>
        <View style={styles.list}>   
            <FlatList
                data={products.data}
                numColumns={2}
                renderItem={({item}) => <ItemsCard item={item} smaller={true}/>}
                contentContainerStyle={{ gap: 10, padding: 15}}
                columnWrapperStyle={{gap: 10,justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            />
        </View>
    </View>;
};
