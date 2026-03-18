import axios from 'axios';
import { API_TIMEOUT_MS, API_URL } from '../utils/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const uploadImage = async (imageUri: string) => {
  const token = await AsyncStorage.getItem('authToken');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const formData = new FormData();
  formData.append('leafImage', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'upload.jpg',
  } as { uri: string; type: string; name: string });

  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      timeout: API_TIMEOUT_MS,
    });
    return response.data.prediction;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to upload image');
  }
};
