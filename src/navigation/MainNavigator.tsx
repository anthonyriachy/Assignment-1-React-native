/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from '../stacks/AppStack/AppStack';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import { AuthStack } from '../stacks/AuthStack';
import { MainStackParamsList } from '../types/MainStackParamsList.ts';
import { MainNavigatorRoutes } from '../constants/MainNavigatorRoutes';
import useAuthStore from '../stores/authStore/authStore.ts';
import { UserService } from '../services/UserService/UserService';
import { Alert } from 'react-native';
import { handleError } from '../lib/handleError';
import { linking } from './linking.ts';
 
const Stack = createStackNavigator<MainStackParamsList>();

export default function MainNavigator() {
    const { hasStoreLoaded, accessToken, user, setUser } = useAuthStore();

    useEffect(() => {
        const initializeAuth = async () => {
            if (!hasStoreLoaded) return;

            try {
                if (accessToken && !user) {
                    const userResponse = await UserService.getUserProfile();
                    if (userResponse.success && userResponse.data?.user) {
                        setUser(userResponse.data.user);
                    } else {
                        useAuthStore.getState().clearTokens();
                    }
                }
            } catch (error) {
                Alert.alert('Error', handleError(error), [{ text: 'OK' }]);
                useAuthStore.getState().clearTokens();
            } finally {
                SplashScreen.hide();
            }
        };

        initializeAuth();
    }, [accessToken, user, hasStoreLoaded, setUser]);

    // keep splash screen
    if (!hasStoreLoaded) {
        return null;
    }

   
    const isAuthenticated = Boolean(accessToken);

    return (
        <NavigationContainer linking={linking}>
             <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (
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
