import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as customersAPI from '../../api/customers';

// Async thunks
export const fetchCustomers = createAsyncThunk(
  'customers/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const data = await customersAPI.getCustomers(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch customers');
    }
  },
);

export const fetchCustomer = createAsyncThunk(
  'customers/fetchOne',
  async (id, { rejectWithValue }) => {
    try {
      const data = await customersAPI.getCustomer(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch customer');
    }
  },
);

export const addCustomer = createAsyncThunk(
  'customers/create',
  async (customerData, { rejectWithValue }) => {
    try {
      const data = await customersAPI.createCustomer(customerData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create customer');
    }
  },
);

export const modifyCustomer = createAsyncThunk(
  'customers/update',
  async ({ id, customerData }, { rejectWithValue }) => {
    try {
      const data = await customersAPI.updateCustomer(id, customerData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update customer');
    }
  },
);

export const removeCustomer = createAsyncThunk(
  'customers/delete',
  async (id, { rejectWithValue }) => {
    try {
      await customersAPI.deleteCustomer(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete customer');
    }
  },
);

const initialState = {
  customers: [],
  currentCustomer: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    totalPages: 1,
    total: 0,
  },
  searchQuery: '',
};

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearCurrentCustomer: state => {
      state.currentCustomer = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch customers
      .addCase(fetchCustomers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload.customers || action.payload.data || action.payload;
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single customer
      .addCase(fetchCustomer.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCustomer = action.payload.customer || action.payload;
      })
      .addCase(fetchCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add customer
      .addCase(addCustomer.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers.unshift(action.payload.customer || action.payload);
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update customer
      .addCase(modifyCustomer.fulfilled, (state, action) => {
        const updated = action.payload.customer || action.payload;
        const index = state.customers.findIndex(c => c.id === updated.id);
        if (index !== -1) {
          state.customers[index] = updated;
        }
        if (state.currentCustomer?.id === updated.id) {
          state.currentCustomer = updated;
        }
      })
      // Delete customer
      .addCase(removeCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter(c => c.id !== action.payload);
        if (state.currentCustomer?.id === action.payload) {
          state.currentCustomer = null;
        }
      });
  },
});

export const { clearError, setSearchQuery, clearCurrentCustomer } = customersSlice.actions;
export default customersSlice.reducer;
