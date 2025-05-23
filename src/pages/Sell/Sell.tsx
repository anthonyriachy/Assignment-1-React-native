import { Platform, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { createStyles } from './Sell.style';
import { Controller, useForm } from 'react-hook-form';
import { ProductSchema, ProductSchemaType } from '../../schemas/Product.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputFieldSell } from '../../components/atoms/InputFieldSell/InputFieldSell';
import { CustomButton } from '../../components/atoms/CustomButton';
import { NumberInput } from '../../components/atoms/NumberInput';
import CurrencyDollarIcon from '../../assets/icons/dollar-svgrepo-com.svg';
import { MapComponent } from '../../components/molecules/MapsComponent';
import { LocationAutocomplete } from '../../components/molecules/LocationAutocomplete';
import { useCreateProduct } from '../../hooks/queries/products/useCreateProduct';
import { useGetProductById } from '../../hooks/queries/products/useGetProductById';
import { useErrorAlert } from '../../hooks/useErrorAlert';
import { useSuccessAlert } from '../../hooks/useSuccessAlert';
import { ImagePicker } from '../../components/molecules/ImagePicker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useEffect, useCallback } from 'react';
import { useUpdateProduct } from '../../hooks/queries/products/useUpdateProduct';
import { useTheme } from '../../hooks/UseTheme';
import { AppStackRoutes } from '../../constants/AppStackRoutes';
import { CommonActions } from '@react-navigation/native';
import { AppStackParamsList } from '../../types/AppStackParamsList';
import { Loading } from '../../components/atoms/Loading';

type SellScreenRouteProp = RouteProp<AppStackParamsList, AppStackRoutes.SellModal>;

const defaultValues = {
    title: '',
    description: '',
    price: 0,
    images: [],
    location: {
        name: '',
        longitude: 0,
        latitude: 0,
    },
};

export function Sell() {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const navigation = useNavigation();
    const route = useRoute<SellScreenRouteProp>();
    const productId = route.params?.productId;

    const isEditMode = !!productId;

    const { data: productData, isLoading: isProductLoading, error: productError } = useGetProductById(productId || '');
    const { mutate: createProduct, error: createError, isPending: isCreatePending, isSuccess: isCreateSuccess } = useCreateProduct();
    const { mutate: updateProduct, error: updateError, isPending: isUpdatePending, isSuccess: isUpdateSuccess } = useUpdateProduct(productId || '');
    const error = createError || updateError || productError;
    const isPending = isCreatePending || isUpdatePending;
    const isSuccess = isCreateSuccess || isUpdateSuccess;

    useErrorAlert({
        error: error,
    });

    useSuccessAlert({
        success: isSuccess,
        message: isEditMode ? 'Product updated successfully!' : 'Product created successfully!',
        onDismiss: () => {
            if (isEditMode) {
                navigation.goBack();
            } else {
                navigation.dispatch(
                    CommonActions.navigate({
                        name: AppStackRoutes.BottomTabs,
                    })
                );
            }
        },
    });

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<ProductSchemaType>({
        resolver: zodResolver(ProductSchema),
        defaultValues,
    });

    const resetFormWithProductData = useCallback((data: typeof productData) => {
        if (!data) {return;}

        reset({
            title: data.title,
            description: data.description,
            price: data.price,
            images: data.images?.map(img => img.url) || [],
            location: {
                name: data.location.name,
                longitude: data.location.longitude,
                latitude: data.location.latitude,
            },
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

        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('price', String(data.price));
        formData.append('location[name]', data.location.name);
        formData.append('location[latitude]', String(data.location.latitude));
        formData.append('location[longitude]', String(data.location.longitude));
        data.images.forEach((image, index) => {
            formData.append('images', {
                uri: image,
                type: 'image/jpeg',
                name: `image-${index}.jpg`,
            });
        });
    

        

        if (isEditMode) {
            updateProduct(formData);
        } else {
            createProduct(formData);
        }
    }, [isEditMode, createProduct, updateProduct, productData]);

    if (isEditMode && isProductLoading) {
        return (
            <View style={styles.container}>
                <Loading />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, backgroundColor: colors.background }}
            >
                <ScrollView
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
                                    error={errors.images?.message}
                                    images={value}
                                    onImagesChange={onChange}
                                />
                            )}
                        />
                        <View style={{gap:10}}>
                            <Controller
                                control={control}
                                name="location.name"
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <InputFieldSell
                                        placeholder="Location Name"
                                        label="Location Name"
                                        error={errors.location?.name?.message}
                                        onChangeText={onChange}
                                        value={value}
                                        onBlur={onBlur}
                                    />
                                )}
                            />

                            <LocationAutocomplete
                                setValue={setValue}
                                onLocationSelect={(selectedLocation) => {
                                    setValue('location.name', selectedLocation.name);
                                    setValue('location.latitude', selectedLocation.latitude);
                                    setValue('location.longitude', selectedLocation.longitude);
                                }}
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
                    title={isEditMode ? 'Update Item' : 'Add Item'}
                    onPress={handleSubmit(onSubmit)}
                    style={styles.button}
                    disabled={isPending}
                    loading={isPending}
                />
            </View>
        </View>
    );
}
