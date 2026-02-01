import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Async thunk to fetch available time slots for a date
 */
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

/**
 * Async thunk to create appointment
 */
export const createAppointment = createAsyncThunk(
  "appointment/create",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/appointment`,
        appointmentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          validateStatus: (status) => status >= 200 && status < 300,
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    loading: false,
    success: false,
    error: null,
    appointment: null,
    availableSlots: [],
    slotsLoading: false,
    slotsError: null,
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
      /* -------- Fetch Slots: Pending -------- */
      .addCase(fetchAvailableSlots.pending, (state) => {
        state.slotsLoading = true;
        state.slotsError = null;
      })
      /* -------- Fetch Slots: Fulfilled -------- */
      .addCase(fetchAvailableSlots.fulfilled, (state, action) => {
        state.slotsLoading = false;
        state.availableSlots = action.payload;
      })
      /* -------- Fetch Slots: Rejected -------- */
      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        state.slotsLoading = false;
        state.slotsError = action.payload;
        state.availableSlots = [];
      })

      /* -------- Create Appointment: Pending -------- */
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      /* -------- Create Appointment: Fulfilled -------- */
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.appointment = action.payload;
      })
      /* -------- Create Appointment: Rejected -------- */
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAppointmentState } = appointmentSlice.actions;

export default appointmentSlice.reducer;
