import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { CapturedImage } from '../services/imageService';
import { useAlert } from '../context/AlertContext';

const CameraScreen: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const { showSuccessAlert, showErrorAlert } = useAlert();

  const handleCapture = useCallback(
    async (base64Image: string) => {
      try {
        const result = await CapturedImage(base64Image);
        showSuccessAlert(`Plant: ${result.plantName}\nDisease: ${result.diseaseName}\nTreatment: ${result.treatment}`);
      } catch {
        showErrorAlert('Failed to capture the image.');
      }
    },
    [showErrorAlert, showSuccessAlert],
  );

  const openCamera = useCallback(() => {
    launchCamera({ mediaType: 'photo', includeBase64: true, saveToPhotos: true, quality: 1 }, (response) => {
      if (response.didCancel || response.errorMessage || !response.assets?.[0]?.uri || !response.assets?.[0]?.base64) {
        return;
      }

      setPhoto(response.assets[0].uri);
      handleCapture(response.assets[0].base64);
    });
  }, [handleCapture]);

  useEffect(() => {
    openCamera();
  }, [openCamera]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera</Text>
      {photo && <Image source={{ uri: photo }} style={styles.previewImage} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 20, color: 'black' },
  previewImage: { width: 300, height: 300, marginTop: 20, borderRadius: 10, borderColor: 'black', borderWidth: 1 },
});

export default CameraScreen;
