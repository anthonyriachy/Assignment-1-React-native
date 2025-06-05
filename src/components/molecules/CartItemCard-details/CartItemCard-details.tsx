import React from "react"
import { Pressable, View } from "react-native";
import { CustomText } from "../../atoms/CustomText/CustomText";
import { CartItemCardDetailsProps } from "./CartItemCard-details.type";
import { useTheme } from "../../../hooks/UseTheme";
import { createStyles } from "./CartItemCard-details.style";
import { QuantityButton } from "../QuantityButton";
export function CartItemCardDetails({item,quantity,onQuantityChange,onRemoveItem}:CartItemCardDetailsProps) {
    const {colors} = useTheme();
    const styles = createStyles(colors);
    return (
        <View style={styles.container}>
            <View style={styles.rowContainerTop}>
			    <CustomText style={styles.title}  numberOfLines={1} ellipsizeMode="tail">{item.title}</CustomText>
            </View>
            <View style={styles.rowContainer}>
                <CustomText style={styles.price}>${item.price}</CustomText>
                <QuantityButton quantity={quantity} onChange={onQuantityChange} />
            </View>
        </View>
    );
}