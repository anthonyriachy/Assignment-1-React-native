import React, { useState, useCallback, useMemo } from 'react';
import { View, Image, TouchableOpacity, ScrollView, Text, Alert, ActivityIndicator } from 'react-native';
import { getImageUrl, showImagePickerOptions } from '../../../lib/imageUtils';
import CameraIcon from '../../../assets/icons/photo-camera-svgrepo-com.svg';
import { useTheme } from '../../../hooks/UseTheme';
import { createStyles } from './ImagePicker.style';
import { ImagePickerProps } from './ImagePicker.type.ts';

const MAX_IMAGES = 5;
const IMAGE_LOADING_TIMEOUT = 10000; // 10 seconds

export const ImagePicker: React.FC<ImagePickerProps> = React.memo(({ images, onImagesChange }) => {
    const { colors } = useTheme();
    const styles = useMemo(() => createStyles(colors), [colors]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingImages, setLoadingImages] = useState<Set<number>>(new Set());

    const validateImageUri = useCallback((uri: string): boolean => {
        if (!uri) return false;
        try {
            new URL(uri);
            return true;
        } catch {
            return false;
        }
    }, []);

    const handleAddImage = useCallback(async () => {
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
    }, [images, onImagesChange, validateImageUri]);

    const handleRemoveImage = useCallback((index: number) => {
        try {
            const newImages = [...images];
            newImages.splice(index, 1);
            onImagesChange(newImages);
        } catch (error) {
            console.error('Error removing image:', error);
            Alert.alert('Error', 'Failed to remove image. Please try again.');
        }
    }, [images, onImagesChange]);

    const handleImageLoad = useCallback((index: number) => {
        setLoadingImages(prev => {
            const newSet = new Set(prev);
            newSet.delete(index);
            return newSet;
        });
    }, []);

    const handleImageLoadStart = useCallback((index: number) => {
        setLoadingImages(prev => new Set(prev).add(index));
        // Set timeout to handle loading failures
        setTimeout(() => {
            setLoadingImages(prev => {
                if (prev.has(index)) {
                    const newSet = new Set(prev);
                    newSet.delete(index);
                    return newSet;
                }
                return prev;
            });
        }, IMAGE_LOADING_TIMEOUT);
    }, []);

    const handleImageError = useCallback((index: number, uri: string) => {
        console.error('Error loading image:', uri);
        handleRemoveImage(index);
    }, [handleRemoveImage]);

    // Filter out any empty URIs
    const validImages = useMemo(() => images.filter(uri => uri), [images]);

    return (
        <View>
            <Text style={[styles.label, { color: colors.text }]}>Images</Text>

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
                        accessibilityLabel="Add image"
                        accessibilityHint="Opens image picker to select or take a photo"
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
                            source={{ uri: uri.startsWith('/uploads/') ? getImageUrl(uri) : uri }} 
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
                                <Text style={styles.removeButtonText}>×</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <Text style={[styles.helperText, { color: colors.text }]}>
                {validImages.length}/{MAX_IMAGES} images selected
            </Text>
        </View>
    );
});

 
