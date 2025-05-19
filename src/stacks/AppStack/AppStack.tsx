import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AppStackRoutes } from '../../constants/AppStackRoutes';
import { ItemDetails } from '../../pages/ItemDetails';
import { AppStackParamsList } from '../../types/AppStackParamsList';
import { Products } from '../../pages/Products';
import { MainBottomTabs } from '../../navigation/MainBottomtabs';
import { Sell } from '../../pages/Sell';

const Stack = createStackNavigator<AppStackParamsList>();

export const AppStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={AppStackRoutes.BottomTabs} component={MainBottomTabs} />
            <Stack.Screen 
                name={AppStackRoutes.Details} 
                component={ItemDetails}
                options={{
                    presentation: 'modal',
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name={AppStackRoutes.Products} 
                component={Products}
                options={{
                    presentation: 'modal',
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="SellModal" 
                component={Sell}
                options={{
                    presentation: 'modal',
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};
