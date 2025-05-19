import { ItemsSectionProps } from './ItemsSection.type';
import { ItemsSectionHeader } from '../../molecules/ItemsSectionHeader';
import { View, FlatList } from 'react-native';
import { ItemsCard } from '../../molecules/ItemsCard';
import { ItemsCardHorizontal } from '../ItemsCardHorizontal';
import { styles } from './ItemsSection.style';
import { ProductDTO } from '../../../types/ProductDTO';

const HorizontalList = ({ title, onClick, data }: { title: string, onClick?: () => void, data?: ProductDTO[] }) => (
	<View style={styles.container}>
		<ItemsSectionHeader title={title} onClick={onClick} />
		<FlatList
			data={data}
			renderItem={({item}) => <ItemsCard item={item} />}
			keyExtractor={(item) => item._id}
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.listContainer}
		/>
	</View>
);

const VerticalList = ({ title, onClick, data }: { title: string, onClick?: () => void, data?: ProductDTO[] }) => (
	<View style={styles.container}>
		<ItemsSectionHeader title={title} onClick={onClick} />
		<View style={styles.verticalListContainer}>
			{data?.map((item) => (
				<ItemsCardHorizontal key={item._id} item={item} />
			))}
		</View>
	</View>
);

export function ItemsSection({title, horizontal=false, onClick, data}: ItemsSectionProps ) {
	if(data?.length === 0) {
		return null
	}
	return horizontal ? <HorizontalList title={title} onClick={onClick} data={data} /> : <VerticalList title={title} onClick={onClick} data={data} />;
}

