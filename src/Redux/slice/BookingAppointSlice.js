import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const ADMIN_API_URL = import.meta.env.VITE_API_URLA; // For admin endpoints
// ─────────────────────────────────────────────────────────────
// PUBLIC THUNKS
// ─────────────────────────────────────────────────────────────

export const fetchAvailableSlots = createAsyncThunk(
  "appointment/fetchAvailableSlots",
  async (date, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/appointments/${date}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load time slots",
      );
    }
  },
);

export const createAppointment = createAsyncThunk(
  "appointment/create",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/appointment`,
        appointmentData,
        { headers: { "Content-Type": "application/json" } },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

// ─────────────────────────────────────────────────────────────
// ADMIN THUNKS
// ─────────────────────────────────────────────────────────────

export const fetchAllAppointmentsAdmin = createAsyncThunk(
  "appointment/fetchAllAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ADMIN_API_URL}/appointments`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch appointments",
      );
    }
  },
);

export const approveAppointment = createAsyncThunk(
  "appointment/approve",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${ADMIN_API_URL}/appointments/${id}/approve`,
        {},
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to approve appointment",
      );
    }
  },
);

export const rejectAppointment = createAsyncThunk(
  "appointment/reject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${ADMIN_API_URL}/appointments/${id}/reject`,
        {},
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reject appointment",
      );
    }
  },
);

export const deleteAppointment = createAsyncThunk(
  "appointment/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ADMIN_API_URL}/appointments/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete appointment",
      );
    }
  },
);

// ─────────────────────────────────────────────────────────────
// SLICE
// ─────────────────────────────────────────────────────────────

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    // Public booking
    loading: false,
    success: false,
    error: null,
    appointment: null,
    availableSlots: [],
    slotsLoading: false,
    slotsError: null,
    // Admin
    adminAppointments: [],
    adminLoading: false,
    adminError: null,
    actionLoading: false,
  },

  reducers: {
    resetAppointmentState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.appointment = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // ── Fetch Available Slots ──
      .addCase(fetchAvailableSlots.pending, (state) => {
        state.slotsLoading = true;
        state.slotsError = null;
      })
      .addCase(fetchAvailableSlots.fulfilled, (state, action) => {
        state.slotsLoading = false;
        state.availableSlots = action.payload;
      })
      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        state.slotsLoading = false;
        state.slotsError = action.payload;
        state.availableSlots = [];
      })

      // ── Create Appointment (public) ──
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.appointment = action.payload;
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ── Fetch All Admin ──
      .addCase(fetchAllAppointmentsAdmin.pending, (state) => {
        state.adminLoading = true;
        state.adminError = null;
      })
      .addCase(fetchAllAppointmentsAdmin.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminAppointments = action.payload;
      })
      .addCase(fetchAllAppointmentsAdmin.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = action.payload;
      })

      // ── Approve ──
      .addCase(approveAppointment.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(approveAppointment.fulfilled, (state, action) => {
        state.actionLoading = false;
        const updated = action.payload;
        state.adminAppointments = state.adminAppointments.map((a) =>
          a._id === updated._id ? updated : a,
        );
      })
      .addCase(approveAppointment.rejected, (state) => {
        state.actionLoading = false;
      })

      // ── Reject ──
      .addCase(rejectAppointment.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(rejectAppointment.fulfilled, (state, action) => {
        state.actionLoading = false;
        const updated = action.payload;
        state.adminAppointments = state.adminAppointments.map((a) =>
          a._id === updated._id ? updated : a,
        );
      })
      .addCase(rejectAppointment.rejected, (state) => {
        state.actionLoading = false;
      })

      // ── Delete ──
      .addCase(deleteAppointment.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.adminAppointments = state.adminAppointments.filter(
          (a) => a._id !== action.payload,
        );
      })
      .addCase(deleteAppointment.rejected, (state) => {
        state.actionLoading = false;
      });
  },
});

export const { resetAppointmentState } = appointmentSlice.actions;
export default appointmentSlice.reducer;
