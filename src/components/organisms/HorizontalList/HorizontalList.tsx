import { FlatList, View } from "react-native";
import { ItemsSectionHeader } from "../../molecules/ItemsSectionHeader";
import { ItemsCard } from "../../molecules/ItemsCard";
import { styles } from "./HorizontalList.style";
import { ProductDTO } from "../../../types/ProductDTO";

export const HorizontalList = ({ title, onClick, data }: { title: string, onClick?: () => void, data?: ProductDTO[] }) => (
	<View>
        <View style={styles.headerContainer}>
            <ItemsSectionHeader title={title} onClick={onClick} />
        </View>
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
