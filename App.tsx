import './gesture-handler';
import React from 'react';
import { AuthContextProvider } from './src/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from './src/stacks/AppStack/AppStack';
import ScreenWrapper from './src/components/templates/ScreenWrapper/ScreenWrapper';
import { ThemeProvider } from './src/context/ThemeContext';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AuthContextProvider>
        <ScreenWrapper>
          <NavigationContainer>
            <AppStack />
          </NavigationContainer>
        </ScreenWrapper>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
