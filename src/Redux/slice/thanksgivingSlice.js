import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Fetch all masses
export const fetchMasses = createAsyncThunk(
  "thanksgiving/fetchMasses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/masses`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load masses",
      );
    }
  },
);

// Submit thanksgiving booking
export const submitThanksgiving = createAsyncThunk(
  "thanksgiving/submit",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/thanksgiving`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit thanksgiving",
      );
    }
  },
);

const thanksgivingSlice = createSlice({
  name: "thanksgiving",
  initialState: {
    masses: [],
    loading: false,
    submitting: false,
    success: false,
    error: null,
  },

  reducers: {
    resetThanksgivingState: (state) => {
      state.submitting = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* -------- Fetch Masses: Pending -------- */
      .addCase(fetchMasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      /* -------- Fetch Masses: Fulfilled -------- */
      .addCase(fetchMasses.fulfilled, (state, action) => {
        state.loading = false;
        state.masses = action.payload;
      })
      /* -------- Fetch Masses: Rejected -------- */
      .addCase(fetchMasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- Submit: Pending -------- */
      .addCase(submitThanksgiving.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      /* -------- Submit: Fulfilled -------- */
      .addCase(submitThanksgiving.fulfilled, (state) => {
        state.submitting = false;
        state.success = true;
      })
      /* -------- Submit: Rejected -------- */
      .addCase(submitThanksgiving.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      });
  },
});

export const { resetThanksgivingState } = thanksgivingSlice.actions;
export default thanksgivingSlice.reducer;
