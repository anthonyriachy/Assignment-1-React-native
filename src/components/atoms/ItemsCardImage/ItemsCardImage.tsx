import { Pressable, View } from 'react-native';
import { ItemsCardImageProps } from './ItemsCardImage.type';
import HeartIcon from '../../../assets/icons/Heart.svg';
import { createStyles } from './ItemsCardImage.style';
import { useTheme } from '../../../hooks/UseTheme';
import { useState, useCallback } from 'react';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import React from 'react';

export const ItemsCardImage = React.memo(({image}: ItemsCardImageProps) => {
	const { colors } = useTheme();
	const styles = createStyles(colors);
	const [isLoading, setIsLoading] = useState(true);

	const handleLoadStart = useCallback(() => {
		setIsLoading(true);
	}, []);

	const handleLoadEnd = useCallback(() => {
		setIsLoading(false);
	}, []);

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
			<Pressable style={styles.heartIconContainer}>
				<HeartIcon width={20} height={20}/>
			</Pressable>
		</View>
	);
});

