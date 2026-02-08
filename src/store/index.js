import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import customersReducer from './slices/customersSlice';
import devicesReducer from './slices/devicesSlice';
import repairTicketsReducer from './slices/repairTicketsSlice';
import paymentsReducer from './slices/paymentsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customersReducer,
    devices: devicesReducer,
    repairTickets: repairTicketsReducer,
    payments: paymentsReducer,
    ui: uiReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ['auth/login/fulfilled', 'auth/loadStored/fulfilled'],
      },
    }),
});

export default store;
