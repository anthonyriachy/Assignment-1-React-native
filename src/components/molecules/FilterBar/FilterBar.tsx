import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../hooks/UseTheme';
import { createStyles } from './FilterBar.style';
import ClearIcon from '../../../assets/icons/clear-filter-filled-svgrepo-com.svg'
import { InputField } from '../../atoms/InputField';
import { CustomText } from '../../atoms/CustomText/CustomText';

export type SortOption = 'price_asc' | 'price_desc' | 'newest' | 'oldest';
export type FilterOption = {
    priceRange?: {
        min?: number;
        max?: number;
    };
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
    const [priceInputs, setPriceInputs] = useState({
        min: filters.priceRange?.min?.toString() || '',
        max: filters.priceRange?.max?.toString() || '',
    });

    useEffect(() => {
        setPriceInputs({
            min: filters.priceRange?.min?.toString() || '',
            max: filters.priceRange?.max?.toString() || '',
        });
    }, [filters.priceRange]);

    const sortOptions: { label: string; value: SortOption }[] = [
        { label: 'Price: Low to High', value: 'price_asc' },
        { label: 'Price: High to Low', value: 'price_desc' },
        { label: 'Newest First', value: 'newest' },
        { label: 'Oldest First', value: 'oldest' },
    ];

    const hasActiveFilters = Object.keys(filters).length > 0;

    const handlePriceChange = (type: 'min' | 'max', value: string) => {
        setPriceInputs(prev => ({
            ...prev,
            [type]: value
        }));

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

        const numericValue = value.replace(/[^0-9.]/g, '');        

        if (!isNaN(parseFloat(numericValue))) {
            onFilterChange({
                ...filters,
                priceRange: {
                    ...filters.priceRange,
                    [type]: parseFloat(numericValue),
                },
            });
        }
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
                <View style={styles.sortContainer}>
                    <View style={styles.section}>
                        <CustomText style={styles.label}>Sort by:</CustomText>
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
                                    <CustomText
                                        style={[
                                            styles.sortButtonText,
                                            sortOption === option.value && styles.activeSortButtonText,
                                        ]}
                                    >
                                        {option.label}
                                    </CustomText>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.filterContainer}>
                            <CustomText style={styles.headerText}>Filter:</CustomText>
                            {hasActiveFilters && (
                                <TouchableOpacity
                                    style={styles.clearButton}
                                    onPress={handleClearFilters}
                                >
                                    <ClearIcon width={20} height={20}/>
                                    <CustomText style={styles.clearButtonText}>Clear Filters</CustomText>
                                </TouchableOpacity>
                            )}
                        </View>
                        <View style={styles.priceInputContainer}>
                            <View style={styles.priceInputWrapper}>
                                <CustomText style={styles.priceInputLabel}>Min Price</CustomText>
                                <InputField
                                    keyboardType="decimal-pad"
                                    value={priceInputs.min}
                                    onChangeText={(value) => handlePriceChange('min', value)}
                                    placeholder="0"
                                />
                            </View>
                            <CustomText style={styles.priceInputSeparator}>-</CustomText>
                            <View style={styles.priceInputWrapper}>
                                <CustomText style={styles.priceInputLabel}>Max Price</CustomText>
                                <InputField
                                    keyboardType="decimal-pad"
                                    value={priceInputs.max}
                                    onChangeText={(value) => handlePriceChange('max', value)}
                                    placeholder="∞"
                                />
                            </View>
                        </View>
                    </View>
                </View>
        </View>
    );
}; 