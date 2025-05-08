import { createStackNavigator } from "@react-navigation/stack";
import { Search } from "../../pages/Search";

const SearchStack = createStackNavigator();



const SearchStackScreen = () => (
  <SearchStack.Navigator screenOptions={{headerShown:false}}>
    <SearchStack.Screen name="SearchScreen" component={Search} />
  </SearchStack.Navigator>
);

export {SearchStackScreen};