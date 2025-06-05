import React from 'react';
import { ItemsCardImage } from '../../atoms/ItemsCardImage';
import { Pressable, View } from 'react-native';
import { styles } from './ItemsCard.style.ts';
import { ItemsCardInfo } from '../../atoms/ItemsCardInfo/ItemsCardInfo.tsx';
import { ItemsCardProps } from './ItemsCard.type';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { getImageUrl } from '../../../lib/imageUtils';
import { useCallback } from 'react';

export function ItemsCard({item, smaller}: ItemsCardProps) {
	const navigation = useNavigation<any>();

	const handleClick = useCallback(() => {
		navigation.dispatch(
			CommonActions.navigate({
				name: 'Details',
				params: { itemId: item._id },
			})
		);
	}, [item._id, navigation]);

	return (
		<Pressable onPress={handleClick} style={styles.parentContainer} testID="items-card-pressable">
			<View style={!smaller ? styles.container : styles.smallerContainer} testID="items-card-container">
				<ItemsCardImage image={getImageUrl(item.images[0].url)} testID="items-card-image" item={item} />
				<ItemsCardInfo 
					title={item.title} 
					price={item.price} 
					date={item.createdAt} 
					location={item.location} 
				/>
			</View>
		</Pressable>
	);
}

