import axios from 'axios';
import { ErrorCodes } from '../../constants/ErrorCodes';
import { config } from '../../constants/Config';
import useAuthStore from '../../stores/authStore/authStore';
import { TokenResponse } from './axiosInstance.type';
import { UserService } from '../../services/UserService';
import { handleError } from '../handleError';

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
    const storedRefreshToken = useAuthStore.getState().refreshToken;
    
    if (!storedRefreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await UserService.refreshToken(storedRefreshToken);
    

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
        
        const { accessToken } = await refreshToken();
        
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().clearTokens();
        return Promise.reject(refreshError);
      }
    }

    // Pass through the error with response data
    return Promise.reject(error);
  }
);

export default axiosInstance;


