import axios from 'axios';
import { ErrorCodes } from '../../constants/ErrorCodes';
import { config } from '../../constants/Config';
import useAuthStore from '../../stores/authStore/authStore';
import { TokenResponse } from './axiosInstance.type';
import { UserService } from '../../services/UserService';
import { handleError } from '../handleError';
import { Alert } from 'react-native';

const axiosInstance = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: (status) => {
    return status >= 200 && status < 300;
  },
});

const refreshToken = async (): Promise<TokenResponse> => {
  try {
    const refreshToken = useAuthStore.getState().refreshToken;
    // console.log('Refreshing token',refreshToken);
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await UserService.refreshToken(refreshToken);

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    useAuthStore.getState().setTokens(accessToken, newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    useAuthStore.getState().clearTokens();
    throw handleError(error);
  }
};

axiosInstance.interceptors.request.use(
  async (requestConfig) => {
    if (requestConfig.isAuth === false) {
      return requestConfig;
    }

    const token = useAuthStore.getState().accessToken;
    if (!token) {
      return Promise.reject(new Error('Authentication token not found'));
    }

    if (requestConfig.headers) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    return requestConfig;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {

    if (!error.config) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    
    // Handle token refresh
    if (error.response?.status === ErrorCodes.UNAUTHORIZED || error.response?.status === ErrorCodes.FORBIDDEN && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // console.log('Refreshing token');
        const { accessToken } = await refreshToken();
        // console.log('Token refreshed',accessToken);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        // console.log('token refreshed');
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Clear tokens on refresh failure
        Alert.alert('Error', 'Failed to refresh token');
        useAuthStore.getState().clearTokens();
        return Promise.reject(refreshError);
      }
    }

    // Pass through the error with response data
    return Promise.reject(error);
  }
);

export default axiosInstance;


