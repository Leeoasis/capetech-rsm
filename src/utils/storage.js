import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage utility for managing AsyncStorage operations
 */

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
  REMEMBER_ME: 'rememberMe',
};

/**
 * Save a value to AsyncStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to store (will be JSON stringified)
 */
export const saveItem = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
    return false;
  }
};

/**
 * Get a value from AsyncStorage
 * @param {string} key - Storage key
 * @returns {Promise<any>} Parsed value or null
 */
export const getItem = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error getting ${key}:`, error);
    return null;
  }
};

/**
 * Remove a value from AsyncStorage
 * @param {string} key - Storage key
 */
export const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key}:`, error);
    return false;
  }
};

/**
 * Remove multiple values from AsyncStorage
 * @param {string[]} keys - Array of storage keys
 */
export const removeMultipleItems = async keys => {
  try {
    await AsyncStorage.multiRemove(keys);
    return true;
  } catch (error) {
    console.error('Error removing multiple items:', error);
    return false;
  }
};

/**
 * Clear all AsyncStorage data
 */
export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
};

export default {
  STORAGE_KEYS,
  saveItem,
  getItem,
  removeItem,
  removeMultipleItems,
  clearAll,
};
