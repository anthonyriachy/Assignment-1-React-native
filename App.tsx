import './gesture-handler';
import React, { useEffect } from 'react';
import ScreenWrapper from './src/components/templates/ScreenWrapper/ScreenWrapper';
import { ThemeProvider } from './src/context/ThemeContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/lib/queryClient';
import MainNavigation from './src/navigation/MainNavigator';
import { requestStoragePermission } from './src/lib/permissionUtils';
 
function App(): React.JSX.Element {
  useEffect(() => {
    const initializeApp = async () => {
      await requestStoragePermission();
    };

    initializeApp();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ScreenWrapper>
          <MainNavigation />
        </ScreenWrapper>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
