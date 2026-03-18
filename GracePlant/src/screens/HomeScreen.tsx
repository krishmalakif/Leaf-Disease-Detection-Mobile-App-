import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext)!;

  const handleLogout = () => {
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <View style={styles.container}>
      <Ionicons name="flower" size={50} color="green" style={styles.logoIcon} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Upload')}>
        <Ionicons name="image" size={24} color="white" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Choose from Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera')}>
        <Ionicons name="camera" size={24} color="white" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Capture from Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Reset')}>
        <Ionicons name="lock-closed" size={24} color="white" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('History')}>
        <Ionicons name="time" size={24} color="white" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Ionicons name="log-out" size={24} color="white" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 20 },
  logoIcon: { marginBottom: 20 },
  button: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'green', paddingVertical: 15, paddingHorizontal: 20, borderRadius: 10, marginVertical: 5, width: '100%' },
  buttonIcon: { marginRight: 10 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default HomeScreen;
