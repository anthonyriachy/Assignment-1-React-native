import { View } from "react-native"
import { createStyles } from "./HomeFooter.style";
import { ItemsCardShimmer } from "../../molecules/ItemsCard/ItemCardLoading";
import { ItemsCardHorizontalShimmer } from "../ItemsCardHorizontal/ItemsCardHorizonralLoading";
import { FlatList } from "react-native";
import { ItemsSectionHeader } from "../../molecules/ItemsSectionHeader";

export const HomeFooterLoading = ({onNavigateToProducts}:{onNavigateToProducts:(title:string)=>void}) => {
    const styles = createStyles();
    return (
        <View style={[styles.container,{paddingHorizontal:16}]}>
            <View style={styles.headerContainer}>
                <ItemsSectionHeader title="Most Popular" onClick={() => onNavigateToProducts('Most Popular')} />
                <FlatList
                    data={[1, 2, 3, 4]}
                    renderItem={() => <ItemsCardShimmer />}
                    keyExtractor={(_, index) => `shimmer-${index}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
            <View style={styles.headerContainer}>
                <ItemsSectionHeader title="New Arrivals" onClick={() => onNavigateToProducts('New Arrivals')} />
                <FlatList
                    data={[1, 2, 3]}
                    renderItem={() => <ItemsCardHorizontalShimmer />}
                    keyExtractor={(_, index) => `shimmer-${index}`}
                    contentContainerStyle={styles.verticalContainer}
                />
            </View>
        </View>
    )
}