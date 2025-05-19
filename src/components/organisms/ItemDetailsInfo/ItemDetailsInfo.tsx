import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ItemDetailsInfoProps } from './ItemDetailsInfo.type';
import { createStyles } from './ItemDetailsInfo.style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomButton } from '../../atoms/CustomButton';
import Share from '../../../assets/icons/share.svg';
import { useTheme } from '../../../hooks/UseTheme';
import { useState } from 'react';
import ArrowRight from '../../../assets/icons/right-arrow-svgrepo-com.svg'
import ProfileIcon from '../../../assets/icons/SmallProfile.svg'
import DateIcon from '../../../assets/icons/DateIcon.svg';
import LocationIcon from '../../../assets/icons/LocationIcon.svg';
import { getRelativeTime } from '../../../lib/dateUtils';
// import MapView from 'react-native-maps';
export function ItemDetailsInfo({ item }: ItemDetailsInfoProps) {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const insets = useSafeAreaInsets();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.infoContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.price}>${item.price}</Text>
                    </View>
                    <View style={styles.moreDetails}>
                    {item.createdAt && <View style={styles.dateContainer}>
                            <DateIcon width={20} height={20} />
                            <Text style={styles.date} numberOfLines={1} ellipsizeMode="tail">{getRelativeTime(item.createdAt)}</Text>
                        </View>}
                        {item.location && <View style={styles.locationContainer}>
                            <LocationIcon width={20} height={20} />
                            <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">{item.location.name}</Text>
                        </View>}
                    </View> 
                    <TouchableOpacity style={styles.sellerContainer}>
                        <View style={styles.sellerInfoContainer}>
                            <View style={styles.sellerImage}>
                                <ProfileIcon width={30} height={30} />
                            </View>
                            <Text style={styles.sellerName}>{item.user.email}</Text>
                        </View>
                            <ArrowRight width={15} height={15} />
                    </TouchableOpacity>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionTitle}>Description</Text>
                        <Text 
                            style={styles.description} 
                            numberOfLines={isExpanded ? undefined : 4}
                        >
                            {item.description}
                        </Text>
                        {item.description.length > 200 && (
                            <Pressable onPress={toggleExpand} >
                                <Text style={[styles.description, { color: colors.primary,textAlign:'right' }]}>
                                    {isExpanded ? 'Show Less' : 'Show More'}
                                </Text>
                            </Pressable>
                        )}
                    </View>
                    <View style={styles.mapContainer}>
                        {/* <MapView */}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <CustomButton style={{ flex: 1 }} title="Add to Cart" loading={false} onPress={() => {}} />
                <Pressable style={styles.cardBtn}>
                    <Share width={35} height={35} />
                </Pressable>
            </View>
        </View>
    );
}
