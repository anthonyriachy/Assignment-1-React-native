import { createStackNavigator } from '@react-navigation/stack';
import { Profile } from '../../pages/Profile/Profile';
 import { ProfileStackRoutes } from '../../constants/ProfileStackRoutes';
import { EditProfile } from '../../pages/EditProfile';
const Stack = createStackNavigator();

export const ProfileStackScreen = () => {
    return (    
        <Stack.Navigator 
        screenOptions={{
            headerShown: false
        }}>   
            <Stack.Screen name={ProfileStackRoutes.Profile} component={Profile} />
            <Stack.Screen name={ProfileStackRoutes.EditProfile} component={EditProfile} />
        </Stack.Navigator>
    );
};