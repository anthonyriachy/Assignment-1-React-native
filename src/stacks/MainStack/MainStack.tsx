import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../../pages/Login';

const Stack = createStackNavigator();

export const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
};
