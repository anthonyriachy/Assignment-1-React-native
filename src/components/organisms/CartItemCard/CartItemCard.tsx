import { Image, View } from "react-native";
import { CartItemCardDetails } from "../../molecules/CartItemCard-details/CartItemCard-details";
import { useTheme } from "../../../hooks/UseTheme";
import { createStyles } from "./CartItemCard.style";
import { CartItemCardProps } from "./CartItemCard.type";
import { getImageUrl } from "../../../lib/imageUtils";
import useCartStore from "../../../stores/CartStore/CartStore";

export function CartItemCard({item}:CartItemCardProps) {
    const {colors} = useTheme();
    const styles = createStyles(colors);
    const {updateQuantity, removeItem} = useCartStore();
    
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{uri:getImageUrl(item.image||"")}} style={styles.image} />
            </View>
            <CartItemCardDetails 
                item={item} 
                quantity={item.quantity} 
                onQuantityChange={(quantity) => updateQuantity(item.id, quantity)} 
                onRemoveItem={() => removeItem(item.id)} 
            />
        </View>
    );
}