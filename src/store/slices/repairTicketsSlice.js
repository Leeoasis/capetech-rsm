import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as repairTicketsAPI from '../../api/repairTickets';

// Async thunks
export const fetchRepairTickets = createAsyncThunk(
  'repairTickets/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const data = await repairTicketsAPI.getRepairTickets(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch repair tickets');
    }
  },
);

export const fetchRepairTicket = createAsyncThunk(
  'repairTickets/fetchOne',
  async (id, { rejectWithValue }) => {
    try {
      const data = await repairTicketsAPI.getRepairTicket(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch repair ticket');
    }
  },
);

export const addRepairTicket = createAsyncThunk(
  'repairTickets/create',
  async (ticketData, { rejectWithValue }) => {
    try {
      const data = await repairTicketsAPI.createRepairTicket(ticketData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create repair ticket');
    }
  },
);

export const modifyRepairTicket = createAsyncThunk(
  'repairTickets/update',
  async ({ id, ticketData }, { rejectWithValue }) => {
    try {
      const data = await repairTicketsAPI.updateRepairTicket(id, ticketData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update repair ticket');
    }
  },
);

export const updateTicketStatus = createAsyncThunk(
  'repairTickets/updateStatus',
  async ({ id, statusData }, { rejectWithValue }) => {
    try {
      const data = await repairTicketsAPI.updateRepairTicketStatus(id, statusData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update status');
    }
  },
);

export const fetchKanbanData = createAsyncThunk(
  'repairTickets/fetchKanban',
  async (params, { rejectWithValue }) => {
    try {
      const data = await repairTicketsAPI.getKanbanData(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch kanban data');
    }
  },
);

export const fetchTicketTimeline = createAsyncThunk(
  'repairTickets/fetchTimeline',
  async (id, { rejectWithValue }) => {
    try {
      const data = await repairTicketsAPI.getRepairTicketTimeline(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch timeline');
    }
  },
);

const initialState = {
  tickets: [],
  kanbanData: null,
  currentTicket: null,
  timeline: [],
  filters: {
    status: null,
    technician: null,
    dateFrom: null,
    dateTo: null,
    priority: null,
  },
  loading: false,
  error: null,
  pagination: {
    page: 1,
    totalPages: 1,
    total: 0,
  },
};

const repairTicketsSlice = createSlice({
  name: 'repairTickets',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: state => {
      state.filters = initialState.filters;
    },
    clearCurrentTicket: state => {
      state.currentTicket = null;
      state.timeline = [];
    },
  },
  extraReducers: builder => {
    builder
      // Fetch repair tickets
      .addCase(fetchRepairTickets.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepairTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload.repair_tickets || action.payload.data || action.payload;
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(fetchRepairTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single repair ticket
      .addCase(fetchRepairTicket.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepairTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTicket = action.payload.repair_ticket || action.payload;
      })
      .addCase(fetchRepairTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add repair ticket
      .addCase(addRepairTicket.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRepairTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets.unshift(action.payload.repair_ticket || action.payload);
      })
      .addCase(addRepairTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update repair ticket
      .addCase(modifyRepairTicket.fulfilled, (state, action) => {
        const updated = action.payload.repair_ticket || action.payload;
        const index = state.tickets.findIndex(t => t.id === updated.id);
        if (index !== -1) {
          state.tickets[index] = updated;
        }
        if (state.currentTicket?.id === updated.id) {
          state.currentTicket = updated;
        }
      })
      // Update status
      .addCase(updateTicketStatus.fulfilled, (state, action) => {
        const updated = action.payload.repair_ticket || action.payload;
        const index = state.tickets.findIndex(t => t.id === updated.id);
        if (index !== -1) {
          state.tickets[index] = updated;
        }
        if (state.currentTicket?.id === updated.id) {
          state.currentTicket = updated;
        }
      })
      // Fetch kanban data
      .addCase(fetchKanbanData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKanbanData.fulfilled, (state, action) => {
        state.loading = false;
        state.kanbanData = action.payload;
      })
      .addCase(fetchKanbanData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch timeline
      .addCase(fetchTicketTimeline.fulfilled, (state, action) => {
        state.timeline = action.payload.timeline || action.payload;
      });
  },
});

export const { clearError, setFilters, clearFilters, clearCurrentTicket } =
  repairTicketsSlice.actions;
export default repairTicketsSlice.reducer;
