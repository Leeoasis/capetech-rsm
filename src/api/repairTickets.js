import apiClient from './client';

/**
 * Repair Ticket API calls
 */

/**
 * Get repair tickets list
 * @param {object} params - Query parameters
 * @returns {Promise} Repair tickets data
 */
export const getRepairTickets = async (params = {}) => {
  const response = await apiClient.get('/repair_tickets', { params });
  return response.data;
};

/**
 * Get repair ticket by ID
 * @param {number} id - Repair ticket ID
 * @returns {Promise} Repair ticket data
 */
export const getRepairTicket = async id => {
  const response = await apiClient.get(`/repair_tickets/${id}`);
  return response.data;
};

/**
 * Create new repair ticket
 * @param {object} ticketData - Repair ticket data
 * @returns {Promise} Created repair ticket
 */
export const createRepairTicket = async ticketData => {
  const response = await apiClient.post('/repair_tickets', ticketData);
  return response.data;
};

/**
 * Update repair ticket
 * @param {number} id - Repair ticket ID
 * @param {object} ticketData - Updated ticket data
 * @returns {Promise} Updated repair ticket
 */
export const updateRepairTicket = async (id, ticketData) => {
  const response = await apiClient.put(`/repair_tickets/${id}`, ticketData);
  return response.data;
};

/**
 * Update repair ticket status
 * @param {number} id - Repair ticket ID
 * @param {object} statusData - { status, notes }
 * @returns {Promise} Updated repair ticket
 */
export const updateRepairTicketStatus = async (id, statusData) => {
  const response = await apiClient.post(`/repair_tickets/${id}/update_status`, statusData);
  return response.data;
};

/**
 * Get repair ticket timeline
 * @param {number} id - Repair ticket ID
 * @returns {Promise} Timeline data
 */
export const getRepairTicketTimeline = async id => {
  const response = await apiClient.get(`/repair_tickets/${id}/timeline`);
  return response.data;
};

/**
 * Get Kanban board data
 * @param {object} params - Query parameters (filters)
 * @returns {Promise} Kanban data grouped by status
 */
export const getKanbanData = async (params = {}) => {
  const response = await apiClient.get('/repair_tickets/kanban', { params });
  return response.data;
};

/**
 * Get repair ticket payments
 * @param {number} id - Repair ticket ID
 * @returns {Promise} Payments data
 */
export const getRepairTicketPayments = async id => {
  const response = await apiClient.get(`/repair_tickets/${id}/payments`);
  return response.data;
};

/**
 * Delete repair ticket
 * @param {number} id - Repair ticket ID
 * @returns {Promise}
 */
export const deleteRepairTicket = async id => {
  const response = await apiClient.delete(`/repair_tickets/${id}`);
  return response.data;
};

export default {
  getRepairTickets,
  getRepairTicket,
  createRepairTicket,
  updateRepairTicket,
  updateRepairTicketStatus,
  getRepairTicketTimeline,
  getKanbanData,
  getRepairTicketPayments,
  deleteRepairTicket,
};
