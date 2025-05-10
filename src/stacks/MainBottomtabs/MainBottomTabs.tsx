/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabIcons } from '../../components/atoms/BottomTabIcons/BottomTabIcons';
import { CustomHeader } from '../../components/molecules/CustomHeader';
import { useTheme } from '../../hooks/UseTheme';
import { HomeStackScreen } from '../HomeStack/HomeStack';
import { SearchStackScreen } from '../SearchStack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { AppStackRoutes } from '../../constants/AppStackRoutes';
import { Profile } from '../../pages/Profile/Profile';

const Tab = createBottomTabNavigator();

const getIconName = (routeName: string) => {
  if (routeName === 'HomeTab') {return 'Home';}
  if (routeName === 'SearchTab') {return 'Search';}
  if (routeName === 'Profile') {return 'Profile';}
  return 'Home';
};

function MainBottomTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;
        const isDetailsScreen = routeName === 'Details';

        return {
          tabBarShowLabel:false,
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
        name="HomeTab"
        component={HomeStackScreen}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchStackScreen}
        options={{
          headerShown: false,
        }}
      />
        <Tab.Screen name={AppStackRoutes.Profile} component={Profile} />
    </Tab.Navigator>
  );
}

export { MainBottomTabs };
