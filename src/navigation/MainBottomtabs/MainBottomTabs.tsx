/* eslint-disable react/no-unstable-nested-components */
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabIcons } from '../../components/atoms/BottomTabIcons/BottomTabIcons';
import { CustomHeader } from '../../components/molecules/CustomHeader';
import { useTheme } from '../../hooks/UseTheme';
import { Text, View } from 'react-native';
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';

import { Profile } from '../../pages/Profile/Profile';
import { BottomTabParamsList } from '../../types/BottomTabParamsList';
import { BottomTabRoutes } from '../../constants/BottomTabRoutes';
import { HomeStackScreen } from '../../stacks/HomeStack/HomeStack';
import { SearchStackScreen } from '../../stacks/SearchStack';

const Tab = createBottomTabNavigator<BottomTabParamsList>();

const getIconName = (routeName: string) => {
  if (routeName === 'Home') {return 'Home';}
  if (routeName === 'Search') {return 'Search';}
  if (routeName === 'Sell') {return 'Sell';}
  if (routeName === 'Profile') {return 'Profile';}
  if (routeName === 'Cart') {return 'Cart';}
  return 'Home';
};

function MainBottomTabs() {
  const { colors } = useTheme();
  const navigation = useNavigation<BottomTabNavigationProp<BottomTabParamsList>>();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;
        const isDetailsScreen = routeName === 'Details';

        return {
          tabBarLabel: ({ focused }) => (
            <Text style={{
              color: focused ? colors.primary : colors.lightText,
              fontSize: 10,
              fontWeight: focused ? '700' : '400',
            }}>
              {route.name}
            </Text>
          ),
          
          tabBarIcon: ({ focused }) => (
            <BottomTabIcons name={getIconName(route.name)} selected={focused} />
          ),
          headerShown: !isDetailsScreen,
          header: () => <CustomHeader/>,
          tabBarStyle: {
            display: isDetailsScreen ? 'none' : 'flex',
            backgroundColor: colors.background,
            borderTopColor: colors.background,
            height: 60,
            paddingTop: 15,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.text,
        };
      }}
    >
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
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate(BottomTabRoutes.SellModal);
          },
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ marginTop: -60 }}>
              <BottomTabIcons 
                name={getIconName('Sell')} 
                selected={focused}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name={BottomTabRoutes.Cart} 
        component={Profile} 
      />
      <Tab.Screen 
        name={BottomTabRoutes.Profile} 
        component={Profile} 
      />
    </Tab.Navigator>
  );
}

export { MainBottomTabs };
