import { View } from 'react-native';
import { ItemDetailsImage } from '../../components/molecules/ItemDetailsImage';
import products  from '../../../Products.json';
import { ItemDTO } from '../../types/ItemDTO';
import { ItemDetailsInfo } from '../../components/organisms/ItemDetailsInfo';
import { NotFound } from '../NotFound';
import { createStyles } from './ItemDetails.style';
import { useTheme } from '../../hooks/UseTheme';

export function ItemDetails({route}:any) {
	const {itemId} = route.params;
	const item = products.data.find((x:ItemDTO) => x._id === itemId);
	const { colors } = useTheme();
	const styles = createStyles(colors);

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
