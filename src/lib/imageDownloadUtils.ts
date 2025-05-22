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
    console.log('Starting image download process...');
    console.log('Platform:', Platform.OS);
    console.log('Android version:', Platform.Version);

    // Check storage permission for Android
    if (Platform.OS === 'android') {
      console.log('Checking Android storage permission...');
      const hasPermission = await checkStoragePermission();
      
      if (!hasPermission) {
        console.log('Permission not granted, requesting...');
        const granted = await requestStoragePermission();
        if (!granted) {
          console.log('Permission denied by user');
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
      console.log('Storage permission confirmed');
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

    console.log('Download path:', downloadPath);

    // Download the file
    console.log('Starting file download...');
    const downloadResult = await RNFS.downloadFile({
      fromUrl: imageUrl,
      toFile: downloadPath,
      background: true,
      begin: (res: DownloadBeginCallbackResult) => {
        console.log('Download started:', res);
        options.onStart?.({
          bytesWritten: 0,
          contentLength: res.contentLength
        });
      },
      progress: (res: DownloadProgress) => {
        console.log('Download progress:', res);
        options.onProgress?.(res);
      },
    }).promise;

    console.log('Download completed with status:', downloadResult.statusCode);
    if (downloadResult.statusCode === 200) {
      console.log('Download successful');
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