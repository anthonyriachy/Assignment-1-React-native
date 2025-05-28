import Config from 'react-native-config';

interface EnvConfig {
  API_URL: string;
  API_VERSION: string;
  ENABLE_ANALYTICS: boolean;
  ENABLE_CRASH_REPORTING: boolean;
  GOOGLE_MAPS_API_KEY: string;
  ONESIGNAL_APP_ID: string;
  APP_ENV: 'development' | 'staging' | 'production';
  DEBUG_MODE: boolean;
}

// Parse boolean values from environment variables
const parseBoolean = (value: string | undefined): boolean => {
  return value?.toLowerCase() === 'true';
};

export const env: EnvConfig = {
  API_URL: Config.API_URL || '',
  API_VERSION: Config.API_VERSION || 'v1',
  ENABLE_ANALYTICS: parseBoolean(Config.ENABLE_ANALYTICS),
  ENABLE_CRASH_REPORTING: parseBoolean(Config.ENABLE_CRASH_REPORTING),
  GOOGLE_MAPS_API_KEY: Config.GOOGLE_MAPS_API_KEY || '',
  ONESIGNAL_APP_ID: Config.ONESIGNAL_APP_ID || '',
  APP_ENV: (Config.APP_ENV as EnvConfig['APP_ENV']) || 'development',
  DEBUG_MODE: parseBoolean(Config.DEBUG_MODE),
};

// Validate required environment variables
const requiredEnvVars: (keyof EnvConfig)[] = ['API_URL'];

requiredEnvVars.forEach((key) => {
  if (!env[key]) {
    console.error(`Missing required environment variable: ${key}`);
  }
});

export default env; 