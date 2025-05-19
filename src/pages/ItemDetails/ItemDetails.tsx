import { View } from 'react-native';
import { ItemDetailsImage } from '../../components/molecules/ItemDetailsImage';
import { ItemDetailsInfo } from '../../components/organisms/ItemDetailsInfo';
import { NotFound } from '../NotFound';
import { createStyles } from './ItemDetails.style';
import { useTheme } from '../../hooks/UseTheme';
import { useErrorAlert } from '../../hooks/useErrorAlert';
import { Loading } from '../../components/atoms/Loading';
import { useGetProductById } from '../../hooks/queries/products/useGetProductById';
import { getImageUrl } from '../../lib/imageUtils';

export function ItemDetails({route}:any) {
	const {itemId} = route.params;
	const {data:item,isLoading,error,refetch} = useGetProductById(itemId);

	const { colors } = useTheme();
	const styles = createStyles(colors);
	console.log('error::',error)
	useErrorAlert({
		error:error||null,
		onRetry:refetch
	})	
	if(isLoading){
		return <Loading/>
	}

	if(!item){
		return <NotFound/>;
	}
	
	return (
		<View style={styles.container}>
			<ItemDetailsImage image={getImageUrl(item.images[0]?.url)}/>
			<ItemDetailsInfo item={item}/>
		</View>
	);
}
