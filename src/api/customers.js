import apiClient from './client';

/**
 * Customer API calls
 */

/**
 * Get customers list
 * @param {object} params - Query parameters (page, search, etc.)
 * @returns {Promise} Customers data
 */
export const getCustomers = async (params = {}) => {
  const response = await apiClient.get('/customers', { params });
  return response.data;
};

/**
 * Get customer by ID
 * @param {number} id - Customer ID
 * @returns {Promise} Customer data
 */
export const getCustomer = async id => {
  const response = await apiClient.get(`/customers/${id}`);
  return response.data;
};

/**
 * Create new customer
 * @param {object} customerData - Customer data
 * @returns {Promise} Created customer
 */
export const createCustomer = async customerData => {
  const response = await apiClient.post('/customers', customerData);
  return response.data;
};

/**
 * Update customer
 * @param {number} id - Customer ID
 * @param {object} customerData - Updated customer data
 * @returns {Promise} Updated customer
 */
export const updateCustomer = async (id, customerData) => {
  const response = await apiClient.put(`/customers/${id}`, customerData);
  return response.data;
};

/**
 * Delete customer
 * @param {number} id - Customer ID
 * @returns {Promise}
 */
export const deleteCustomer = async id => {
  const response = await apiClient.delete(`/customers/${id}`);
  return response.data;
};

/**
 * Get customer's devices
 * @param {number} id - Customer ID
 * @returns {Promise} Devices data
 */
export const getCustomerDevices = async id => {
  const response = await apiClient.get(`/customers/${id}/devices`);
  return response.data;
};

/**
 * Get customer's repair tickets
 * @param {number} id - Customer ID
 * @returns {Promise} Repair tickets data
 */
export const getCustomerRepairTickets = async id => {
  const response = await apiClient.get(`/customers/${id}/repair_tickets`);
  return response.data;
};

export default {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerDevices,
  getCustomerRepairTickets,
};
