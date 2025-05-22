import { View, FlatList, Dimensions, TouchableOpacity, Alert, Image } from "react-native";
import { ItemDetailsImageProps } from "./ItemDetailsImage.type.ts";
import { BackArrow } from "../../atoms/BackArrow/index.ts";
import { useState, useCallback, memo } from "react";
import { getImageUrl } from "../../../lib/imageUtils.ts";
import { useTheme } from "../../../hooks/UseTheme/UseTheme.tsx";
import { createStyles } from "./ItemDetailsImage.style.ts";
import { FullScreenImageViewer } from "../FullScreenImageViewer/FullScreenImageViewer";
import { downloadImage } from "../../../lib/imageDownloadUtils";

const { width } = Dimensions.get('window');

const ImageItem = memo(({ 
	imageUrl, 
	onPress, 
	onLongPress,
	styles
}: { 
	imageUrl: string; 
	onPress: () => void; 
	onLongPress: () => void;
	styles: any;
}) => (
	<TouchableOpacity 
		style={styles.imageContainer}
		onPress={onPress}
		onLongPress={onLongPress}
		activeOpacity={0.9}
		delayLongPress={500}
	>
		<Image
			source={{ uri: imageUrl }}
			style={styles.image}
			resizeMode="contain"
			fadeDuration={0}
		/>
	</TouchableOpacity>
));

export const ItemDetailsImage = memo(({ images }: ItemDetailsImageProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFullScreenVisible, setIsFullScreenVisible] = useState(false);
	const { colors } = useTheme();
	const styles = createStyles(colors);

	const handleImagePress = useCallback(() => {
		setIsFullScreenVisible(true);
	}, []);

	const handleLongPress = useCallback(async (imageUrl: string) => {
		try {
			await downloadImage(imageUrl, {
				onSuccess: () => {
					Alert.alert('Success', 'Image downloaded successfully!');
				},
				onError: (error) => {
					Alert.alert('Error', error.message || 'Failed to download image. Please try again.');
				}
			});
		} catch (error) {
			// Error is already handled in the options
		}
	}, []);

	const handleMomentumScrollEnd = useCallback((event: any) => {
		const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
		setCurrentIndex(newIndex);
	}, []);

	const renderItem = useCallback(({ item }: { item: { url: string } }) => (
		<ImageItem
			imageUrl={getImageUrl(item.url)}
			onPress={handleImagePress}
			onLongPress={() => handleLongPress(getImageUrl(item.url))}
			styles={styles}
		/>
	), [handleImagePress, handleLongPress, styles]);

	const keyExtractor = useCallback((_: any, index: number) => index.toString(), []);

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
				removeClippedSubviews={true}
				maxToRenderPerBatch={2}
				windowSize={2}
				initialNumToRender={1}
				updateCellsBatchingPeriod={50}
				scrollEventThrottle={16}
			/>
			<View style={styles.backButton}>
				<BackArrow />
			</View>
			<View style={styles.paginationContainer}>
				{images.map((_, index) => (
					<View
						key={index}
						style={[
							styles.paginationDot,
							index === currentIndex && styles.paginationDotActive
						]}
					/>
				))}
			</View>
			<FullScreenImageViewer
				visible={isFullScreenVisible}
				onClose={() => setIsFullScreenVisible(false)}
				imageUrl={getImageUrl(images[currentIndex].url)}
			/>
		</View>
	);
});   