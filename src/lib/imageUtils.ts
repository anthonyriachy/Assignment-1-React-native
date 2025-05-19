import { Platform, Alert, ActionSheetIOS } from 'react-native';
import { launchImageLibrary, launchCamera, ImagePickerResponse } from 'react-native-image-picker';
import { config } from '../constants/Config';

interface ImagePickerResult {
  uri: string | null;
  error?: string;
}

const defaultImageOptions = {
  mediaType: 'photo' as const,
  maxHeight: 500,
  maxWidth: 500,
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
          if (buttonIndex === 1) {
            const result = await handleCameraLaunch();
            resolve(result);
          } else if (buttonIndex === 2) {
            const result = await handleImageLibraryLaunch();
            resolve(result);
          } else {
            resolve({ uri: null });
          }
        }
      );
    } else {
      Alert.alert(
        'Select Image',
        'Choose an option',
        [
          { text: 'Cancel', style: 'cancel', onPress: () => resolve({ uri: null }) },
          { text: 'Take Photo', onPress: async () => {
            const result = await handleCameraLaunch();
            resolve(result);
          }},
          { text: 'Choose from Library', onPress: async () => {
            const result = await handleImageLibraryLaunch();
            resolve(result);
          }},
        ]
      );
    }
  });
};


export const handleImageLibraryLaunch = async (): Promise<ImagePickerResult> => {
  try {
    const result: ImagePickerResponse = await launchImageLibrary(defaultImageOptions);

    if (result.didCancel) {
      return { uri: null };
    }

    if (result.errorCode) {
      console.log('ImagePicker Error: ', result.errorMessage);
      return { uri: null, error: 'Failed to pick image. Please try again.' };
    }

    if (result.assets && result.assets[0]?.uri) {
      return { uri: result.assets[0].uri };
    }

    return { uri: null, error: 'No image was selected. Please try again.' };
  } catch (error) {
    console.error('Error picking image:', error);
    return { uri: null, error: 'Failed to pick image. Please try again.' };
  }
};


export const handleCameraLaunch = async (): Promise<ImagePickerResult> => {
  try {
    const result: ImagePickerResponse = await launchCamera(defaultImageOptions);

    if (result.didCancel) {
      return { uri: null };
    }

    if (result.errorCode) {
      console.log('Camera Error: ', result.errorMessage);
      return { uri: null, error: 'Failed to take photo. Please try again.' };
    }

    if (result.assets && result.assets[0]?.uri) {
      return { uri: result.assets[0].uri };
    }

    return { uri: null, error: 'No image was captured. Please try again.' };
  } catch (error) {
    console.error('Error taking photo:', error);
    return { uri: null, error: 'Failed to take photo. Please try again.' };
  }
}; 


export const getImageUrl = (image: string) => {
  return config.BASE_URL?.replace('/api', '') + image;
};