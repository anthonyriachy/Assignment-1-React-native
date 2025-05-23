/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-catch-shadow */
import React, { useState, useMemo } from 'react';
import { View, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { getImageUrl, showImagePickerOptions } from '../../../lib/imageUtils';
import CameraIcon from '../../../assets/icons/photo-camera-svgrepo-com.svg';
import { useTheme } from '../../../hooks/UseTheme';
import { createStyles } from './ImagePicker.style';
import { ImagePickerProps } from './ImagePicker.type.ts';
import { ErrorText } from '../../atoms/ErrorText/ErrorText.tsx';
import { CustomText } from '../../atoms/CustomText/CustomText.tsx';

const MAX_IMAGES = 5;
const IMAGE_LOADING_TIMEOUT = 10000;

export const ImagePicker = ({ images, onImagesChange, error }: ImagePickerProps) => {
    const { colors } = useTheme();
    const styles = useMemo(() => createStyles(colors), [colors]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingImages, setLoadingImages] = useState<Set<number>>(new Set());

    const validateImageUri = (uri: string): boolean => {
        if (!uri) {return false;}
        try {
            new URL(uri);
            return true;
        } catch {
            return false;
        }
    };

    const handleAddImage = async () => {
        try {
            setIsLoading(true);
            const result = await showImagePickerOptions();

            if (result.error) {
                Alert.alert('Error', result.error);
                return;
            }

            if (result.uris.length > 0) {
                const validUris = result.uris.filter(validateImageUri);

                if (validUris.length === 0) {
                    Alert.alert('Error', 'No valid images were selected');
                    return;
                }

                const newImages = [...images.filter(uri => uri), ...validUris];
                onImagesChange(newImages.slice(0, MAX_IMAGES));
            }
        } catch (error) {
            console.error('Error adding image:', error);
            Alert.alert('Error', 'Failed to add image. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveImage = (index: number) => {
        try {
            const newImages = [...images];
            newImages.splice(index, 1);
            onImagesChange(newImages);
        } catch (error) {
            console.error('Error removing image:', error);
            Alert.alert('Error', 'Failed to remove image. Please try again.');
        }
    };

    const handleImageLoad = (index: number) => {
        setLoadingImages(prev => {
            const newSet = new Set(prev);
            newSet.delete(index);
            return newSet;
        });
    };

    const handleImageLoadStart = (index: number) => {
        setLoadingImages(prev => new Set(prev).add(index));

        setLoadingImages(prev => {
            if (prev.has(index)) {
                const newSet = new Set(prev);
                newSet.delete(index);
                return newSet;
            }
            return prev;
        });

    };

    const handleImageError = (index: number, uri: string) => {
        handleRemoveImage(index);
    };

    // Filter out any empty URIs
    const validImages = images.filter(uri => uri);

    return (
        <View>
            <CustomText style={[styles.label, { color: colors.text }]}>Images</CustomText>
            {error && <ErrorText error={error} />}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
            >
                {validImages.length < MAX_IMAGES && (
                    <TouchableOpacity
                        style={[styles.addButton, isLoading && styles.disabledButton]}
                        onPress={handleAddImage}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color={colors.primary} />
                        ) : (
                            <CameraIcon width={24} height={24} />
                        )}
                    </TouchableOpacity>
                )}
                {validImages.map((uri, index) => (
                    <View key={`${uri}-${index}`} style={styles.imageContainer}>
                        {loadingImages.has(index) && (
                            <View style={styles.loadingOverlay}>
                                <ActivityIndicator color={colors.primary} />
                            </View>
                        )}
                        <Image
                            source={{
                                uri: uri.startsWith('/uploads')
                                    ? getImageUrl(uri)
                                    : uri,
                            }}
                            style={styles.image}
                            onLoadStart={() => handleImageLoadStart(index)}
                            onLoad={() => handleImageLoad(index)}
                            onError={() => handleImageError(index, uri)}
                        />
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => handleRemoveImage(index)}
                            accessibilityLabel="Remove image"
                            accessibilityHint="Removes this image from the selection"
                        >
                            <View style={[styles.removeButtonInner, { backgroundColor: colors.error }]}>
                                <CustomText style={styles.removeButtonText}>×</CustomText>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <CustomText style={[styles.helperText, { color: colors.text }]}>
                {validImages.length}/{MAX_IMAGES} images selected
            </CustomText>
        </View>
    );
};


