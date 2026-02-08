import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as paymentsAPI from '../../api/payments';

// Async thunks
export const addPayment = createAsyncThunk(
  'payments/create',
  async (paymentData, { rejectWithValue }) => {
    try {
      const data = await paymentsAPI.createPayment(paymentData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create payment');
    }
  },
);

export const fetchPayment = createAsyncThunk(
  'payments/fetchOne',
  async (id, { rejectWithValue }) => {
    try {
      const data = await paymentsAPI.getPayment(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch payment');
    }
  },
);

export const fetchPayments = createAsyncThunk(
  'payments/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const data = await paymentsAPI.getPayments(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch payments');
    }
  },
);

const initialState = {
  payments: [],
  currentPayment: null,
  loading: false,
  error: null,
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearCurrentPayment: state => {
      state.currentPayment = null;
    },
  },
  extraReducers: builder => {
    builder
      // Add payment
      .addCase(addPayment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payments.unshift(action.payload.payment || action.payload);
        state.currentPayment = action.payload.payment || action.payload;
      })
      .addCase(addPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch payment
      .addCase(fetchPayment.fulfilled, (state, action) => {
        state.currentPayment = action.payload.payment || action.payload;
      })
      // Fetch payments
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.payments = action.payload.payments || action.payload.data || action.payload;
      });
  },
});

export const { clearError, clearCurrentPayment } = paymentsSlice.actions;
export default paymentsSlice.reducer;
