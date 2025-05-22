import { Image, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { createStyles } from './Profile.style';
import { useTheme } from '../../hooks/UseTheme';
import { ProfileButton } from '../../components/atoms/Profilebutton';
import SmallProfile from '../../assets/icons/SmallProfile.svg';
import Settings from '../../assets/icons/Settings.svg';
import Help from '../../assets/icons/Help.svg';
import useAuthStore from '../../stores/authStore/authStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ProfileStackRoutes } from '../../constants/ProfileStackRoutes';
import { ProfileStackParamList } from '../../types/ProfileStackParamList';
import { getImageUrl } from '../../lib/imageUtils';
import { useState, useEffect } from 'react';

export const Profile = () => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const {logout, user} = useAuthStore();
    const navigation = useNavigation<NavigationProp<ProfileStackParamList>>();
    const [imageLoading, setImageLoading] = useState(true);

    const profileImage = user?.profileImage?.url ? getImageUrl(user.profileImage.url) : require('../../assets/images/Profile.png');
    const fullname = user?.firstName + ' ' + user?.lastName;
    console.log('Profile Image URL:', profileImage);
    console.log('User Profile Image:', user?.profileImage?.url);

    // Force loading to end after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setImageLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleLogout = () => {
        logout();
    };
 
    return (
        <View style={styles.container}>
            <ScrollView>
            <View>
                {imageLoading && typeof profileImage === 'string' && (
                    <View style={[styles.profileImage, { justifyContent: 'center', alignItems: 'center' }]}>
                        <ActivityIndicator size="large" color={colors.primary} />
                    </View>
                )}
                <Image 
                    source={typeof profileImage === 'string' ? { uri: profileImage } : profileImage}
                    style={[styles.profileImage, imageLoading && typeof profileImage === 'string' && { display: 'none' }]}
                    onLoad={() => {
                        console.log('Image loaded successfully');
                        setImageLoading(false);
                    }}
                    
                />
                <Text style={styles.email}>{fullname}</Text>
                <ProfileButton title="Edit Profile" icon={SmallProfile} onPress={() => navigation.navigate(ProfileStackRoutes.EditProfile)} />
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
