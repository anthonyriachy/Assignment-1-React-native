import React from 'react';
import { FlatList, Text, View, Animated, ActivityIndicator, RefreshControl, LayoutChangeEvent } from 'react-native';
import { createStyles } from './Products.style';
import { useTheme } from '../../hooks/UseTheme';
import { BackArrow } from '../../components/atoms/BackArrow';
import { ItemsCard } from '../../components/molecules/ItemsCard';
import { SearchBar } from '../../components/atoms/SearchBar';
import { FilterBar, SortOption, FilterOption } from '../../components/molecules/FilterBar/FilterBar';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ProductDTO } from '../../types/ProductDTO';
import { useGetProducts } from '../../hooks/queries/products/useGetProducts';
import { useSearchProducts } from '../../hooks/queries/products/useSearchProducts';
import { useErrorAlert } from '../../hooks/useErrorAlert';

// Memoized ItemsCard component
const MemoizedItemsCard = React.memo(ItemsCard);

// Constants for FlatList optimization
const ITEM_HEIGHT = 200; // Adjust based on your actual item height

export const Products = ({route}: {route: any}) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const params = route?.params;
    const [searchInput, setSearchInput] = useState(params?.search || '');
    const [search, setSearch] = useState(params?.search || '');
    const [isResultsVisible, setIsResultsVisible] = useState(true);
    const [sortOption, setSortOption] = useState<SortOption>('newest');
    const [filters, setFilters] = useState<FilterOption>({});
    const lastScrollY = useRef(0);
    const heightAnim = useRef(new Animated.Value(1)).current;
    const [filterBarHeight, setFilterBarHeight] = useState(0);

    // Products query with pagination
    const { 
        data: initalData, 
        fetchNextPage, 
        hasNextPage, 
        isFetchingNextPage,
        isFetching,
        error,
        refetch
    } = useGetProducts({ limit: 5 });

    // Search query
    const { 
        data: searchResults,
        isLoading: isSearching,
        error: searchError
    } = useSearchProducts(search);

    useErrorAlert({error: error || searchError, onRetry: refetch, onDismiss: () => {}});

    // Update search when input changes
    useEffect(() => {
        setSearch(searchInput);
    }, [searchInput]);

    // Memoize combined data
    const combinedInitialData = useMemo(() => 
        initalData?.pages.reduce<ProductDTO[]>((acc, page) => {
            if (page.data) {
                return [...acc, ...page.data];
            }
            return acc;
        }, []) ?? []
    , [initalData?.pages]);

    const handleLoadMore = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage && !search) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage, search]);

    const handleRefresh = useCallback(() => {
        refetch();
    }, [refetch]);

    // Optimized animation configuration
    useEffect(() => {
        Animated.spring(heightAnim, {
            toValue: isResultsVisible ? 1 : 0,
            useNativeDriver: false,
            tension: 65,
            friction: 8,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01
        }).start();
    }, [isResultsVisible, heightAnim]);

    const handleScroll = useCallback((event: any) => {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        if (currentScrollY > 20) {
            setIsResultsVisible(false);
        } else {
            setIsResultsVisible(true);
        }
        lastScrollY.current = currentScrollY;
    }, []);

    const handleSortChange = useCallback((option: SortOption) => {
        setSortOption(option);
    }, []);

    const handleFilterChange = useCallback((newFilters: FilterOption) => {
        setFilters(newFilters);
    }, []);

    const handleClearFilters = useCallback(() => {
        setFilters({});
    }, []);

    // Memoize sorting and filtering logic
    const sortAndFilterData = useCallback((data: ProductDTO[]) => {
        let sortedData = [...data];

        // Apply sorting
        switch (sortOption) {
            case 'price_asc':
                sortedData.sort((a, b) => a.price - b.price);
                break;
            case 'price_desc':
                sortedData.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                sortedData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case 'oldest':
                sortedData.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                break;
            case 'score':
                sortedData.sort((a, b) => b.score - a.score);
                break;
        }

        // Apply filters
        if (filters.priceRange) {
            if (filters.priceRange.min !== undefined) {
                sortedData = sortedData.filter(item => item.price >= filters.priceRange!.min!);
            }
            if (filters.priceRange.max !== undefined) {
                sortedData = sortedData.filter(item => item.price <= filters.priceRange!.max!);
            }
        }

        if (filters.location) {
            sortedData = sortedData.filter(item => 
                item.location.name.toLowerCase().includes(filters.location!.toLowerCase())
            );
        }

        return sortedData;
    }, [sortOption, filters]);

    // Memoize display data
    const displayData = useMemo(() => 
        search ? searchResults : combinedInitialData
    , [search, searchResults, combinedInitialData]);

    // Memoize sorted and filtered data
    const sortedAndFilteredData = useMemo(() => 
        sortAndFilterData(displayData || [])
    , [displayData, sortAndFilterData]);

    const isLoading = search ? isSearching : isFetching;

    const handleFilterBarLayout = useCallback((event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setFilterBarHeight(height);
    }, []);

    const renderFooter = useCallback(() => {
        if (!isFetchingNextPage && !isSearching) return null;
        return (
            <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color={colors.primary} />
            </View>
        );
    }, [isFetchingNextPage, isSearching, styles.footerLoader, colors.primary]);

    const renderItem = useCallback(({item}: {item: ProductDTO}) => (
        <MemoizedItemsCard item={item} smaller={true} />
    ), []);

    if (!initalData?.pages[0]?.data && isFetching && !search) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return <View style={styles.container} >
        <View style={styles.header}>
            {params && <View style={styles.backButton}>
                <BackArrow />
            </View>}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{params?.title || 'Products'}</Text>
            </View>
        </View>
       
        <View style={styles.searchContainer}>
            <SearchBar 
                search={searchInput} 
                setSearch={setSearchInput}
            />
        </View>
        {search &&
        <View style={styles.resultsContainer}>
            <View style={styles.resultsContainerLeft}>
                <Text style={styles.resultsText}>Result for:</Text>
                <Text style={styles.resultsText2}>{searchInput}</Text>
            </View>
            <View style={styles.resultsText3Container}>
                <Text style={{fontFamily:'Poppins-Bold',color:colors.primary}}>{sortedAndFilteredData.length} </Text>
                <Text style={styles.resultsText3}> results </Text>
            </View>
        </View>}
            
        <Animated.View style={[
            styles.results,
            {
                maxHeight: heightAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, filterBarHeight + 100]
                }),
                overflow: 'hidden',
            }
        ]}>
            <View onLayout={handleFilterBarLayout}>
                <FilterBar
                    sortOption={sortOption}
                    onSortChange={handleSortChange}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                />
            </View>
        </Animated.View>

        <View style={styles.list}>   
            <FlatList
                data={sortedAndFilteredData}
                numColumns={2}
                renderItem={renderItem}
                contentContainerStyle={{ gap: 10, padding: 15}}
                columnWrapperStyle={{width:'100%',justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading && !isFetchingNextPage}
                        onRefresh={handleRefresh}
                        colors={[colors.primary]}
                    />
                }
                keyExtractor={(item) => item._id}
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                windowSize={5}
                initialNumToRender={10}
            />
        </View>
    </View>;
};
