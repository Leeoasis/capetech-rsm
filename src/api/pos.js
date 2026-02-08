import apiClient from './client';

/**
 * POS API calls
 */

/**
 * Create invoice
 * @param {object} invoiceData - Invoice data
 * @returns {Promise} Created invoice
 */
export const createInvoice = async invoiceData => {
  const response = await apiClient.post('/pos/create_invoice', invoiceData);
  return response.data;
};

/**
 * Process payment
 * @param {object} paymentData - Payment data
 * @returns {Promise} Payment result
 */
export const processPayment = async paymentData => {
  const response = await apiClient.post('/pos/process_payment', paymentData);
  return response.data;
};

/**
 * Get receipt
 * @param {number} id - Receipt/Payment ID
 * @returns {Promise} Receipt data
 */
export const getReceipt = async id => {
  const response = await apiClient.get(`/pos/receipt/${id}`);
  return response.data;
};

export default {
  createInvoice,
  processPayment,
  getReceipt,
};
