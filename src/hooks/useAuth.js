import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { logout } from '../store/slices/authSlice';

/**
 * Custom hook for authentication
 * @returns {object} Auth state and methods
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, accessToken, isAuthenticated, loading, error } = useSelector(
    state => state.auth,
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return {
    user,
    accessToken,
    isAuthenticated,
    loading,
    error,
    logout: handleLogout,
  };
};

export default useAuth;
