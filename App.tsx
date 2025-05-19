import './gesture-handler';
import React from 'react';
import { AuthContextProvider } from './src/context/AuthContext';
import ScreenWrapper from './src/components/templates/ScreenWrapper/ScreenWrapper';
import { ThemeProvider } from './src/context/ThemeContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/lib/queryClient';
import MainNavigation from './src/navigation/MainNavigator';
function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthContextProvider>
          <ScreenWrapper>
            <MainNavigation />
          </ScreenWrapper>
        </AuthContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
