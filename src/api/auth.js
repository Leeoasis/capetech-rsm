import apiClient from './client';

/**
 * Authentication API calls
 */

/**
 * Login user
 * @param {object} credentials - { email, password }
 * @returns {Promise} User data and tokens
 */
export const login = async credentials => {
  const response = await apiClient.post('/auth/login', credentials);
  return response.data;
};

/**
 * Refresh access token
 * @param {string} refreshToken - Refresh token
 * @returns {Promise} New access token
 */
export const refreshToken = async refreshToken => {
  const response = await apiClient.post('/auth/refresh', {
    refresh_token: refreshToken,
  });
  return response.data;
};

/**
 * Logout user
 * @returns {Promise}
 */
export const logout = async () => {
  const response = await apiClient.post('/auth/logout');
  return response.data;
};

/**
 * Get current user
 * @returns {Promise} User data
 */
export const getCurrentUser = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};

export default {
  login,
  refreshToken,
  logout,
  getCurrentUser,
};
