// src/components/CustomAlert.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CustomAlertProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, type, onClose }) => {
  return (
    <View style={[styles.alertContainer, type === 'success' ? styles.success : styles.error]}>
      <Text style={styles.alertText}>{message}</Text>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  alertContainer: {
    position: 'absolute',
    top: '30%',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 1000,
  },
  alertText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  success: {
    backgroundColor: 'green',
  },
  error: {
    backgroundColor: 'red',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#000',
    fontSize: 14,
  },
});

export default CustomAlert;
