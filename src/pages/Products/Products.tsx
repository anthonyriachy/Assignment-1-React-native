/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { FlatList, Text, View, ActivityIndicator, RefreshControl, TouchableOpacity, Modal } from 'react-native';
import { createStyles } from './Products.style';
import { useTheme } from '../../hooks/UseTheme';
import { BackArrow } from '../../components/atoms/BackArrow';
import { ItemsCard } from '../../components/molecules/ItemsCard';
import { SearchBar } from '../../components/atoms/SearchBar';
import { FilterBar, SortOption, FilterOption } from '../../components/molecules/FilterBar/FilterBar';
import { useState, useRef, useCallback, useMemo } from 'react';
import { ProductDTO } from '../../types/ProductDTO';
import { useGetProducts } from '../../hooks/queries/products/useGetProducts';
import { useSearchProducts } from '../../hooks/queries/products/useSearchProducts';
import { useErrorAlert } from '../../hooks/useErrorAlert';
import FilterIcon from '../../assets/icons/filters-svgrepo-com.svg';
import CloseIcon from '../../assets/icons/close-circle-svgrepo-com.svg';
import { ProductsLoading } from './Products.loading.tsx';
import { Empty } from '../../components/atoms/Empty/Empty.tsx';


const MemoizedItemsCard = React.memo(ItemsCard);

const ITEM_HEIGHT = 250;
const WINDOW_SIZE = 5;
const MAX_TO_RENDER_PER_BATCH = 5;
const UPDATE_INTERVAL = 16;


export const Products = ({route}: {route: any}) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const params = route?.params;
    const [searchInput, setSearchInput] = useState(params?.search || '');
    const [sortOption, setSortOption] = useState<SortOption>('newest');
    const [filters, setFilters] = useState<FilterOption>({});
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    const {
        data: initalData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
        isFetching,
        error,
        refetch,
    } = useGetProducts();

    const {
        data: searchResults,
        isLoading: isSearching,
        error: searchError,
    } = useSearchProducts(searchInput);

    useErrorAlert({error: error || searchError, onRetry: refetch, onDismiss: () => {}});

    const combinedInitialData = useMemo(() =>
        initalData?.pages.reduce<ProductDTO[]>((acc, page) => {
            if (page.data) {
                return [...acc, ...page.data];
            }
            return acc;
        }, []) ?? []
    , [initalData?.pages]);

    const handleLoadMore = () => {
        if (hasNextPage && !isFetchingNextPage && !searchInput) {
            fetchNextPage();
        }
    };

    const handleRefresh = () => {
        refetch();
    };

    const toggleFilter = () => {
        setIsFilterVisible(!isFilterVisible);
    };

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

        return sortedData;
    }, [sortOption, filters]);

    const displayData = searchInput ? searchResults : combinedInitialData;
    const sortedAndFilteredData = sortAndFilterData(displayData || []);
    const isLoading = searchInput ? isSearching : isPending;

    const getItemLayout = useCallback((data: any, index: number) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    }), []);

    const renderFooter = () => {
        if (isFetchingNextPage || isSearching) {
            return (
                <View style={styles.footerLoader}>
                    <ActivityIndicator size="small" color={colors.primary} />
                </View>
            );
        }

        if (!hasNextPage && !searchInput && sortedAndFilteredData.length > 0) {
            return (
                <Empty value="No more products" />
            );
        }

        return null;
    };

    const renderItem = useCallback(({item}: {item: ProductDTO}) => (
        <MemoizedItemsCard item={item} smaller={true} />
    ), []);

    const renderShimmerItem = () => (
        <ProductsLoading key={`shimmer-${Math.random()}`} />
    );

    const keyExtractor = (item: any, index: number) => item?._id || `shimmer-${index}`;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                
                {params && <View style={styles.backButton}>
                    <BackArrow />
                </View>}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{params?.title || 'Products'}</Text>
                </View>
                <TouchableOpacity onPress={toggleFilter} style={styles.filterButton}>
                    <FilterIcon width={24} height={24}/>
                </TouchableOpacity>
            </View>

            <View>
                <View style={styles.searchContainer}>
                    <SearchBar
                        search={searchInput}
                        setSearch={setSearchInput}
                    />
                </View>
                {searchInput &&
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
            </View>

            <View style={styles.list}>
                <FlatList
                    ref={flatListRef}
                    data={isLoading ? Array(7).fill(null) : sortedAndFilteredData}
                    numColumns={2}
                    renderItem={isLoading ? renderShimmerItem : renderItem}
                    contentContainerStyle={{ gap: 15, padding: 15}}
                    columnWrapperStyle={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: 10,
                    }}
                    showsVerticalScrollIndicator={false}

                    scrollEventThrottle={UPDATE_INTERVAL}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                    ListEmptyComponent={!isLoading ? <Empty value="No products found" /> : null}
                    refreshControl={
                        <RefreshControl
                            refreshing={isFetching && !isPending && !isFetchingNextPage}
                            onRefresh={handleRefresh}
                            colors={[colors.primary]}
                        />
                    }
                    keyExtractor={keyExtractor}
                    removeClippedSubviews={true}
                    getItemLayout={getItemLayout}
                    windowSize={WINDOW_SIZE}
                    maxToRenderPerBatch={MAX_TO_RENDER_PER_BATCH}
                    initialNumToRender={10}
                    updateCellsBatchingPeriod={UPDATE_INTERVAL}
                    maintainVisibleContentPosition={{
                        minIndexForVisible: 0,
                        autoscrollToTopThreshold: 10,
                    }}
                    extraData={[sortOption, filters]}
                />
            </View>

            <Modal
                visible={isFilterVisible}
                transparent={true}
                animationType="fade"
                statusBarTranslucent
                onRequestClose={toggleFilter}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={toggleFilter}
                >
                    <View style={styles.filterPanel}>
                        <View style={styles.filterHeader}>
                            <Text style={styles.filterTitle}>Filter & Sort</Text>
                            <TouchableOpacity onPress={toggleFilter} >
                                <CloseIcon width={25} height={25}/>
                            </TouchableOpacity>
                        </View>
                        <FilterBar
                            sortOption={sortOption}
                            onSortChange={setSortOption}
                            filters={filters}
                            onFilterChange={setFilters}
                            onClearFilters={() => setFilters({})}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};
