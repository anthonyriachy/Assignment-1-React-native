import { createStackNavigator } from '@react-navigation/stack';
import { Profile } from '../../pages/Profile/Profile';
 import { ProfileStackRoutes } from '../../constants/ProfileStackRoutes';
const Stack = createStackNavigator();

export const ProfileStackScreen = () => {
    return (    
        <Stack.Navigator 
        screenOptions={{
            headerShown: false
        }}>   
            <Stack.Screen name={ProfileStackRoutes.Profile} component={Profile} />
        </Stack.Navigator>
    );
};