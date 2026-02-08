import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  toast: {
    visible: false,
    message: '',
    type: 'info', // 'success', 'error', 'warning', 'info'
  },
  stats: {
    pendingRepairs: 0,
    inProgressRepairs: 0,
    completedToday: 0,
    revenueToday: 0,
    revenueWeek: 0,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showToast: (state, action) => {
      state.toast = {
        visible: true,
        message: action.payload.message,
        type: action.payload.type || 'info',
      };
    },
    hideToast: state => {
      state.toast.visible = false;
    },
    setStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },
  },
});

export const { setLoading, showToast, hideToast, setStats } = uiSlice.actions;
export default uiSlice.reducer;
