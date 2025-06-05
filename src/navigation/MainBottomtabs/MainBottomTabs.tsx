/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabIcons } from '../../components/atoms/BottomTabIcons/BottomTabIcons.tsx';
import { CustomHeader } from '../../components/molecules/CustomHeader/index.ts';
import { useTheme } from '../../hooks/UseTheme/index.ts';
import { Text, TouchableOpacity, View } from 'react-native';
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import { memo, useCallback, useMemo } from 'react';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import { BottomTabParamsList } from '../../types/BottomTabParamsList.ts';
import { BottomTabRoutes } from '../../constants/BottomTabRoutes.ts';
import { HomeStackScreen } from '../../stacks/HomeStack/HomeStack.tsx';
import { SearchStackScreen } from '../../stacks/SearchStack/index.ts';
import { ProfileStackScreen } from '../../stacks/ProfileStack/ProfileStack.tsx';

const Tab = createBottomTabNavigator<BottomTabParamsList>();

const getIconName = (routeName: string) => {
  if (routeName === 'Home') {return 'Home';}
  if (routeName === 'Search') {return 'Search';}
  if (routeName === 'Sell') {return 'Sell';}
  if (routeName === 'ProfileStack') {return 'Profile';}
  if (routeName === 'Cart') {return 'Cart';}
  return 'Home';
};

// Memoized TabBarLabel component
const TabBarLabel = memo(({ focused, routeName, colors }: { focused: boolean; routeName: string; colors: any }) => (
  <Text style={{
    color: focused ? colors.primary : colors.lightText,
    fontSize: 11,
    fontWeight: focused ? '700' : '400',
    fontFamily:'Poppins-Regular',
  }}>
    {routeName === 'ProfileStack' ? 'Profile' : routeName}
  </Text>
));

// Memoized TabBarIcon component
const TabBarIcon = memo(({ focused, routeName }: { focused: boolean; routeName: string }) => (
  <BottomTabIcons name={getIconName(routeName)} selected={focused} />
));

function MainBottomTabs() {
  const { colors } = useTheme();
  const navigation = useNavigation<BottomTabNavigationProp<BottomTabParamsList>>();

  const screenOptions = useMemo(() => ({ route }: { route: any }): BottomTabNavigationOptions => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;
    const isDetailsScreen = routeName === 'Details';

    return {
      tabBarLabel: ({ focused }: { focused: boolean }) => (
        <TabBarLabel focused={focused} routeName={route.name} colors={colors} />
      ),
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <TabBarIcon focused={focused} routeName={route.name} />
      ),
      headerShown: !isDetailsScreen,
      header: () => <CustomHeader/>,
      tabBarStyle: {
        display: isDetailsScreen ? 'none' as const : 'flex' as const,
        backgroundColor: colors.background,
        borderTopColor: colors.background,
        height: 60,
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.text,
    };
  }, [colors]);

  const handleSellPress = useCallback((e: any) => {
    e.preventDefault();
    navigation.navigate(BottomTabRoutes.SellModal);
  }, [navigation]);

  const handleCartPress = useCallback((e: any) => {
    e.preventDefault();
    navigation.navigate(BottomTabRoutes.Cart);
  }, [navigation]);

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={BottomTabRoutes.Home}
        component={HomeStackScreen}
      />
      <Tab.Screen
        name={BottomTabRoutes.Search}
        component={SearchStackScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={BottomTabRoutes.Sell}
        component={View}
        listeners={{
          tabPress: handleSellPress,
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity style={{ marginTop: -40 }} onPress={() => navigation.navigate(BottomTabRoutes.SellModal)}>
              <BottomTabIcons
                name={getIconName('Sell')}
                selected={focused}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name={BottomTabRoutes.Cart}
        component={View}
        listeners={{
          tabPress: handleCartPress,
        }}
      />
      <Tab.Screen
        name={BottomTabRoutes.ProfileStack}
        component={ProfileStackScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export { MainBottomTabs };
