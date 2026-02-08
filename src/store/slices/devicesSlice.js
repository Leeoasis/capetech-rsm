import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as devicesAPI from '../../api/devices';

// Async thunks
export const fetchDevices = createAsyncThunk(
  'devices/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const data = await devicesAPI.getDevices(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch devices');
    }
  },
);

export const fetchDevice = createAsyncThunk(
  'devices/fetchOne',
  async (id, { rejectWithValue }) => {
    try {
      const data = await devicesAPI.getDevice(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch device');
    }
  },
);

export const addDevice = createAsyncThunk(
  'devices/create',
  async (deviceData, { rejectWithValue }) => {
    try {
      const data = await devicesAPI.createDevice(deviceData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create device');
    }
  },
);

export const modifyDevice = createAsyncThunk(
  'devices/update',
  async ({ id, deviceData }, { rejectWithValue }) => {
    try {
      const data = await devicesAPI.updateDevice(id, deviceData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update device');
    }
  },
);

const initialState = {
  devices: [],
  currentDevice: null,
  loading: false,
  error: null,
};

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearCurrentDevice: state => {
      state.currentDevice = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch devices
      .addCase(fetchDevices.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.loading = false;
        state.devices = action.payload.devices || action.payload.data || action.payload;
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single device
      .addCase(fetchDevice.fulfilled, (state, action) => {
        state.currentDevice = action.payload.device || action.payload;
      })
      // Add device
      .addCase(addDevice.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDevice.fulfilled, (state, action) => {
        state.loading = false;
        state.devices.unshift(action.payload.device || action.payload);
      })
      .addCase(addDevice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update device
      .addCase(modifyDevice.fulfilled, (state, action) => {
        const updated = action.payload.device || action.payload;
        const index = state.devices.findIndex(d => d.id === updated.id);
        if (index !== -1) {
          state.devices[index] = updated;
        }
        if (state.currentDevice?.id === updated.id) {
          state.currentDevice = updated;
        }
      });
  },
});

export const { clearError, clearCurrentDevice } = devicesSlice.actions;
export default devicesSlice.reducer;
