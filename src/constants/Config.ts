import Config from 'react-native-config';

interface EnvironmentConfig {
  BASE_URL: string;
  googlePlacesApiKey: string;
  ONESIGNAL_APP_ID: string;
  ONESIGNAL_REST_API_KEY: string;
  ENVIRONMENT: 'development' | 'staging' | 'production';
}

export const config: EnvironmentConfig = {
  BASE_URL: Config.BASE_URL || '',
  googlePlacesApiKey: Config.GOOGLE_MAPS_API_KEY || '',
  ONESIGNAL_APP_ID: Config.ONESIGNAL_APP_ID || '',
  ONESIGNAL_REST_API_KEY: Config.ONESIGNAL_REST_API_KEY || '',
  ENVIRONMENT: (Config.ENVIRONMENT as EnvironmentConfig['ENVIRONMENT']) || 'development',
};
