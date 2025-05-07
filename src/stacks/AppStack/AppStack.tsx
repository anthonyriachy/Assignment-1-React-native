import { createStackNavigator } from '@react-navigation/stack';
import { MainBottomTabs } from '../MainBottomtabs/MainBottomTabs';
import { AuthStack } from '../AuthStack/AuthStack';
import { useAuthContext } from '../../hooks/useAuthContext/useAuthContext';
import { AppStackRoutes } from '../../constants/AppStackRoutes';
import { AuthStackRoutes } from '../../constants/AuthStackRoutes';
const Stack = createStackNavigator();

export const AppStack = () => {
    const authContext = useAuthContext();
    const isAuthenticated = authContext?.isAuthenticated;
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isAuthenticated ? (
                <Stack.Screen name={AuthStackRoutes.AuthStack} component={AuthStack} />
            ) : (
                <Stack.Screen name={AppStackRoutes.Main} component={MainBottomTabs} />
            )}
        </Stack.Navigator>
    );
};
