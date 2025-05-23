import { Platform, Alert, ActionSheetIOS } from 'react-native';
import { launchImageLibrary, launchCamera, ImagePickerResponse, PhotoQuality } from 'react-native-image-picker';
import { config } from '../constants/Config';

interface ImagePickerResult {
  uris: string[];
  error?: string;
}

const defaultImageOptions = {
  mediaType: 'photo' as const,
  maxHeight: 1200,
  maxWidth: 1200,
  quality: 0.7 as PhotoQuality,
  includeBase64: false,
  saveToPhotos: false,
  selectionLimit: 5,
  includeExtra: true,
  presentationStyle: 'pageSheet' as const,
  compressImageQuality: 0.7,
  compressImageMaxWidth: 1200,
  compressImageMaxHeight: 1200,
};

const validateImageResponse = (result: ImagePickerResponse): ImagePickerResult => {
  if (result.didCancel) {
    return { uris: [] };
  }

  if (result.errorCode) {
    console.error('ImagePicker Error:', result.errorMessage);
    let errorMessage = 'Failed to process image. Please try again.';
    
    switch (result.errorCode) {
      case 'camera_unavailable':
        errorMessage = 'Camera is not available. Please check your camera permissions.';
        break;
      case 'permission':
        errorMessage = 'Permission denied. Please grant camera and photo library access.';
        break;
      case 'others':
        errorMessage = result.errorMessage || errorMessage;
        break;
    }
    
    return { 
      uris: [], 
      error: errorMessage 
    };
  }

  if (!result.assets || result.assets.length === 0) {
    return { 
      uris: [], 
      error: 'No images were selected. Please try again.' 
    };
  }

  const uris = result.assets
    .map(asset => {
      if (!asset?.uri) return null;
      
      // Validate file size (max 10MB)
      if (asset.fileSize && asset.fileSize > 10 * 1024 * 1024) {
        console.warn('Image too large:', asset.uri);
        return null;
      }
      
      return asset.uri;
    })
    .filter((uri): uri is string => typeof uri === 'string' && uri.length > 0);

  if (uris.length === 0) {
    return { 
      uris: [], 
      error: 'No valid images were selected. Please ensure images are less than 10MB.' 
    };
  }

  return { uris };
};

export const showImagePickerOptions = (): Promise<ImagePickerResult> => {
  return new Promise((resolve) => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Library'],
          cancelButtonIndex: 0,
        },
        async (buttonIndex) => {
          try {
            if (buttonIndex === 1) {
              const result = await handleCameraLaunch();
              resolve(result);
            } else if (buttonIndex === 2) {
              const result = await handleImageLibraryLaunch();
              resolve(result);
            } else {
              resolve({ uris: [] });
            }
          } catch (error) {
            console.error('Error in image picker:', error);
            resolve({ 
              uris: [], 
              error: 'Failed to process image selection. Please try again.' 
            });
          }
        }
      );
    } else {
      Alert.alert(
        'Select Image',
        'Choose an option',
        [
          { text: 'Cancel', style: 'cancel', onPress: () => resolve({ uris: [] }) },
          { text: 'Take Photo', onPress: async () => {
            try {
              const result = await handleCameraLaunch();
              resolve(result);
            } catch (error) {
              console.error('Error taking photo:', error);
              resolve({ 
                uris: [], 
                error: 'Failed to take photo. Please try again.' 
              });
            }
          }},
          { text: 'Choose from Library', onPress: async () => {
            try {
              const result = await handleImageLibraryLaunch();
              resolve(result);
            } catch (error) {
              console.error('Error choosing from library:', error);
              resolve({ 
                uris: [], 
                error: 'Failed to choose image. Please try again.' 
              });
            }
          }},
        ]
      );
    }
  });
};

export const handleImageLibraryLaunch = async (): Promise<ImagePickerResult> => {
  try {
    const result: ImagePickerResponse = await launchImageLibrary({
      ...defaultImageOptions,
      mediaType: 'photo',
    });

    return validateImageResponse(result);
  } catch (error) {
    console.error('Error picking images:', error);
    return { 
      uris: [], 
      error: 'Failed to pick images. Please try again.' 
    };
  }
};

export const handleCameraLaunch = async (): Promise<ImagePickerResult> => {
  try {
    const result: ImagePickerResponse = await launchCamera({
      ...defaultImageOptions,
      mediaType: 'photo',
      saveToPhotos: true,
    });

    return validateImageResponse(result);
  } catch (error) {
    console.error('Error taking photo:', error);
    return { 
      uris: [], 
      error: 'Failed to take photo. Please try again.' 
    };
  }
};

export const getImageUrl = (image: string) => {
  if (!image) return '';
  const baseUrl = config.BASE_URL?.replace('/api', '') || '';
  // Remove leading slash from image path if baseUrl ends with slash
  const imagePath = baseUrl.endsWith('/') ? image.replace(/^\//, '') : image;
  return `${baseUrl}${imagePath}`;
};