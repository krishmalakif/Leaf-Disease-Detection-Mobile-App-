import axios from 'axios';
import { API_TIMEOUT_MS, API_URL } from '../utils/config';

const toFriendlyError = (error: any, fallbackMessage: string) => {
  if (axios.isAxiosError(error)) {
    const responseMessage = error.response?.data?.msg || error.response?.data?.message;
    if (responseMessage) {
      return responseMessage;
    }

    if (error.code === 'ECONNABORTED') {
      return 'Request timed out while contacting the backend.';
    }

    if (error.message === 'Network Error') {
      return `Unable to reach the backend at ${API_URL}. Make sure Metro can reach the same machine that is running Docker.`;
    }
  }

  return fallbackMessage;
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, { timeout: API_TIMEOUT_MS });
    return response.data.token;
  } catch (error: any) {
    throw new Error(toFriendlyError(error, 'An error occurred. Please try again later.'));
  }
};

export const registerUser = async (user: { name: string; email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/register`, user, { timeout: API_TIMEOUT_MS });
    return response.data;
  } catch (error: any) {
    throw new Error(toFriendlyError(error, 'Registration failed. Please try again.'));
  }
};

export const resetPassword = async (data: { email: string; currentPassword: string; newPassword: string }) => {
  try {
    return await axios.post(`${API_URL}/reset`, data, { timeout: API_TIMEOUT_MS });
  } catch (error: any) {
    throw new Error(toFriendlyError(error, 'Password reset failed. Please try again.'));
  }
};
