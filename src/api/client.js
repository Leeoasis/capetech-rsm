import axios from 'axios';
import { REACT_APP_API_URL } from '@env';
import { getItem, saveItem, removeMultipleItems, STORAGE_KEYS } from '../utils/storage';

const API_BASE_URL = REACT_APP_API_URL || 'http://localhost:3000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  async config => {
    const token = await getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor - handle token refresh
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await getItem(STORAGE_KEYS.REFRESH_TOKEN);
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refresh_token: refreshToken,
          });

          await saveItem(STORAGE_KEYS.ACCESS_TOKEN, data.access_token);
          if (data.refresh_token) {
            await saveItem(STORAGE_KEYS.REFRESH_TOKEN, data.refresh_token);
          }

          originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          // Refresh failed, clear tokens and redirect to login
          await removeMultipleItems([
            STORAGE_KEYS.ACCESS_TOKEN,
            STORAGE_KEYS.REFRESH_TOKEN,
            STORAGE_KEYS.USER,
          ]);
          // Navigation to login will be handled by the app
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
