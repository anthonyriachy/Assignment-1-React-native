import { VerticalListProps } from "../ItemsSection/ItemsSection.type";
import { ActivityIndicator, Text } from "react-native";
import { FlatList } from "react-native";
import { View } from "react-native";
import { ItemsSectionHeader } from "../../molecules/ItemsSectionHeader";
import { ItemsCardHorizontal } from "../ItemsCardHorizontal";
import { styles } from "./VeritcalList.style.ts";


const NoMoreProducts = () => (
	<View style={styles.noMoreProductsContainer}>
		<Text style={styles.noMoreProductsText}>No More Products</Text>
	</View>
);


export const VerticalList = ({ title, onClick, data = [], onLoadMore, isLoading, hasMore }: VerticalListProps) => (
	<View style={styles.container}>
		<ItemsSectionHeader title={title} onClick={onClick} />
		<FlatList
			data={data}
			renderItem={({item}) => (
				<View style={styles.itemContainer}>
					<ItemsCardHorizontal item={item} />
				</View>
			)}
			keyExtractor={(item) => item._id}
			onEndReached={hasMore ? onLoadMore : undefined}
			onEndReachedThreshold={0.5}
			ListFooterComponent={() => {
				if (isLoading) {
					return (
						<View style={styles.loaderContainer}>
							<ActivityIndicator size="small" color="#0000ff" />
						</View>
					);
				}
				if (!hasMore && data.length > 0) {
					return <NoMoreProducts />;
				}
				return null;
			}}
			contentContainerStyle={styles.verticalContainer}
		/>
	</View>
);