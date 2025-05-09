import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { createStyles } from './Profile.style';
import { useTheme } from '../../hooks/UseTheme';
import { useAuthContext } from '../../hooks/useAuthContext';
import { ProfileButton } from '../../components/atoms/Profilebutton';
import SmallProfile from '../../assets/icons/SmallProfile.svg';
import Settings from '../../assets/icons/Settings.svg';
import Help from '../../assets/icons/Help.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const Profile = () => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const { user,setIsAuthenticated,setUser } = useAuthContext();

    const handleLogout = async() => {
        await AsyncStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
    }
    return (
       
        <View style={styles.container}>
            <ScrollView>
            <View>
                <Image source={require('../../assets/images/Profile.png')} style={styles.profileImage} />
                <Text style={styles.email}>{user?.email}</Text>
                <ProfileButton title="Edit Profile" icon={SmallProfile} />
                <ProfileButton title="Settings" icon={Settings} />
                <ProfileButton title="Help" icon={Help} />
            </View>
            </ScrollView>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
       
    );
};
