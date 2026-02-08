/**
 * Application constants
 */

export const API_BASE_URL = 'http://localhost:3000/api/v1';

export const REPAIR_STATUSES = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  WAITING_FOR_PARTS: 'waiting_for_parts',
  COMPLETED: 'completed',
  COLLECTED: 'collected',
  CANCELLED: 'cancelled',
};

export const REPAIR_STATUS_LABELS = {
  [REPAIR_STATUSES.PENDING]: 'Pending',
  [REPAIR_STATUSES.IN_PROGRESS]: 'In Progress',
  [REPAIR_STATUSES.WAITING_FOR_PARTS]: 'Waiting for Parts',
  [REPAIR_STATUSES.COMPLETED]: 'Completed',
  [REPAIR_STATUSES.COLLECTED]: 'Collected',
  [REPAIR_STATUSES.CANCELLED]: 'Cancelled',
};

export const PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};

export const PRIORITY_LABELS = {
  [PRIORITIES.LOW]: 'Low',
  [PRIORITIES.MEDIUM]: 'Medium',
  [PRIORITIES.HIGH]: 'High',
  [PRIORITIES.URGENT]: 'Urgent',
};

export const DEVICE_TYPES = {
  PHONE: 'phone',
  TABLET: 'tablet',
  LAPTOP: 'laptop',
  DESKTOP: 'desktop',
  OTHER: 'other',
};

export const DEVICE_TYPE_LABELS = {
  [DEVICE_TYPES.PHONE]: 'Phone',
  [DEVICE_TYPES.TABLET]: 'Tablet',
  [DEVICE_TYPES.LAPTOP]: 'Laptop',
  [DEVICE_TYPES.DESKTOP]: 'Desktop',
  [DEVICE_TYPES.OTHER]: 'Other',
};

export const PAYMENT_METHODS = {
  CASH: 'cash',
  CARD: 'card',
  BANK_TRANSFER: 'bank_transfer',
};

export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.CASH]: 'Cash',
  [PAYMENT_METHODS.CARD]: 'Card',
  [PAYMENT_METHODS.BANK_TRANSFER]: 'Bank Transfer',
};

export const USER_ROLES = {
  ADMIN: 'admin',
  TECHNICIAN: 'technician',
  CASHIER: 'cashier',
  MANAGER: 'manager',
};

export const USER_ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Administrator',
  [USER_ROLES.TECHNICIAN]: 'Technician',
  [USER_ROLES.CASHIER]: 'Cashier',
  [USER_ROLES.MANAGER]: 'Manager',
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 30,
  MAX_PER_PAGE: 100,
};

export const DEBOUNCE_DELAY = 500;

export default {
  API_BASE_URL,
  REPAIR_STATUSES,
  REPAIR_STATUS_LABELS,
  PRIORITIES,
  PRIORITY_LABELS,
  DEVICE_TYPES,
  DEVICE_TYPE_LABELS,
  PAYMENT_METHODS,
  PAYMENT_METHOD_LABELS,
  USER_ROLES,
  USER_ROLE_LABELS,
  PAGINATION,
  DEBOUNCE_DELAY,
};
