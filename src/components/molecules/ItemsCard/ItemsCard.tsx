import { ItemsCardImage } from '../../atoms/ItemsCardImage';
import { Pressable } from 'react-native';
import { styles } from './ItemsCard.style.ts';
import { ItemsCardInfo } from '../../atoms/ItemsCardInfo/ItemsCardInfo.tsx';
import { ItemsCardProps } from './ItemsCard.type';
import { useNavigation } from '@react-navigation/native';

export function ItemsCard({item}: ItemsCardProps) {
	const navigation = useNavigation<any>();
	return <Pressable onPress={() => {
		navigation.navigate('Details', {itemId:item._id});
	}} style={styles.container}>
		<ItemsCardImage image={item.images[0].url} onClick={() => {}} />
		<ItemsCardInfo title={item.title} price={item.price} />
	</Pressable>;
}

