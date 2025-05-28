import { Image, View, StyleSheet, Animated } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { CartItemCardDetails } from "../../molecules/CartItemCard-details/CartItemCard-details";
import { useTheme } from "../../../hooks/UseTheme";
import { createStyles } from "./CartItemCard.style";
import { CartItemCardProps } from "./CartItemCard.type";
import { getImageUrl } from "../../../lib/imageUtils";
import useCartStore from "../../../stores/CartStore/CartStore";
import { useRef } from "react";

const SwipeableDeleteButton = ({ dragX, onDelete }: { 
    dragX: Animated.AnimatedInterpolation<number>;
    onDelete: () => void;
}) => {
    const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    });

    return (
        <Animated.View style={[styles.deleteButton, { transform: [{ scale }] }]}>
            <Animated.Text style={styles.deleteText} onPress={onDelete}>Delete</Animated.Text>
        </Animated.View>
    );
};

export function CartItemCard({item}: CartItemCardProps) {
    const {colors} = useTheme();
    const styles = createStyles(colors);
    const {updateQuantity, removeItem} = useCartStore();
    const swipeableRef = useRef<Swipeable>(null);

    const renderRightActions = (
        _progress: Animated.AnimatedInterpolation<number>,
        dragX: Animated.AnimatedInterpolation<number>
    ) => {
        return (
            <SwipeableDeleteButton 
                dragX={dragX}
                onDelete={() => {
                    removeItem(item.id);
                    swipeableRef.current?.close();
                }} 
            />
        );
    };

    return (
        <Swipeable
            ref={swipeableRef}
            renderRightActions={renderRightActions}
            overshootRight={false}
            friction={2}
        >
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
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    deleteButton: {
        backgroundColor: '#FF3B30',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: '100%',
    },
    deleteText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});