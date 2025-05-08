import { ItemsSectionProps } from './ItemsSection.type';
import { ItemsSectionHeader } from '../../molecules/ItemsSectionHeader';
import { View, FlatList } from 'react-native';
import { ItemsCard } from '../../molecules/ItemsCard';
import { ItemsCardHorizontal } from '../ItemsCardHorizontal';
import products from '../../../../Products.json';
import { styles } from './ItemsSection.style';

const HorizontalList = ({ title }: { title: string }) => (
	<View style={styles.container}>
		<ItemsSectionHeader title={title} onClick={() => {}} />
		<FlatList
			data={products.data}
			renderItem={({item}) => <ItemsCard item={item} />}
			keyExtractor={(item) => item._id}
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.listContainer}
		/>
	</View>
);

const VerticalList = ({ title }: { title: string }) => (
	<View style={styles.container}>
		<ItemsSectionHeader title={title} onClick={() => {}} />
		<View style={styles.verticalListContainer}>
			{products.data.map((item) => (
				<ItemsCardHorizontal key={item._id} item={item} />
			))}
		</View>
	</View>
);

export function ItemsSection({title, horizontal=false}: ItemsSectionProps ) {
	return horizontal ? <HorizontalList title={title} /> : <VerticalList title={title} />;
}

