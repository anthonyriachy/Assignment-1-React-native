import React, { memo, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Animated as RNAnimated,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';

import { CartItemCardDetails } from '../../molecules/CartItemCard-details/CartItemCard-details';
import { useTheme } from '../../../hooks/UseTheme';
import { createStyles } from './CartItemCard.style';
import { CartItemCardProps } from './CartItemCard.type';
import { getImageUrl } from '../../../lib/imageUtils';
import useCartStore from '../../../stores/CartStore/CartStore';

// ─── 1) Constants ───────────────────────────────────────────────────────────────
//
//    SWIPE_THRESHOLD: how far (negative) before auto-delete.
//    PEAK_THRESHOLD: when to start fading in the red button.
//
const SWIPE_THRESHOLD = -100; // px
const PEAK_THRESHOLD = -20;   // px

export const CartItemCard = memo(({ item }: CartItemCardProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  // Grab quantity and store actions
  const quantity = useCartStore((state) => {
    const found = state.items.find((i) => i._id === item._id);
    return found?.quantity || 1;
  });
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  // 1) SharedValue for horizontal translation
  const translateX = useSharedValue(0);
  // 2) A flag so we only auto-delete once per gesture
  const hasDeleted = useSharedValue(false);

  // ─── 2) Gesture Handler ───────────────────────────────────────────────────────
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: number }
  >({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      hasDeleted.value = false;
    },
    onActive: (event, ctx) => {
      // Only swipe left; clamp at SWIPE_THRESHOLD
      translateX.value = Math.max(ctx.startX + event.translationX, SWIPE_THRESHOLD);
    },
    onEnd: () => {
      if (translateX.value <= SWIPE_THRESHOLD && !hasDeleted.value) {
        // Fully swiped past threshold: auto-delete
        hasDeleted.value = true;
        // Animate off-screen (optional), then remove from store
        translateX.value = withTiming(-300, { duration: 200 }, () => {
          runOnJS(removeItem)(item._id);
        });
      } else {
        // Snap back
        translateX.value = withTiming(0, { duration: 200 });
      }
    },
  });

  // ─── 3) Animated style for the row (so it slides left/right) ─────────────────
  const rowStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  // ─── 4) Animated style for the “red Delete” button underneath ────────────────
  const underlayStyle = useAnimatedStyle(() => {
    // As translateX goes from 0 → SWIPE_THRESHOLD (0 → -100),
    //   • opacity interpolates [0 → 1]  
    //   • translateX of button goes [100 → 0]
    const opacity = interpolate(
      translateX.value,
      [0, PEAK_THRESHOLD, SWIPE_THRESHOLD],
      [0, 0.3, 1],
      'clamp'
    );
    const tx = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [100, 0],
      'clamp'
    );
    return {
      opacity,
      transform: [{ translateX: tx }],
    };
  });

  // ─── 5) handle tap on the red “Delete” button ─────────────────────────────────
  const handleTapDelete = useCallback(() => {
    removeItem(item._id);
  }, [item._id, removeItem]);

  // ─── 6) handle quantity change passed down to the details component ───────────
  const handleQuantityChange = useCallback(
    (newQty: number) => {
      updateQuantity(item._id, newQty);
    },
    [item._id, updateQuantity]
  );

  // ─── 7) UI ───────────────────────────────────────────────────────────────────
  return (
    <View style={localStyles.wrapper}>
      {/* A) The red “Delete” underlay */}
      <Animated.View style={[localStyles.deleteButtonContainer, underlayStyle]}>
        <TouchableOpacity style={localStyles.deleteButtonTouch} onPress={handleTapDelete}>
          <Text style={localStyles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* B) The actual card content, panned by gestures */}
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.container, rowStyle]}>
          {/* Image portion */}
          <View style={localStyles.imageContainer}>
            <Image
              source={{ uri: getImageUrl(item.image || '') }}
              style={localStyles.image}
              resizeMode="cover"
            />
          </View>

          {/* Details portion (quantity controls, title, etc.) */}
          <CartItemCardDetails
            item={item}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={handleTapDelete} 
            // NOTE: this “onRemoveItem” may get called if the user presses 
            //       the small “×” inside CartItemCardDetails, if that exists.
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
});

// ─── 8) Local Styles for the swipeable wrapper ─────────────────────────────────
const localStyles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 100,
    marginVertical: 8,
    // If you want a little spacing around each card, adjust marginVertical
  },
  deleteButtonContainer: {
    backgroundColor: '#FF3B30', // “destructive” red
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 100, // matches SWIPE_THRESHOLD magnitude
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonTouch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  deleteText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  imageContainer: {
    width: 120,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
