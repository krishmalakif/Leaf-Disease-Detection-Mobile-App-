import axios from 'axios';
import { API_TIMEOUT_MS, API_URL } from '../utils/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchImageHistory = async () => {
  const token = await AsyncStorage.getItem('authToken');
  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await axios.get(`${API_URL}/history`, {
      headers: { Authorization: `Bearer ${token}` },
      timeout: API_TIMEOUT_MS,
    });
    return response.data.images;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch image history');
  }
};
