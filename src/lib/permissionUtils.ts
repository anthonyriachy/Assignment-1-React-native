import { Platform, PermissionsAndroid } from 'react-native';

export const requestStoragePermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    return true; // iOS handles permissions differently
  }

  try {
    // For Android 10 (API level 29) and above, we don't need to request WRITE_EXTERNAL_STORAGE
    // as it's handled by scoped storage
    const androidVersion = parseInt(Platform.Version.toString(), 10);
    if (androidVersion >= 29) {
      console.log('Android 10 or above detected, using scoped storage');
      return true;
    }

    console.log('Checking existing storage permission...');
    // First check if we already have permission
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );

    if (hasPermission) {
      console.log('Storage permission already granted');
      return true;
    }

    console.log('Requesting storage permission...');
    // If we don't have permission, request it
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Storage Permission",
        message: "App needs access to your storage to save images.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );

    console.log('Permission request result:', granted);
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.error('Error in requestStoragePermission:', err);
    return false;
  }
};

export const checkStoragePermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    return true; // iOS handles permissions differently
  }

  try {
    // For Android 10 and above, we don't need to check WRITE_EXTERNAL_STORAGE
    const androidVersion = parseInt(Platform.Version.toString(), 10);
    if (androidVersion >= 29) {
      console.log('Android 10 or above detected, using scoped storage');
      return true;
    }

    console.log('Checking storage permission...');
    const result = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    console.log('Storage permission check result:', result);
    return result;
  } catch (err) {
    console.error('Error in checkStoragePermission:', err);
    return false;
  }
}; 