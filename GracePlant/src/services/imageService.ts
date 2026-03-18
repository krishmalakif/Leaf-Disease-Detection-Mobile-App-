import axios from 'axios';
import { API_TIMEOUT_MS, API_URL } from '../utils/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CapturedImage = async (base64Image: string) => {
  const token = await AsyncStorage.getItem('authToken');
  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await axios.post(
      `${API_URL}/capture`,
      { image: base64Image },
      {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        timeout: API_TIMEOUT_MS,
      },
    );
    return response.data.prediction;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to capture image');
  }
};
