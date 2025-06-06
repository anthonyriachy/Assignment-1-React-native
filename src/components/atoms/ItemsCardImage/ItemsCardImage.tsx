import React from 'react';
import { Alert, Pressable, Share, View } from 'react-native';
import { ItemsCardImageProps } from './ItemsCardImage.type';
import ShareIcon from '../../../assets/icons/share.svg';
import { createStyles } from './ItemsCardImage.style';
import { useTheme } from '../../../hooks/UseTheme';
import { useState, useCallback } from 'react';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { useSuccessAlert } from '../../../hooks/useSuccessAlert';
import { makeEncurtadorLink } from '../../../lib/makeUrl';

export const ItemsCardImage = React.memo(({image, item}: ItemsCardImageProps) => {
	const { colors } = useTheme();
	const styles = createStyles(colors);
	const [isLoading, setIsLoading] = useState(true);
	const [isAddedToCart,setIsAddedToCart]=useState(false)
	const handleLoadStart = useCallback(() => {
		setIsLoading(true);
	}, []);

	const handleLoadEnd = useCallback(() => {
		setIsLoading(false);
	}, []);

	const handleShare = useCallback(async () => {
        try {
            const shareUrl = await makeEncurtadorLink(item._id);
            await Share.share({
                message: `Check out this ${item.title} on our app!\n\n${item.description}\n\nPrice: $${item.price}\n\n${shareUrl}`,
                url: shareUrl,
                title: item.title,
            });
        } catch (error) {
            console.error('Error sharing:', error);
            Alert.alert('Error', 'Unable to share the product. Please try again later.');
        }
    }, [item._id, item.title, item.description, item.price]);

	useSuccessAlert({
        success:isAddedToCart,
        message: 'Item added to cart successfully!',
    });

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				{isLoading && (
					<ShimmerPlaceholder
						style={styles.image}
						LinearGradient={LinearGradient}
					/>
				)}
				<FastImage 
					source={{uri: image, priority: FastImage.priority.normal}} 
					style={[styles.image, isLoading && { position: 'absolute', opacity: 0 }]} 
					onLoadStart={handleLoadStart}
					onLoadEnd={handleLoadEnd}
				/>
			</View>
			<Pressable style={styles.heartIconContainer} onPress={handleShare}>
				<ShareIcon width={20} height={20} />
			</Pressable>
		</View>
	);
});


 