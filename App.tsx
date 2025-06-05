import './gesture-handler';
import React, { useEffect } from 'react';
import ScreenWrapper from './src/components/templates/ScreenWrapper/ScreenWrapper';
import { ThemeProvider } from './src/context/ThemeContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/lib/queryClient';
import MainNavigator from './src/navigation/MainNavigator';
import { requestStoragePermission, requestLocationPermission } from './src/lib/permissionUtils';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Alert, StyleSheet } from 'react-native';
import OneSignalService from './src/services/OneSignalService';
import { config } from './src/constants/Config';

function App(): React.JSX.Element {
  useEffect(() => {
     
    // Alert.alert(
    //   'Environment Config',
    //   `BASE_URL: ${config.BASE_URL || 'not set'}\nENVIRONMENT: ${config.ENVIRONMENT || 'not set'}\nHas BASE_URL: ${Boolean(config.BASE_URL)}`
    // );

    const initializeApp = async () => {
      try {
        await requestStoragePermission();
        await requestLocationPermission();
        if (!config.ONESIGNAL_APP_ID) {
          console.warn('OneSignal App ID is not configured in environment variables');
          return;
        }
        OneSignalService.getInstance().initialize(config.ONESIGNAL_APP_ID);
      } catch (error) {
        console.warn('Error during app initialization:', error);
      }
    };

    initializeApp();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ScreenWrapper>
            <MainNavigator />
          </ScreenWrapper>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
