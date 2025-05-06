
import ScreenWrapper from '../../components/templates/ScreenWrapper/ScreenWrapper';
import { Login } from '../../pages/Login';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackRoutes } from '../../constants/AuthStackRoutes';
import { Signup } from '../../pages/Signup';
const Stack = createStackNavigator();

export const AuthStack = () => {
    return (
        <ScreenWrapper>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={AuthStackRoutes.Login} component={Login} />
                    <Stack.Screen name={AuthStackRoutes.Signup} component={Signup} />
            </Stack.Navigator>
        </ScreenWrapper>
    );
};