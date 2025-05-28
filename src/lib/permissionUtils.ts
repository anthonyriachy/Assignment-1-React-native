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
      return true;
    }

    // First check if we already have permission
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );

    if (hasPermission) {
      return true;
    }

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
      return true;
    }

    const result = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    return result;
  } catch (err) {
    console.error('Error in checkStoragePermission:', err);
    return false;
  }
};

export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    return true; // iOS handles permissions differently
  }

  try {
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) {
      return true;
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "App needs access to your location to provide location-based services.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.error('Error in requestLocationPermission:', err);
    return false;
  }
}; 