import './gesture-handler';
import React from 'react';
import { AuthContextProvider } from './src/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from './src/stacks/AppStack/AppStack';

function App(): React.JSX.Element {
  return (
   <AuthContextProvider>
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
    </AuthContextProvider>
  );
}

export default App;
