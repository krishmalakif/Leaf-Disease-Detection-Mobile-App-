import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { resetPassword } from '../services/authService';
import { useNavigation } from '@react-navigation/native';

const ResetScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation();

  const handleReset = async () => {
    try {
      await resetPassword({ email, currentPassword, newPassword });
      Alert.alert('Password reset successful');
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('Password reset failed', error?.response?.data?.msg || error?.message || 'Error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        placeholderTextColor="gray"
      />
      <Button title="Reset" onPress={handleReset} color="green" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center', color: 'black' },
  input: {
    height: 40,
    borderColor: 'black',
    color: 'black',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});

export default ResetScreen;
