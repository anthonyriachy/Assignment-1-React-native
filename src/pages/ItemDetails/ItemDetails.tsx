import { View } from 'react-native';
import { ItemDetailsImage } from '../../components/molecules/ItemDetailsImage';
import products  from '../../../Products.json';
import { ItemDTO } from '../../types/ItemDTO';
import { ItemDetailsInfo } from '../../components/organisms/ItemDetailsInfo';
import { NotFound } from '../NotFound';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { styles } from './ItemDetails.style';

export function ItemDetails({route}:any) {
	const navigation = useNavigation();
	const {itemId} = route.params;
	const item = products.data.find((x:ItemDTO) => x._id === itemId);

	useEffect(() => {
		const parent = navigation.getParent();
		if (parent) {
			parent.setOptions({
				tabBarStyle: { display: 'none' },
				headerShown: false
			});
		}
		return () => {
			if (parent) {
				parent.setOptions({
					tabBarStyle: { display: 'flex' },
					headerShown: true
				});
			}
		};
	}, [navigation]);

	if(!item){
		return <NotFound/>;
	}

	return (
		<View style={styles.container}>
			<ItemDetailsImage image={item?.images[0]?.url || ''}/>
			<ItemDetailsInfo item={item}/>
		</View>
	);
}
