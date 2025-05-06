/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../../pages/Home/Home';
import { Search } from '../../pages/Search';
import { BottomTabIcons } from '../../components/atoms/BottomTabIcons/BottomTabIcons';
import { CustomHeader } from '../../components/molecules/CustomHeader';
import ScreenWrapper from '../../components/templates/ScreenWrapper/ScreenWrapper';

const Tab = createBottomTabNavigator();

//movew to filessss
const HomeStack = createStackNavigator();
//movew to filessss
const SearchStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
  </HomeStack.Navigator>
);//movew to filessss
//move to files

const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
  </SearchStack.Navigator>
);

const getIconName = (routeName: string) => {
  if (routeName === 'Home') {return 'Home';}
  if (routeName === 'Search') {return 'Search';}
  return 'Home';
};

function MainBottomTabs() {
  return (
    <ScreenWrapper>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <BottomTabIcons name={getIconName(route.name)} selected={focused} />
          ),
          header: ({ navigation, route }) => (
            <CustomHeader
              title={route.name}
              showBackButton={navigation.canGoBack()}
            />
          ),
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Search" component={SearchStackScreen} />
      </Tab.Navigator>
    </ScreenWrapper>
  );
}

export { MainBottomTabs };
