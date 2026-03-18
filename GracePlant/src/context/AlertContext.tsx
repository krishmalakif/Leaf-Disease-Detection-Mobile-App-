import React, { createContext, useContext, ReactNode, useState } from 'react';
import CustomAlert from '../components/CustomAlert';

interface AlertContextProps {
  showSuccessAlert: (message: string) => void;
  showErrorAlert: (message: string) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');

  const showSuccessAlert = (message: string) => {
    setAlertMessage(message);
    setAlertType('success');
    setAlertVisible(true);
  };

  const showErrorAlert = (message: string) => {
    setAlertMessage(message);
    setAlertType('error');
    setAlertVisible(true);
  };

  const closeAlert = () => {
    setAlertVisible(false);
    setAlertMessage('');
  };

  return (
    <AlertContext.Provider value={{ showSuccessAlert, showErrorAlert }}>
      {children}
      {alertVisible && (
        <CustomAlert
          message={alertMessage}
          type={alertType}
          onClose={closeAlert}
        />
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
