/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../../pages/Home/Home';
import { Search } from '../../pages/Search';
import { BottomTabIcons } from '../../components/atoms/BottomTabIcons/BottomTabIcons';
import { ItemDetails } from '../../pages/ItemDetails/ItemDetails';
import { CustomHeader } from '../../components/molecules/CustomHeader';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="HomeScreen"
      component={Home}
      options={{
        headerShown: false,
      }}
    />
    <HomeStack.Screen
      name="Details"
      component={ItemDetails}
      options={{
        headerShown: false,
        animation: 'slide_from_bottom',
        presentation: 'modal',
        gestureEnabled: true,
        gestureDirection: 'vertical'
      }}
    />
  </HomeStack.Navigator>
);

const SearchStackScreen = () => (
  <SearchStack.Navigator screenOptions={{headerShown:false}}>
    <SearchStack.Screen name="SearchScreen" component={Search} />
  </SearchStack.Navigator>
);

const getIconName = (routeName: string) => {
  if (routeName === 'HomeTab') {return 'Home';}
  if (routeName === 'SearchTab') {return 'Search';}
  return 'Home';
};

function MainBottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <BottomTabIcons name={getIconName(route.name)} selected={focused} />
        ),
        headerShown: route.name === 'HomeTab',
        header: () => <CustomHeader/>,
        tabBarStyle: {
          display: 'flex'
        }
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStackScreen}
        options={{
          headerShown: true
        }}
      />
      <Tab.Screen 
        name="SearchTab" 
        component={SearchStackScreen}
        options={{
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}

export { MainBottomTabs };
