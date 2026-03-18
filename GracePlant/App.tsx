// App.tsx
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext'; // Import AuthProvider
import { AlertProvider } from './src/context/AlertContext';


const App = () => {
  return (
    <AuthProvider>
      <AlertProvider>
         <AppNavigator />
      </AlertProvider>
    </AuthProvider>
  );
};

export default App;
