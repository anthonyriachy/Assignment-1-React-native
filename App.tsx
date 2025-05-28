import './gesture-handler';
import React, { useEffect } from 'react';
import ScreenWrapper from './src/components/templates/ScreenWrapper/ScreenWrapper';
import { ThemeProvider } from './src/context/ThemeContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/lib/queryClient';
import MainNavigator from './src/navigation/MainNavigator';
import { requestStoragePermission, requestLocationPermission } from './src/lib/permissionUtils';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

function App(): React.JSX.Element {
  useEffect(() => {
    const initializeApp = async () => {
      await requestStoragePermission();
      await requestLocationPermission();
    };

    initializeApp();
    SplashScreen.hide();
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
