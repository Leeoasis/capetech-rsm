/**
 * Validation utilities for form inputs
 */

/**
 * Email validation
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = email => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Phone validation (supports various formats)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
export const isValidPhone = phone => {
  if (!phone) return false;
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

/**
 * Required field validation
 * @param {any} value - Value to check
 * @returns {boolean} True if not empty
 */
export const isRequired = value => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

/**
 * Minimum length validation
 * @param {string} value - String to check
 * @param {number} minLength - Minimum length
 * @returns {boolean} True if meets minimum length
 */
export const minLength = (value, minLength) => {
  if (!value) return false;
  return value.length >= minLength;
};

/**
 * Maximum length validation
 * @param {string} value - String to check
 * @param {number} maxLength - Maximum length
 * @returns {boolean} True if within maximum length
 */
export const maxLength = (value, maxLength) => {
  if (!value) return true;
  return value.length <= maxLength;
};

/**
 * Positive number validation
 * @param {number} value - Number to check
 * @returns {boolean} True if positive
 */
export const isPositiveNumber = value => {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0;
};

/**
 * Validate form data
 * @param {object} data - Form data to validate
 * @param {object} rules - Validation rules
 * @returns {object} Errors object
 */
export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const fieldRules = rules[field];
    const value = data[field];
    
    if (fieldRules.required && !isRequired(value)) {
      errors[field] = `${field} is required`;
    } else if (fieldRules.email && value && !isValidEmail(value)) {
      errors[field] = 'Invalid email format';
    } else if (fieldRules.phone && value && !isValidPhone(value)) {
      errors[field] = 'Invalid phone number';
    } else if (fieldRules.minLength && !minLength(value, fieldRules.minLength)) {
      errors[field] = `Minimum ${fieldRules.minLength} characters required`;
    } else if (fieldRules.maxLength && !maxLength(value, fieldRules.maxLength)) {
      errors[field] = `Maximum ${fieldRules.maxLength} characters allowed`;
    } else if (fieldRules.positive && !isPositiveNumber(value)) {
      errors[field] = 'Must be a positive number';
    }
  });
  
  return errors;
};

export default {
  isValidEmail,
  isValidPhone,
  isRequired,
  minLength,
  maxLength,
  isPositiveNumber,
  validateForm,
};
