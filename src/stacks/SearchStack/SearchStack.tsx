import { createStackNavigator } from "@react-navigation/stack";
import { Products } from "../../pages/Products";

const SearchStack = createStackNavigator();



const SearchStackScreen = () => (
  <SearchStack.Navigator screenOptions={{headerShown:false}}>
    <SearchStack.Screen name="SearchScreen" component={Products} />
  </SearchStack.Navigator>
);

export {SearchStackScreen};