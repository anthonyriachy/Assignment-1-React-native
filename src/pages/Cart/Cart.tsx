/* eslint-disable react-native/no-inline-styles */
import { FlatList, View, TouchableOpacity, Text, Animated } from "react-native";
import { useTheme } from "../../hooks/UseTheme";
import { CartItemCard } from "../../components/organisms/CartItemCard/CartItemCard";
import useCartStore from "../../stores/CartStore/CartStore";
import { createStyles } from "./Cart.style";
import { CartInfo } from "../../components/organisms/CartInfo";
import { CustomButton } from "../../components/atoms/CustomButton/CustomButton";
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useCallback, useRef, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { AppStackRoutes } from "../../constants/AppStackRoutes";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamsList } from "../../types/AppStackParamsList";
import { CartItemDTO } from "../../types/CartItemDTO";
import { ViewCartDetailsButton } from "../../components/atoms/ViewCartDetailsButton";

type CartScreenNavigationProp = StackNavigationProp<AppStackParamsList>;


export const CartScreen = () => {
    const {colors} = useTheme();
    const styles = createStyles(colors);

    const items = useCartStore(state => state.items);
    const total = useCartStore(state => state.getTotal());
    const itemCount = useCartStore(state => state.getItemCount());
    
    const deliveryCharges = 10;
    const navigation = useNavigation<CartScreenNavigationProp>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const buttonOpacity = useRef(new Animated.Value(1)).current;

    const snapPoints = ['70%'];

    const animateButton =(visible: boolean) => {
        Animated.timing(buttonOpacity, {
            toValue: visible ? 0 : 1,
            duration: 150,
            useNativeDriver: false,
        }).start();
    };

    const handlePresentModalPress = () => {
        bottomSheetModalRef.current?.present();
        setIsModalVisible(true);
        animateButton(true);
    };

    const handleSheetChanges =(index: number) => {
        if (index === -1) {
            setIsModalVisible(false);
            animateButton(false);
        }
    };

    const handleCheckout =() => {
        try {
            bottomSheetModalRef.current?.close();
            navigation.navigate(AppStackRoutes.Checkout);
        } catch (error) {
            console.error('Navigation error:', error);
        }
    };

    const renderItem = useCallback(({item}: {item: CartItemDTO}) => {
        return <CartItemCard item={item} />;
    }, []);

    const keyExtractor = (item: CartItemDTO) => item._id;

    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <FlatList
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    contentContainerStyle={{ gap: 15, paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                />
                
                <ViewCartDetailsButton 
                    onPress={handlePresentModalPress}
                    opacity={buttonOpacity} 
                    isModalVisible={isModalVisible}
                    styles={styles}
                />

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
                    <View style={styles.bottomSheetContent}>
                        <CartInfo 
                            numberOfItems={itemCount}
                            subTotal={total}
                            deliveryCharges={deliveryCharges}
                            total={total + deliveryCharges}
                        />
                        <CustomButton 
                            title="Proceed to Checkout" 
                            onPress={handleCheckout} 
                            style={styles.checkoutButton}
                        />
                    </View>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    );
};