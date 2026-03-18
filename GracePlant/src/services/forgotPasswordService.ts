import axios from 'axios';
import { API_TIMEOUT_MS, API_URL } from '../utils/config';

export const sendPasswordResetEmail = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email }, { timeout: API_TIMEOUT_MS });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to send password reset email.');
  }
};

export const resetPassword = async (data: { resetCode: string; newPassword: string }) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, data, { timeout: API_TIMEOUT_MS });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Password reset failed.');
  }
};
