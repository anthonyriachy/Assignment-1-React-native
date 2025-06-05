import React from 'react';
import { Pressable, View } from 'react-native';
import { ItemsCardImageProps } from './ItemsCardImage.type';
import CartIcon from '../../../assets/icons/shopping-cart-outline-svgrepo-com (2).svg';
import { createStyles } from './ItemsCardImage.style';
import { useTheme } from '../../../hooks/UseTheme';
import { useState, useCallback } from 'react';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import useCartStore from '../../../stores/CartStore/CartStore';
import { useSuccessAlert } from '../../../hooks/useSuccessAlert';

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

	const handleAddToCart = useCallback(() => {
		if ('_id' in item && 'images' in item) {
			const cartItem = {
				_id: item._id,
				title: item.title,
				price: item.price,
				image: item.images[0].url
			};
			useCartStore.getState().addItem(cartItem);
			setIsAddedToCart(true)
			console.log('item added to cart', cartItem)
		} else {
			useCartStore.getState().addItem(item);
		}
	}, [item]);

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
			<Pressable style={styles.heartIconContainer} onPress={handleAddToCart}>
				<CartIcon width={20} height={20} />
			</Pressable>
		</View>
	);
});

