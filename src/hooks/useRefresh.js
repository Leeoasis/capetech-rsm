import { useState, useCallback } from 'react';

/**
 * Custom hook for pull-to-refresh functionality
 * @param {function} onRefresh - Function to call when refreshing
 * @returns {object} Refresh state and handler
 */
export const useRefresh = onRefresh => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await onRefresh();
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh]);

  return {
    refreshing,
    onRefresh: handleRefresh,
  };
};

export default useRefresh;
