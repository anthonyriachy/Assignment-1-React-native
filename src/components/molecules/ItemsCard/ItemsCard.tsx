import { ItemsCardImage } from '../../atoms/ItemsCardImage';
import { Pressable, View } from 'react-native';
import { styles } from './ItemsCard.style.ts';
import { ItemsCardInfo } from '../../atoms/ItemsCardInfo/ItemsCardInfo.tsx';
import { ItemsCardProps } from './ItemsCard.type';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

export function ItemsCard({item}: ItemsCardProps) {
	const navigation = useNavigation<any>();
	return <Pressable onPress={() => {
		navigation.dispatch(
			CommonActions.navigate({
				name: 'Details',
				params: { itemId: item._id }
			})
		);
	}} style={styles.parentContainer}>
		<View style={styles.container}>
			<ItemsCardImage image={item.images[0].url} onClick={() => {}} />
			<ItemsCardInfo title={item.title} price={item.price} />
		</View>
	</Pressable>;
}

