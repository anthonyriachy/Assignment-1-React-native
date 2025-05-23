import { FlatList, View } from "react-native";
import { ItemsSectionHeader } from "../../molecules/ItemsSectionHeader";
import { ItemsCard } from "../../molecules/ItemsCard";
import { styles } from "./HorizontalList.style";
import { ProductDTO } from "../../../types/ProductDTO";
import { Empty } from "../../atoms/Empty/Empty";

export const HorizontalList = ({ title, onClick, data, isLoading }: { title: string, onClick?: () => void, data?: ProductDTO[], isLoading?: boolean }) => (
	<View>
        <View style={styles.headerContainer}>
            <ItemsSectionHeader title={title} onClick={onClick} />
        </View>
		<FlatList
			data={data}
			ListEmptyComponent={!isLoading ? <Empty value="No products found" /> : null}
			renderItem={({item}) => <ItemsCard item={item} />}
			keyExtractor={(item) => item._id}
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.listContainer}
		/>
	</View>
);
