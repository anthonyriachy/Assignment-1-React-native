import React, { memo, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

import { CartItemCardDetails } from '../../molecules/CartItemCard-details/CartItemCard-details';
import { useTheme } from '../../../hooks/UseTheme';
import { createStyles } from './CartItemCard.style';
import { CartItemCardProps } from './CartItemCard.type';
import { getImageUrl } from '../../../lib/imageUtils';
import useCartStore from '../../../stores/CartStore/CartStore';

const OPEN_POSITION = -120;
const FULL_DELETE_THRESHOLD = -200;

export const CartItemCard = memo(({ item }: CartItemCardProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const quantity = useCartStore((state) => {
    const found = state.items.find((i) => i._id === item._id);
    return found?.quantity || 1;
  });
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const translateX = useSharedValue(0);
  const dragContext = useSharedValue(0);
  const isDragging = useSharedValue(false);

  // 1) Build the pan gesture with a context model:
  const panGesture = Gesture.Pan()
    .onStart(() => {
      isDragging.value = true;
      // store the “starting” translateX in dragContext
      dragContext.value = translateX.value;
    })
    .onUpdate((event) => {
      // Now we add the delta (event.translationX) to the stored start offset
      // Clamp so translateX never goes positive:
      translateX.value = Math.min(dragContext.value + event.translationX, 0);
    })
    .onEnd(() => {
      isDragging.value = false;

      // 2) If you’ve dragged past FULL_DELETE_THRESHOLD, delete:
      if (translateX.value <= FULL_DELETE_THRESHOLD) {
        translateX.value = withTiming(-500, { duration: 200 }, () => {
          runOnJS(removeItem)(item._id);
        });
        return;
      }

      // 3) Else if you’re beyond OPEN_POSITION, lock there:
      if (translateX.value <= OPEN_POSITION) {
        translateX.value = withTiming(OPEN_POSITION, { duration: 200 });
        return;
      }

      // 4) Otherwise, snap fully closed:
      translateX.value = withTiming(0, { duration: 200 });
    });

  // 5) Animated style that moves the card horizontally
  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const underlayStyle = useAnimatedStyle(() => {
    const absX = -translateX.value; 

    return {
      opacity: absX > 0 ? 1 : 0,
      width: absX,
      transform: [{ translateX: 0 }],
    };
  });

  const handleTapDelete = useCallback(() => {
    if (!isDragging.value) {
      removeItem(item._id);
    }
  }, [item._id, removeItem, isDragging]);

  const handleQuantityChange = useCallback(
    (newQty: number) => {
      updateQuantity(item._id, newQty);
    },
    [item._id, updateQuantity]
  );

  return (
    <View style={styles.wrapper}>
      {/* delete button */}
      <Animated.View style={[styles.deleteButtonContainer, underlayStyle]}>
        <TouchableOpacity
          style={[styles.deleteButtonTouch, { width: '100%' }]}
          onPress={handleTapDelete}
          activeOpacity={0.7}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* card that slides */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.container, rowStyle]}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: getImageUrl(item.image || '') }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <CartItemCardDetails
            item={item}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={handleTapDelete}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
});
