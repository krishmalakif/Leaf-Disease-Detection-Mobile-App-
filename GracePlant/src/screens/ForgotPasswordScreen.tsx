import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { sendPasswordResetEmail, resetPassword } from '../services/forgotPasswordService';

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stage, setStage] = useState(1); // 1: Email, 2: Code and Password
  const [error, setError] = useState<string | null>(null);

  const handleSendResetEmail = async () => {
    try {
      setError(null);
      await sendPasswordResetEmail(email);
      setStage(2); // Move to the next stage
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(errorMessage);
    }
  };

  const handleResetPassword = async () => {
    try {
      setError(null);
      if (newPassword !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      await resetPassword({ resetCode, newPassword });
      navigation.navigate('Login'); // Redirect to login screen
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {stage === 1 ? 'Forgot Password' : 'Reset Password'}
      </Text>
      {stage === 1 && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="gray"
          />
          <Button title="Send Reset Code" onPress={handleSendResetEmail} color="green" />
        </>
      )}
      {stage === 2 && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Reset Code"
            value={resetCode}
            onChangeText={setResetCode}
            placeholderTextColor="gray"
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={newPassword}
            secureTextEntry
            onChangeText={setNewPassword}
            placeholderTextColor="gray"
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            secureTextEntry
            onChangeText={setConfirmPassword}
            placeholderTextColor="gray"
          />
          <Button title="Reset Password" onPress={handleResetPassword} color="green" />
        </>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    color: 'black',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ForgotPasswordScreen;
