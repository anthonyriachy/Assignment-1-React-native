import { View, ScrollView } from "react-native";
import { useTheme } from "../../hooks/UseTheme";
import { createStyles } from "./Checkout.style";
import { CartInfo } from "../../components/organisms/CartInfo";
import useCartStore from "../../stores/CartStore/CartStore";
import { CustomButton } from "../../components/atoms/CustomButton/CustomButton";
import { CustomText } from "../../components/atoms/CustomText/CustomText";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LocationAutocomplete } from "../../components/molecules/LocationAutocomplete";
import { MapComponent } from "../../components/molecules/MapsComponent";
import { InputFieldSell } from "../../components/atoms/InputFieldSell/InputFieldSell";
import { AppStackRoutes } from "../../constants/AppStackRoutes";
import { NavigationProp,    useNavigation } from "@react-navigation/native";
import { AppStackParamsList } from "../../types/AppStackParamsList";

const CheckoutSchema = z.object({
    location: z.object({
        name: z.string().min(1, "Shipping address is required"),
        latitude: z.number(),
        longitude: z.number()
    }),
    apartment: z.string().optional(),
    instructions: z.string().optional(),
    contactPhone: z.string().min(1, "Contact phone is required")
});

type CheckoutFormData = z.infer<typeof CheckoutSchema>;

export const Checkout = () => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const { getTotal, getItemCount } = useCartStore();
    const total = getTotal();
    const itemCount = getItemCount();
    const deliveryCharges = 10;
    const navigation = useNavigation<NavigationProp<AppStackParamsList>>();
    const { setValue, watch, formState: { errors } } = useForm<CheckoutFormData>({
        resolver: zodResolver(CheckoutSchema),
        defaultValues: {
            location: {
                name: "",
                latitude: 0,
                longitude: 0
            },
            apartment: "",
            instructions: "",
            contactPhone: ""
        }
    });

    const locationName = watch('location.name');
    const latitude = watch('location.latitude');
    const longitude = watch('location.longitude');
    const apartment = watch('apartment');
    const instructions = watch('instructions');
    const contactPhone = watch('contactPhone');

    const handlePlaceOrder = () => {
        navigation.navigate(AppStackRoutes.OrderComplete)
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.section}>
                    <CustomText style={styles.sectionTitle}>Order Summary</CustomText>
                    <CartInfo 
                        numberOfItems={itemCount} 
                        subTotal={total} 
                        deliveryCharges={deliveryCharges} 
                        total={total + deliveryCharges} 
                    />
                </View>

                <View style={styles.section}>
                    <CustomText style={styles.sectionTitle}>Payment Method</CustomText>
                    <View style={styles.paymentMethod}>
                        <CustomText>Credit Card</CustomText>
                    </View>
                </View>

                <View style={styles.section}>
                    <CustomText style={styles.sectionTitle}>Shipping Address</CustomText>
                    <View style={styles.address}>
                        <LocationAutocomplete
                            setValue={setValue as any}
                            onLocationSelect={(selectedLocation) => {
                                setValue('location.name', selectedLocation.name);
                                setValue('location.latitude', selectedLocation.latitude);
                                setValue('location.longitude', selectedLocation.longitude);
                            }}
                        />
                        
                        {locationName && (
                            <View style={styles.selectedLocation}>
                                <CustomText style={styles.locationName}>{locationName}</CustomText>
                            </View>
                        )}

                        <MapComponent
                            setValue={setValue as any}
                            latitude={latitude}
                            longitude={longitude}
                            locationName={locationName}
                        />

                        <View style={styles.additionalDetails}>
                            <InputFieldSell
                                placeholder="Apartment, suite, unit, etc. (optional)"
                                label="Apartment/Suite"
                                value={apartment}
                                onChangeText={(text) => setValue('apartment', text)}
                                error={errors.apartment?.message}
                            />

                            <InputFieldSell
                                placeholder="Contact phone number"
                                label="Contact Phone"
                                value={contactPhone}
                                onChangeText={(text) => setValue('contactPhone', text)}
                                error={errors.contactPhone?.message}
                                keyboardType="phone-pad"
                            />

                            <InputFieldSell
                                placeholder="Delivery instructions (optional)"
                                label="Delivery Instructions"
                                value={instructions}
                                onChangeText={(text) => setValue('instructions', text)}
                                error={errors.instructions?.message}
                                multiline
                                numberOfLines={3}
                            />
                        </View>

                        <View style={styles.shippingInfoTable}>
                            <View style={styles.tableRow}>
                                <CustomText style={styles.tableLabel}>Address:</CustomText>
                                <CustomText style={styles.tableValue}>{locationName || 'Not selected'}</CustomText>
                            </View>
                            {apartment && (
                                <View style={styles.tableRow}>
                                    <CustomText style={styles.tableLabel}>Apartment/Suite:</CustomText>
                                    <CustomText style={styles.tableValue}>{apartment}</CustomText>
                                </View>
                            )}
                            <View style={styles.tableRow}>
                                <CustomText style={styles.tableLabel}>Contact Phone:</CustomText>
                                <CustomText style={styles.tableValue}>{contactPhone || 'Not provided'}</CustomText>
                            </View>
                            {instructions && (
                                <View style={styles.tableRow}>
                                    <CustomText style={styles.tableLabel}>Instructions:</CustomText>
                                    <CustomText style={styles.tableValue}>{instructions}</CustomText>
                                </View>
                            )}
                        </View>

                        {errors.location?.name && (
                            <CustomText style={styles.errorText}>
                                {errors.location.name.message}
                            </CustomText>
                        )}
                    </View>
                </View>

                <CustomButton 
                    title="Place Order" 
                    onPress={handlePlaceOrder}
                    style={styles.button}
                />
            </View>
        </ScrollView>
    );
};