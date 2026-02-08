import apiClient from './client';

/**
 * Payment API calls
 */

/**
 * Create payment
 * @param {object} paymentData - Payment data
 * @returns {Promise} Created payment
 */
export const createPayment = async paymentData => {
  const response = await apiClient.post('/payments', paymentData);
  return response.data;
};

/**
 * Get payment by ID
 * @param {number} id - Payment ID
 * @returns {Promise} Payment data
 */
export const getPayment = async id => {
  const response = await apiClient.get(`/payments/${id}`);
  return response.data;
};

/**
 * Get payments list
 * @param {object} params - Query parameters
 * @returns {Promise} Payments data
 */
export const getPayments = async (params = {}) => {
  const response = await apiClient.get('/payments', { params });
  return response.data;
};

export default {
  createPayment,
  getPayment,
  getPayments,
};
