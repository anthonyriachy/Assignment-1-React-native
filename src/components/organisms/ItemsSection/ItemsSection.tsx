import { ItemsSectionProps } from './ItemsSection.type';
import { ItemsSectionHeader } from '../../molecules/ItemsSectionHeader';
import { View, FlatList, StyleSheet } from 'react-native';
import { ItemsCard } from '../../molecules/ItemsCard';
import  products  from '../../../../Products.json';

export function ItemsSection({title}: ItemsSectionProps ) {

	return (
		<View style={styles.container}>
			<ItemsSectionHeader title={title} onClick={() => {}} />
			<FlatList
				data={products.data}
				renderItem={({item}) => <ItemsCard item={item} />}
				keyExtractor={(item) => item._id}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.listContent}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap:10
	},
	listContent: {
		gap: 12,
	},
});
