/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { AppStackRoutes } from '../../constants/AppStackRoutes';
import { ItemDetails } from '../../pages/ItemDetails';
import { AppStackParamsList } from '../../types/AppStackParamsList';
import { Products } from '../../pages/Products';
import { MainBottomTabs } from '../../navigation/MainBottomtabs';
import { Sell } from '../../pages/Sell';
import { EditProfile } from '../../pages/EditProfile';
import { StackHeader } from '../../components/molecules/StackHeader';

const Stack = createStackNavigator<AppStackParamsList>();

const SellHeader = React.memo(({ route }: { route: RouteProp<any> }) => (
    <StackHeader title={route.params?.productId ? 'Edit Item' : 'Sell Item'} />
));

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
                name={AppStackRoutes.SellModal}
                component={Sell}
                options={({ route }) => ({
                    presentation: 'modal',
                    headerShown: true,
                    header: () => <SellHeader route={route} />,
                })}
            />
            <Stack.Screen
                name={AppStackRoutes.EditProfile}
                component={EditProfile}
                options={{
                    presentation: 'modal',
                    headerShown: true,
                    header: () => <StackHeader title="Edit Profile" />,
                }}
            />
        </Stack.Navigator>
    );
};
