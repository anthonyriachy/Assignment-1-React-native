import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, LayoutChangeEvent } from 'react-native';
import { useTheme } from '../../../hooks/UseTheme';
import { createStyles } from './FilterBar.style';
import ArrowIcon from '../../../assets/icons/up-arrow-svgrepo-com.svg'
import ClearIcon from '../../../assets/icons/clear-filter-filled-svgrepo-com.svg'
import { InputField } from '../../atoms/InputField';
import { LocationAutocomplete } from '../LocationAutocomplete';
export type SortOption = 'price_asc' | 'price_desc' | 'newest' | 'oldest' | 'score';
export type FilterOption = {
    priceRange?: {
        min?: number;
        max?: number;
    };
    location?: string;
};

type FilterBarProps = {
    sortOption: SortOption;
    onSortChange: (option: SortOption) => void;
    filters: FilterOption;
    onFilterChange: (filters: FilterOption) => void;
    onClearFilters: () => void;
};

export const FilterBar: React.FC<FilterBarProps> = ({
    sortOption,
    onSortChange,
    filters,
    onFilterChange,
    onClearFilters,
}) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const [isExpanded, setIsExpanded] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const [minHeight, setMinHeight] = useState(0);
    const animatedHeight = useRef(new Animated.Value(0)).current;
    const animatedRotation = useRef(new Animated.Value(0)).current;
    const [priceInputs, setPriceInputs] = useState({
        min: '',
        max: '',
    });
    const contentRef = useRef<View>(null);

    const sortOptions: { label: string; value: SortOption }[] = [
        { label: 'Price: Low to High', value: 'price_asc' },
        { label: 'Price: High to Low', value: 'price_desc' },
        { label: 'Newest First', value: 'newest' },
        { label: 'Oldest First', value: 'oldest' },
        { label: 'Highest Score', value: 'score' },
    ];

    const hasActiveFilters = Object.keys(filters).length > 0;

    const measureContent = useCallback(() => {
        if (contentRef.current) {
            contentRef.current.measure((x, y, width, height) => {
                setContentHeight(height);
                setMinHeight(Math.max(height, 320));
            });
        }
    }, []);

    useEffect(() => {
        measureContent();
    }, [measureContent, filters, priceInputs]);

    const onLayout = useCallback((event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setContentHeight(height);
        setMinHeight(Math.max(height, 320));
    }, []);

    const toggleExpand = () => {
        const toValue = isExpanded ? 0 : 1;
        Animated.parallel([
            Animated.timing(animatedHeight, {
                toValue,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(animatedRotation, {
                toValue,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start();
        setIsExpanded(!isExpanded);
    };

    const rotateAnimation = animatedRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    const animatedContentHeight = animatedHeight.interpolate({
        inputRange: [0, 1],
        outputRange: [0, minHeight],
    });

    const handlePriceChange = (type: 'min' | 'max', value: string) => {
        // Update local state first
        setPriceInputs(prev => ({
            ...prev,
            [type]: value
        }));

        // Only update filter if value is valid
        if (value === '') {
            onFilterChange({
                ...filters,
                priceRange: {
                    ...filters.priceRange,
                    [type]: undefined,
                },
            });
            return;
        }

        // Allow only numbers and one decimal point
        const numericValue = value.replace(/[^0-9.]/g, '');
        const parts = numericValue.split('.');

        // If there are multiple decimal points, keep only the first one
        const formattedValue = parts.length > 2
            ? `${parts[0]}.${parts.slice(1).join('')}`
            : numericValue;

        // Only update if the value is a valid number
        if (!isNaN(parseFloat(formattedValue))) {
            onFilterChange({
                ...filters,
                priceRange: {
                    ...filters.priceRange,
                    [type]: parseFloat(formattedValue),
                },
            });
        }
    };

    const handleLocationChange = (value: string) => {
        onFilterChange({
            ...filters,
            location: value,
        });
    };

    const handleClearFilters = () => {
        onClearFilters();
        setPriceInputs({
            min: '',
            max: '',
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.header}
                onPress={toggleExpand}
                activeOpacity={0.7}
            >
                <Text style={styles.headerText}>Filter & Sort</Text>
                <View style={styles.toggleButton}>
                    <Animated.View style={{ transform: [{ rotate: rotateAnimation }] }}>
                        <ArrowIcon width={15} height={15} />
                    </Animated.View>
                </View>
            </TouchableOpacity>

            <Animated.View style={[styles.contentContainer, { height: animatedContentHeight }]}>
                <View
                    ref={contentRef}
                    style={[styles.sortContainer, { minHeight: minHeight }]}
                    onLayout={onLayout}
                >
                    <View style={styles.section}>
                        <Text style={styles.label}>Sort by:</Text>
                        <View style={styles.sortOptions}>
                            {sortOptions.map((option) => (
                                <TouchableOpacity
                                    key={option.value}
                                    style={[
                                        styles.sortButton,
                                        sortOption === option.value && styles.activeSortButton,
                                    ]}
                                    onPress={() => onSortChange(option.value)}
                                >
                                    <Text
                                        style={[
                                            styles.sortButtonText,
                                            sortOption === option.value && styles.activeSortButtonText,
                                        ]}
                                    >
                                        {option.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.filterContainer}>
                            <Text style={styles.headerText}>Filter:</Text>
                            {hasActiveFilters && (
                                <TouchableOpacity
                                    style={styles.clearButton}
                                    onPress={handleClearFilters}
                                >
                                    <ClearIcon width={20} height={20}/>
                                    <Text style={styles.clearButtonText}>Clear Filters</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        <View style={styles.priceInputContainer}>
                            <View style={styles.priceInputWrapper}>
                                <Text style={styles.priceInputLabel}>Min Price</Text>
                                <InputField
                                    keyboardType="decimal-pad"
                                    value={priceInputs.min}
                                    onChangeText={(value) => handlePriceChange('min', value)}
                                    placeholder="0"
                                />
                            </View>
                            <Text style={styles.priceInputSeparator}>-</Text>
                            <View style={styles.priceInputWrapper}>
                                <Text style={styles.priceInputLabel}>Max Price</Text>
                                <InputField
                                    keyboardType="decimal-pad"
                                    value={priceInputs.max}
                                    onChangeText={(value) => handlePriceChange('max', value)}
                                    placeholder="∞"
                                />
                            </View>
                        </View>
                        <View style={styles.priceInputWrapper}>
                            <Text style={styles.priceInputLabel}>Location:</Text>
                            <LocationAutocomplete
                                value={filters.location || ''}
                                setValue={handleLocationChange}
                            />
                        </View>

                    </View>
                </View>
            </Animated.View>
        </View>
    );
}; 