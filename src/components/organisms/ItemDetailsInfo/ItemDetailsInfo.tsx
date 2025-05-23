/* eslint-disable react-native/no-inline-styles */
import { Pressable, View, Linking, Alert, RefreshControl } from 'react-native';
import { ItemDetailsInfoProps } from './ItemDetailsInfo.type';
import { createStyles } from './ItemDetailsInfo.style';
import { CustomButton } from '../../atoms/CustomButton';
import Share from '../../../assets/icons/share.svg';
import { useTheme } from '../../../hooks/UseTheme';
import { useMemo, useState } from 'react';
import ArrowRight from '../../../assets/icons/right-arrow-svgrepo-com.svg';
import ProfileIcon from '../../../assets/icons/SmallProfile.svg';
import DateIcon from '../../../assets/icons/DateIcon.svg';
import LocationIcon from '../../../assets/icons/LocationIcon.svg';
import { getRelativeTime } from '../../../lib/dateUtils';
import Animated from 'react-native-reanimated';
import { MapComponent } from '../../molecules/MapsComponent';
import useAuthStore from '../../../stores/authStore/authStore';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { AppStackRoutes } from '../../../constants/AppStackRoutes';
import { useDeleteProduct } from '../../../hooks/queries/products/useDeleteProduct/useDeleteProduct';
import { useSuccessAlert } from '../../../hooks/useSuccessAlert';
import { useErrorAlert } from '../../../hooks/useErrorAlert';
import { CustomText } from '../../atoms/CustomText/CustomText';

export function ItemDetailsInfo({ item, onScroll, refreshing, onRefresh }: ItemDetailsInfoProps) {
    const { colors } = useTheme();
    const styles = useMemo(() => createStyles(colors), [colors]);
    const { user } = useAuthStore();
    const [isExpanded, setIsExpanded] = useState(false);
    const { mutate: deleteProduct, error: deleteError, isPending: isDeletePending, isSuccess: isDeleteSuccess } = useDeleteProduct();
    const navigation = useNavigation<any>();

    const isOwner = user?.id === item.user._id;

    useErrorAlert({
        error: deleteError || null,
    });

    useSuccessAlert({
        success: isDeleteSuccess,
        message: 'Product deleted successfully!',
        onDismiss: () => {
            navigation.goBack();
        },
    });

    const handleShowMore = () => {
        setIsExpanded(!isExpanded);
    };

    const handleEdit = () => {
        navigation.dispatch(
            CommonActions.navigate({
                name: AppStackRoutes.SellModal,
                params: { productId: item._id },
            })
        );
    };

    const handleDelete = () => {
        Alert.alert(
            'Delete Item',
            'Are you sure you want to delete this item? This action cannot be undone.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        deleteProduct(item._id);
                    },
                },
            ]
        );
    };

    const handleContactSeller = async () => {
        try {
            const emailUrl = `mailto:${item.user.email}?subject=Inquiry about ${item.title}`;

            const canOpen = await Linking.canOpenURL(emailUrl);

            if (canOpen) {
                const opened = await Linking.openURL(emailUrl);

                if (!opened) {
                    throw new Error('Failed to open email client');
                }
            } else {
                Alert.alert(
                    'Email Client Not Available',
                    `Please contact the seller at: ${item.user.email}`,
                    [
                        {
                            text: 'OK',
                            style: 'cancel',
                        },
                    ]
                );
            }
        } catch (error) {
            console.error('Error opening email client:', error);
            Alert.alert(
                'Error',
                'Unable to open email client. Please try again later.'
            );
        }
    };

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                onScroll={onScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing || false}
                        onRefresh={onRefresh}
                        colors={[colors.primary]}
                        tintColor={colors.primary}
                    />
                }
            >
                <View style={styles.infoContainer}>
                    <View style={styles.titleContainer}>
                        <CustomText style={styles.title}>{item.title}</CustomText>
                        <CustomText style={styles.price}>${item.price}</CustomText>
                    </View>
                    <View style={styles.moreDetails}>
                    {item.createdAt && <View style={styles.dateContainer}>
                            <DateIcon width={20} height={20} />
                            <CustomText style={styles.date} numberOfLines={1} ellipsizeMode="tail">{getRelativeTime(item.createdAt)}</CustomText>
                        </View>}
                        {item.location && <View style={styles.locationContainer}>
                            <LocationIcon width={20} height={20} />
                            <CustomText style={styles.location} numberOfLines={1} ellipsizeMode="tail">{item.location.name}</CustomText>
                        </View>}
                    </View>
                    <View style={styles.sellerContainer}>
                        <View style={styles.sellerInfoContainer}>
                            <View style={styles.sellerImage}>
                                <ProfileIcon width={30} height={30} />
                            </View>
                            <View style={styles.sellerNameContainer}>
                                 <CustomText style={styles.sellerName}>{item.user.email}</CustomText>
                                 <Pressable onPress={handleContactSeller} style={styles.sellerContactContainer}>
                                    <CustomText style={styles.sellerContact}>Contact Seller</CustomText>
                                 </Pressable>
                            </View>
                        </View>
                            <ArrowRight width={15} height={15} />
                    </View>
                    <View style={styles.descriptionContainer}>
                        <CustomText style={styles.descriptionTitle}>Description</CustomText>
                        <CustomText
                            style={styles.description}
                            numberOfLines={isExpanded ? undefined : 4}
                        >
                            {item.description}
                        </CustomText>
                        {item.description.length > 200 && (
                            <Pressable onPress={handleShowMore} >
                                <CustomText style={styles.description}>
                                    {isExpanded ? 'Show Less' : 'Show More'}
                                </CustomText>
                            </Pressable>
                        )}
                    </View>
                    <View style={styles.mapContainer}>
                            <MapComponent
                                locationName={item.location?.name}
                                latitude={item.location?.latitude}
                                longitude={item.location?.longitude}
                                setValue={() => {}}
                                isView={true}
                            />
                    </View>
                </View>
            </Animated.ScrollView>
            {!isOwner && <View style={styles.buttonContainer}>
                <CustomButton style={{ flex: 1,height:'100%' }} title="Add to Cart" loading={false}  />
                <Pressable style={styles.cardBtn}>
                    <Share width={30} height={30} />
                </Pressable>
            </View>}

            {isOwner && <View style={styles.buttonContainer}>
                <CustomButton
                    style={{ flex: 1, backgroundColor: colors.error }}
                    title="Delete"
                    loading={isDeletePending}
                    onPress={handleDelete}
                    disabled={isDeletePending}
                />
                <CustomButton
                    style={{ flex: 1 }}
                    title="Edit"
                    loading={false}
                    onPress={handleEdit}
                />
            </View>}
        </View>
    );
}
