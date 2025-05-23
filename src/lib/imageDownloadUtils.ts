import { Platform, Alert } from 'react-native';
import RNFS, { DownloadBeginCallbackResult } from 'react-native-fs';
import { checkStoragePermission, requestStoragePermission } from './permissionUtils';

interface DownloadProgress {
  bytesWritten: number;
  contentLength: number;
}

interface DownloadOptions {
  onProgress?: (progress: DownloadProgress) => void;
  onStart?: (progress: { bytesWritten: number; contentLength: number }) => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const downloadImage = async (
  imageUrl: string,
  options: DownloadOptions = {}
): Promise<void> => {
  try {


    // Check storage permission for Android
    if (Platform.OS === 'android') {
      const hasPermission = await checkStoragePermission();
      
      if (!hasPermission) {
        const granted = await requestStoragePermission();
        if (!granted) {
          Alert.alert(
            'Permission Required',
            'Storage permission is required to download images. Please grant permission in Settings.',
            [
              { text: 'OK', onPress: () => {} }
            ]
          );
          throw new Error('Storage permission is required to download images');
        }
      }
    }

    // Get the file extension from the URL
    const fileExtension = imageUrl.split('.').pop() || 'jpg';
    const fileName = `image_${Date.now()}.${fileExtension}`;
    
    // Set the download path based on platform
    const downloadPath = Platform.select({
      ios: `${RNFS.DocumentDirectoryPath}/${fileName}`,
      android: `${RNFS.DownloadDirectoryPath}/${fileName}`,
    });

    if (!downloadPath) {
      console.error('Could not determine download path');
      throw new Error('Could not determine download path');
    }



    // Download the file

    const downloadResult = await RNFS.downloadFile({
      fromUrl: imageUrl,
      toFile: downloadPath,
      background: true,
      begin: (res: DownloadBeginCallbackResult) => {

        options.onStart?.({
          bytesWritten: 0,
          contentLength: res.contentLength
        });
      },
      progress: (res: DownloadProgress) => {

        options.onProgress?.(res);
      },
    }).promise;


    if (downloadResult.statusCode === 200) {

      options.onSuccess?.();
    } else {
      console.error('Download failed with status:', downloadResult.statusCode);
      throw new Error('Download failed');
    }
  } catch (error) {
    console.error('Download error:', error);
    options.onError?.(error instanceof Error ? error : new Error('Unknown error occurred'));
    throw error;
  }
}; 