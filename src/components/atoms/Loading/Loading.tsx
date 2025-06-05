import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '../../../hooks/UseTheme';

export function Loading() {
    const { colors } = useTheme();
    return (
        <View>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
}