import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { createStyles } from './Profile.style';
import { useTheme } from '../../hooks/UseTheme';
import { ProfileButton } from '../../components/atoms/Profilebutton';
import SmallProfile from '../../assets/icons/SmallProfile.svg';
import Settings from '../../assets/icons/Settings.svg';
import Help from '../../assets/icons/Help.svg';
import useAuthStore from '../../stores/authStore/authStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ProfileStackParamList } from '../../types/ProfileStackParamList';
import { getImageUrl } from '../../lib/imageUtils';
import { ProfileStackRoutes } from '../../constants/ProfileStackRoutes';

export const Profile = () => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const {logout, user} = useAuthStore();
    const navigation = useNavigation<NavigationProp<ProfileStackParamList>>();

    const profileImage = user?.profileImage?.url ? getImageUrl(user.profileImage.url) : require('../../assets/images/Profile.png');
    const fullname = user?.firstName + ' ' + user?.lastName;





    const handleLogout = () => {
        logout();
    };

    return (
        <View style={styles.container}>
            <ScrollView>
            <View>
                <View style={styles.profileContainer}>
                    <Image
                        source={typeof profileImage === 'string' ? { uri: profileImage } : profileImage}
                        style={styles.profileImage}
                    />
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{fullname}</Text>
                    <Text style={styles.email}>{user?.email}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <ProfileButton title="Edit Profile" icon={SmallProfile} onPress={() => navigation.navigate(ProfileStackRoutes.EditProfile)} />
                    <ProfileButton title="Settings" icon={Settings} />
                    <ProfileButton title="Help" icon={Help} />
                </View>
            </View>
            </ScrollView>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};
