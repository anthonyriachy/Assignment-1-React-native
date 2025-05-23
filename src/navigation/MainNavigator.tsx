/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from '../stacks/AppStack/AppStack';
import { ActivityIndicator } from 'react-native';
import { useTheme } from '../hooks/UseTheme';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthStack } from '../stacks/AuthStack';
import { MainStackParamsList } from '../types/MainStackParamsList.ts';
import { MainNavigatorRoutes } from '../constants/MainNavigatorRoutes';
import useAuthStore from '../stores/authStore/authStore.ts';
import { UserService } from '../services/UserService/UserService';
import { Alert } from 'react-native';
import { handleError } from '../lib/handleError';

const Stack = createStackNavigator<MainStackParamsList>();

export default function MainNavigator() {
    const { colors } = useTheme();
    const { hasStoreLoaded, accessToken, user, setUser } = useAuthStore();

    useEffect(() => {
        const fetchUserIfNeeded = async () => {
            if (accessToken && !user) {
                try {
                    const userResponse = await UserService.getUserProfile();
                    if (userResponse.success && userResponse.data?.user) {
                        setUser(userResponse.data.user);
                    }
                } catch (error) {
                    Alert.alert('Error', handleError(error), [{ text: 'OK' }]);
                }
            }
        };

        if (hasStoreLoaded) {
            fetchUserIfNeeded();
        }
    }, [accessToken, user, hasStoreLoaded, setUser]);

    if (!hasStoreLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {accessToken && user ? (
                    <Stack.Screen
                        name={MainNavigatorRoutes.AppStack}
                        component={AppStack}
                    />
                ) : (
                    <Stack.Screen
                        name={MainNavigatorRoutes.AuthStack}
                        component={AuthStack}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
