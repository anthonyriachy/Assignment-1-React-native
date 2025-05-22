import React from 'react';
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
const Stack = createStackNavigator<MainStackParamsList>();

export default function MainNavigator() {
    
    const { colors } = useTheme();

    const { hasStoreLoaded,accessToken } = useAuthStore();
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
                {accessToken ? (
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
