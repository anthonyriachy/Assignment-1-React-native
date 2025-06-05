import React from "react"
import { FlatList, View } from "react-native"
import { ItemsCardShimmer } from "../../components/molecules/ItemsCard/ItemCardLoading"

export const ProductsLoading = () => {
    return (
        <FlatList
            data={[1, 2, 3, 4, 5, 6]}
            numColumns={2}
            renderItem={() => (
                <View style={{ marginBottom: 15 }}>
                    <ItemsCardShimmer />
                </View>
            )}
            contentContainerStyle={{ padding: 15 }}
            columnWrapperStyle={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 10
            }}
            showsVerticalScrollIndicator={false}
        />
    )
}