/* eslint-disable react-native/no-inline-styles */
import { FlatList, View, TouchableOpacity, Text, Animated } from "react-native";
import { useTheme } from "../../hooks/UseTheme";
import { CartItemCard } from "../../components/organisms/CartItemCard/CartItemCard";
import useCartStore from "../../stores/CartStore/CartStore";
import { createStyles } from "./Cart.style";
import { CartInfo } from "../../components/organisms/CartInfo";
import { CustomButton } from "../../components/atoms/CustomButton/CustomButton";
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { AppStackRoutes } from "../../constants/AppStackRoutes";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamsList } from "../../types/AppStackParamsList";

type CartScreenNavigationProp = StackNavigationProp<AppStackParamsList>;

export const CartScreen = () => {
    const {colors} = useTheme();
    const styles = createStyles(colors);
    const { items } = useCartStore();
    const {getTotal, getItemCount} = useCartStore();
    const total = getTotal();
    const itemCount = getItemCount();
    const deliveryCharges = 10;
    const navigation = useNavigation<CartScreenNavigationProp>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const buttonOpacity = useRef(new Animated.Value(1)).current;

    const snapPoints = useMemo(() => ['50%'], []);

    const animateButton = useCallback((visible: boolean) => {
        Animated.timing(buttonOpacity, {
            toValue: visible ? 0 : 1,
            duration: 150,
            useNativeDriver: true,
        }).start();
    }, [buttonOpacity]);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
        setIsModalVisible(true);
        animateButton(true);
    }, [animateButton]);

    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            setIsModalVisible(false);
            animateButton(false);
        }
    }, [animateButton]);

    const handleCheckout = useCallback(() => {
        try {
            bottomSheetModalRef.current?.close();
            navigation.navigate(AppStackRoutes.Checkout);
        } catch (error) {
            console.error('Navigation error:', error);
        }
    }, [navigation]);

    const cartInfoProps = useMemo(() => ({
        numberOfItems: itemCount,
        subTotal: total,
        deliveryCharges: deliveryCharges,
        total: total + deliveryCharges
    }), [itemCount, total, deliveryCharges]);

    const bottomSheetContent = useMemo(() => (
        <View style={styles.bottomSheetContent}>
            <CartInfo {...cartInfoProps} />
            <CustomButton 
                title="Proceed to Checkout" 
                onPress={handleCheckout} 
                style={styles.checkoutButton}
            />
        </View>
    ), [styles.bottomSheetContent, cartInfoProps, handleCheckout, styles.checkoutButton]);

    const memoizedBottomSheet = useMemo(() => (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backgroundStyle={styles.bottomSheetBackground}
            enablePanDownToClose={true}
            enableDismissOnClose={true}
            enableDynamicSizing={false}
            enableOverDrag={true}
            enableHandlePanningGesture={true}
            animationConfigs={{
                duration: 200,
            }}
        >
            {bottomSheetContent}
        </BottomSheetModal>
    ), [
        bottomSheetModalRef,
        snapPoints,
        handleSheetChanges,
        styles.bottomSheetBackground,
        bottomSheetContent
    ]);

    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <FlatList
                    data={items}
                    renderItem={({item})=>{
                        return <CartItemCard item={item} />
                    }}
                    contentContainerStyle={{ gap: 15, paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                />
                
                <Animated.View 
                    style={[
                        styles.bottomContainer,
                        { opacity: buttonOpacity }
                    ]}
                    pointerEvents={isModalVisible ? 'none' : 'auto'}
                >
                    <TouchableOpacity 
                        style={styles.expandButton} 
                        onPress={handlePresentModalPress}
                    >
                        <Text style={styles.expandButtonText}>View Cart Details</Text>
                    </TouchableOpacity>
                </Animated.View>

                {memoizedBottomSheet}
            </View>
        </BottomSheetModalProvider>
    );
};