import { View, FlatList, Dimensions, TouchableOpacity, Alert, Image } from 'react-native';
import { ItemDetailsImageProps } from './ItemDetailsImage.type.ts';
import { useState, useCallback, useEffect } from 'react';
import { getImageUrl } from '../../../lib/imageUtils.ts';
import { useTheme } from '../../../hooks/UseTheme/UseTheme.tsx';
import { createStyles } from './ItemDetailsImage.style.ts';
import { FullScreenImageViewer } from '../FullScreenImageViewer/FullScreenImageViewer';
import { downloadImage } from '../../../lib/imageDownloadUtils';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const ImageItem = ({
	imageUrl,
	onPress,
	onLongPress,
	styles,
}: {
	imageUrl: string;
	onPress: () => void;
	onLongPress: () => void;
	styles: any;
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const { colors } = useTheme();

	return (
		<TouchableOpacity
			style={styles.imageContainer}
			onPress={onPress}
			onLongPress={onLongPress}
			activeOpacity={0.9}
			delayLongPress={500}
		>
			{isLoading && (
				<ShimmerPlaceholder
					style={styles.image}
					LinearGradient={LinearGradient}
					shimmerColors={[colors.background, colors.border, colors.background]}
				/>
			)}
			<Image
				source={{ uri: imageUrl }}
				style={[styles.image, isLoading && { position: 'absolute', opacity: 0 }]}
				resizeMode="contain"
				fadeDuration={0}
				onLoadStart={() => setIsLoading(true)}
				onLoadEnd={() => setIsLoading(false)}
			/>
		</TouchableOpacity>
	);
};

export const ItemDetailsImage = ({ images }: ItemDetailsImageProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFullScreenVisible, setIsFullScreenVisible] = useState(false);
	const { colors } = useTheme();
	const styles = createStyles(colors);

	// Reset currentIndex if images array changes
	useEffect(() => {
		if (images.length === 0) {
			setCurrentIndex(0);
		} else if (currentIndex >= images.length) {
			setCurrentIndex(images.length - 1);
		}
	}, [images, currentIndex]);

	const handleImagePress = useCallback(() => {
		if (images.length > 0) {
			setIsFullScreenVisible(true);
		}
	}, [images]);

	const handleLongPress = useCallback(async (imageUrl: string) => {
		try {
			await downloadImage(imageUrl, {
				onSuccess: () => {
					Alert.alert('Success', 'Image downloaded successfully!');
				},
				onError: (error) => {
					Alert.alert('Error', error.message || 'Failed to download image. Please try again.');
				},
			});
		} catch (error) {
		}
	}, []);

	const handleMomentumScrollEnd = useCallback((event: any) => {
		const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
		if (newIndex >= 0 && newIndex < images.length) {
			setCurrentIndex(newIndex);
		}
	}, [images.length]);

	const renderItem = useCallback(({ item }: { item: { url: string } }) => (
		<ImageItem
			imageUrl={getImageUrl(item.url)}
			onPress={handleImagePress}
			onLongPress={() => handleLongPress(getImageUrl(item.url))}
			styles={styles}
		/>
	), [handleImagePress, handleLongPress, styles]);

	const keyExtractor = useCallback((_: any, index: number) => index.toString(), []);

	if (!images || images.length === 0) {
		return null;
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={images}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onMomentumScrollEnd={handleMomentumScrollEnd}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
			/>
			{images[currentIndex] && (
				<FullScreenImageViewer
					visible={isFullScreenVisible}
					imageUrl={getImageUrl(images[currentIndex].url)}
					onClose={() => setIsFullScreenVisible(false)}
				/>
			)}
		</View>
	);
};
