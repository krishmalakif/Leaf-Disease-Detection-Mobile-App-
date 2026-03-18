import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { registerUser } from '../services/authService';

const RegisterScreen: React.FC = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleRegister = async () => {
    setStatusMessage('');
    setIsError(false);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setIsError(true);
      setStatusMessage('Invalid email format');
      return;
    }

    if (password !== confirmPassword) {
      setIsError(true);
      setStatusMessage('Passwords do not match');
      return;
    }

    try {
      await registerUser({ name, email, password });
      setStatusMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigation.navigate('Login'), 2000);
    } catch (error: any) {
      setIsError(true);
      setStatusMessage(error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      {statusMessage !== '' && (
        <View style={isError ? styles.errorBox : styles.successBox}>
          <Text style={[styles.messageText, { color: isError ? '#721c24' : '#155724' }]}>{statusMessage}</Text>
        </View>
      )}
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} placeholderTextColor="gray" />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} placeholderTextColor="gray" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} placeholderTextColor="gray" />
      <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} placeholderTextColor="gray" />
      <Button title="Register" onPress={handleRegister} color="green" />
      <Text style={styles.loginRedirect} onPress={() => navigation.navigate('Login')}>
        Already have an account? Login here.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center', color: 'black' },
  input: { height: 40, borderColor: 'black', borderWidth: 1, marginBottom: 12, paddingHorizontal: 10, color: 'black' },
  loginRedirect: { marginTop: 20, color: 'green', textAlign: 'center' },
  errorBox: { backgroundColor: '#f8d7da', padding: 10, borderRadius: 5, marginBottom: 10 },
  successBox: { backgroundColor: '#d4edda', padding: 10, borderRadius: 5, marginBottom: 10 },
  messageText: { textAlign: 'center', fontSize: 14 },
});

export default RegisterScreen;
