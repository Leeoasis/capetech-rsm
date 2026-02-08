import apiClient from './client';

/**
 * Device API calls
 */

/**
 * Get devices list
 * @param {object} params - Query parameters
 * @returns {Promise} Devices data
 */
export const getDevices = async (params = {}) => {
  const response = await apiClient.get('/devices', { params });
  return response.data;
};

/**
 * Get device by ID
 * @param {number} id - Device ID
 * @returns {Promise} Device data
 */
export const getDevice = async id => {
  const response = await apiClient.get(`/devices/${id}`);
  return response.data;
};

/**
 * Create new device
 * @param {object} deviceData - Device data
 * @returns {Promise} Created device
 */
export const createDevice = async deviceData => {
  const response = await apiClient.post('/devices', deviceData);
  return response.data;
};

/**
 * Update device
 * @param {number} id - Device ID
 * @param {object} deviceData - Updated device data
 * @returns {Promise} Updated device
 */
export const updateDevice = async (id, deviceData) => {
  const response = await apiClient.put(`/devices/${id}`, deviceData);
  return response.data;
};

/**
 * Delete device
 * @param {number} id - Device ID
 * @returns {Promise}
 */
export const deleteDevice = async id => {
  const response = await apiClient.delete(`/devices/${id}`);
  return response.data;
};

export default {
  getDevices,
  getDevice,
  createDevice,
  updateDevice,
  deleteDevice,
};
