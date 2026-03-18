// src/screens/UploadScreen.tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { uploadImage } from '../services/uploadService';
import { useAlert } from '../context/AlertContext'; // Import the custom alert context

const UploadScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { showSuccessAlert, showErrorAlert } = useAlert(); // Destructure alert functions

  const handleChooseImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      if (response.didCancel || response.errorCode || !response.assets || !response.assets[0].uri) {
        showErrorAlert('Image selection canceled or failed.');
        return;
      }

      const imageUri = response.assets[0].uri;
      await handleUpload(imageUri);
    });
  };

  const handleUpload = async (imageUri: string) => {
    try {
      setLoading(true);

      // Use uploadImage service function to upload and get prediction
      const prediction = await uploadImage(imageUri);
      setLoading(false);

      const { plantName, diseaseName, treatment } = prediction;
      showSuccessAlert(`Plant: ${plantName}\nDisease: ${diseaseName}\nTreatment: ${treatment}`);
    } catch (error) {
      setLoading(false);
      showErrorAlert(error.message || 'An error occurred during upload.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Image</Text>
      <Button title="Choose Image" onPress={handleChooseImage} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20, color: 'black' },
});

export default UploadScreen;
