import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/authService';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login } = useContext(AuthContext)!;

  const handleLogin = async () => {
    try {
      setError(null);
      setShowForgotPassword(false);
      const token = await loginUser({ email, password });
      await login(token);
      navigation.navigate('Home');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
      setShowForgotPassword(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} placeholderTextColor="gray" />
      <TextInput style={styles.input} placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} placeholderTextColor="gray" />
      <Button title="Login" onPress={handleLogin} color="green" />
      {error && <Text style={styles.errorText}>{error}</Text>}
      {showForgotPassword && (
        <View style={styles.buttonContainer}>
          <Button title="Forgot Password" onPress={() => navigation.navigate('ForgotPassword')} color="green" />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={() => navigation.navigate('Register')} color="green" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center', color: 'black' },
  input: { height: 40, borderColor: 'black', borderWidth: 1, marginBottom: 12, paddingHorizontal: 10, color: 'black' },
  errorText: { color: 'red', marginTop: 10, textAlign: 'center' },
  buttonContainer: { marginTop: 10 },
});

export default LoginScreen;
