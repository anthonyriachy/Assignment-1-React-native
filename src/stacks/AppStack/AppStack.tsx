import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainBottomTabs } from '../MainBottomtabs/MainBottomTabs';
import { AuthStack } from '../AuthStack/AuthStack';
import { useAuthContext } from '../../hooks/useAuthContext/useAuthContext';
import { AppStackRoutes } from '../../constants/AppStackRoutes';
import { AuthStackRoutes } from '../../constants/AuthStackRoutes';
import { ItemDetails } from '../../pages/ItemDetails';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '../../hooks/UseTheme';
const Stack = createStackNavigator();

export const AppStack = () => {
    const { isAuthenticated, isLoading } = useAuthContext();
    const { colors } = useTheme();
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isAuthenticated ? AppStackRoutes.Main : AuthStackRoutes.AuthStack}>
            {!isAuthenticated ? (
                <Stack.Screen name={AuthStackRoutes.AuthStack} component={AuthStack} />
            ) : (
                <>
                    <Stack.Screen name={AppStackRoutes.Main} component={MainBottomTabs} />
                    <Stack.Screen 
                        name="Details" 
                        component={ItemDetails}
                        options={{
                            presentation: 'modal',
                            headerShown: false,
                        }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
};
