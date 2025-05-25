/* eslint-disable react-native/no-inline-styles */
import { FlatList } from "react-native";
import { View } from "react-native";
import { useTheme } from "../../hooks/UseTheme";
import { CartItemCard } from "../../components/organisms/CartItemCard/CartItemCard";
import useCartStore from "../../stores/CartStore/CartStore";
import { createStyles } from "./Cart.style";
 
export const CartScreen = () => {
    const {colors} = useTheme();
    const styles = createStyles(colors);
    const { items } = useCartStore();

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={({item})=>{
                    return <CartItemCard item={item} />
                }}
                contentContainerStyle={{ gap: 15 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};