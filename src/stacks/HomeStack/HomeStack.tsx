import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../../pages/Home";

const HomeStack = createStackNavigator();

export const HomeStackScreen = () => (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );        