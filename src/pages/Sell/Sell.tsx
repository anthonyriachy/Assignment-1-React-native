import { Platform, KeyboardAvoidingView, ScrollView, Text, View, ActivityIndicator } from "react-native";
import { BackArrow } from "../../components/atoms/BackArrow";
import { createStyles } from "./Sell.style";
import { Controller, useForm } from "react-hook-form";
import { ProductSchema, ProductSchemaType } from "../../schemas/Product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputFieldSell } from "../../components/atoms/InputFieldSell/InputFieldSell";
import { CustomButton } from "../../components/atoms/CustomButton";
import { NumberInput } from "../../components/atoms/NumberInput";
import CurrencyDollarIcon from "../../assets/icons/dollar-svgrepo-com.svg";
import { MapComponent } from "../../components/molecules/MapsComponent";
import { LocationAutocomplete } from "../../components/molecules/LocationAutocomplete";
import { useCreateProduct } from "../../hooks/queries/products/useCreateProduct";
import { useGetProductById } from "../../hooks/queries/products/useGetProductById";
import { useErrorAlert } from "../../hooks/useErrorAlert";
import { useSuccessAlert } from "../../hooks/useSuccessAlert";
import { ImagePicker } from "../../components/molecules/ImagePicker";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useEffect, useMemo, useCallback } from "react";
import { useUpdateProduct } from "../../hooks/queries/products/useUpdateProduct";
import { useTheme } from "../../hooks/UseTheme";
import { AppStackRoutes } from "../../constants/AppStackRoutes";
import { CommonActions } from "@react-navigation/native";

type SellScreenRouteProp = RouteProp<{ Sell: { productId?: string; }; }>;

export function Sell() {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const navigation = useNavigation();
    const route = useRoute<SellScreenRouteProp>();
    const productId = route.params?.productId;

    const isEditMode = !!productId;

    const { data: productData, isLoading: isProductLoading } = useGetProductById(productId || '');
    const { mutate: createProduct, error: createError, isPending: isCreatePending, isSuccess: isCreateSuccess } = useCreateProduct();
    const { mutate: updateProduct, error: updateError, isPending: isUpdatePending, isSuccess: isUpdateSuccess } = useUpdateProduct(productId || '');
    const error = createError || updateError;
    const isPending = isCreatePending || isUpdatePending;
    const isSuccess = isCreateSuccess || isUpdateSuccess;

    useErrorAlert({
        error: error,
    });

    useSuccessAlert({
        success: isSuccess,
        message: isEditMode ? "Product updated successfully!" : "Product created successfully!",
        onDismiss: () => {
            if (isEditMode) {
                navigation.goBack();
            } else {
                navigation.dispatch(
                    CommonActions.navigate({
                        name: AppStackRoutes.BottomTabs
                    })
                );
            }
        }
    });

    const defaultValues = useMemo(() => ({
        title: '',
        description: '',
        price: 0,
        images: [],
        location: {
            name: '',
            longitude: 0,
            latitude: 0,
        }
    }), []);

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<ProductSchemaType>({
        resolver: zodResolver(ProductSchema),
        defaultValues
    });

    const resetFormWithProductData = useCallback((data: typeof productData) => {
        if (!data) return;

        reset({
            title: data.title,
            description: data.description,
            price: data.price,
            images: data.images?.map(img => img.url) || [],
            location: {
                name: data.location.name,
                longitude: data.location.longitude,
                latitude: data.location.latitude,
            }
        }, { keepDefaultValues: true });
    }, [reset]);

    useEffect(() => {
        if (isEditMode && productData && !isProductLoading) {
            resetFormWithProductData(productData);
        }
    }, [isEditMode, productData, isProductLoading, resetFormWithProductData]);

    // Watch location values
    const locationName = watch('location.name');
    const latitude = watch('location.latitude');
    const longitude = watch('location.longitude');

    const onSubmit = useCallback(async (data: ProductSchemaType) => {
        const formData = new FormData();

        // Append basic product data
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('price', String(data.price));
        formData.append('location[name]', data.location.name);
        formData.append('location[latitude]', String(data.location.latitude));
        formData.append('location[longitude]', String(data.location.longitude));

        // Append all current images
        data.images.forEach((image, index) => {
            // If it's a URL (existing image), convert it to a file object
            if (!image.startsWith('/uploads/')) {

                // If it's a local file, append as is
                formData.append('images', {
                    uri: image,
                    type: 'image/jpeg',
                    name: `image-${index}.jpg`
                } as any);
            }
        });

        if (isEditMode) {
            console.log('formData', formData);
            updateProduct(formData);
        } else {
            createProduct(formData);
        }
    }, [isEditMode, createProduct, updateProduct]);

    if (isEditMode && isProductLoading) {
        return (
            <View style={[styles.container, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, backgroundColor: colors.background }}
            >
                <View style={styles.header}>
                    <View style={styles.backButton}>
                        <BackArrow onPress={() => {
                            if (isEditMode) {
                                navigation.goBack();
                            } else {
                                navigation.dispatch(
                                    CommonActions.navigate({
                                        name: AppStackRoutes.BottomTabs
                                    })
                                );
                            }
                        }} />
                    </View>
                    <Text style={styles.title}>{isEditMode ? 'Edit Item' : 'Add Item'}</Text>
                </View>

                <ScrollView
                    style={{ flex: 1, backgroundColor: colors.background }}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <View style={styles.form}>
                        <Controller
                            control={control}
                            name="title"
                            render={({ field: { onChange, value, onBlur } }) => (
                                <InputFieldSell
                                    placeholder="Title"
                                    label="Title"
                                    error={errors.title?.message}
                                    onChangeText={onChange}
                                    value={value}
                                    onBlur={onBlur}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="description"
                            render={({ field: { onChange, value, onBlur } }) => (
                                <InputFieldSell
                                    description={true}
                                    placeholder="Description"
                                    label="Description"
                                    error={errors.description?.message}
                                    onChangeText={onChange}
                                    value={value}
                                    onBlur={onBlur}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="price"
                            render={({ field: { onChange, value, onBlur } }) => (
                                <NumberInput
                                    Icon={<CurrencyDollarIcon width={23} height={23} />}
                                    placeholder="Price"
                                    label="Price"
                                    error={errors.price?.message}
                                    onChangeText={onChange}
                                    value={String(value)}
                                    onBlur={onBlur}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="images"
                            render={({ field: { value, onChange } }) => (
                                <ImagePicker
                                    images={value}
                                    onImagesChange={onChange}
                                />
                            )}
                        />
                        <View>
                            <Controller
                                control={control}
                                name="location.name"
                                render={({ field: { value } }) => (
                                    <LocationAutocomplete
                                        setValue={setValue}
                                        value={value}
                                    />
                                )}
                            />

                            <MapComponent
                                setValue={setValue}
                                latitude={latitude}
                                longitude={longitude}
                                locationName={locationName}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={styles.buttonContainer}>
                <CustomButton
                    title={isEditMode ? "Update Item" : "Add Item"}
                    onPress={handleSubmit(onSubmit)}
                    style={styles.button}
                    disabled={isPending}
                    loading={isPending}
                />
            </View>
        </View>
    );
}