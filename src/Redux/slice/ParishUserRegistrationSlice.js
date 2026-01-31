import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ API URL
const API_URL = import.meta.env.VITE_API_URL;

/* ==========================
   Async Thunk
========================== */
export const createParishRegistration = createAsyncThunk(
  "parishRegister/create",
  async (parishData, { rejectWithValue }) => {
    try {
      console.log("Parish Registration Data:", parishData);

      const response = await axios.post(`${API_URL}/register`, parishData, {
        headers: {
          "Content-Type": "application/json",
        },
        // ✅ IMPORTANT: allow 201 as success
        validateStatus: (status) => status >= 200 && status < 300,
      });

      return response.data; // backend response
    } catch (error) {
      console.error("Parish Registration Error:", error);

      return rejectWithValue(
        error.response?.data?.message || error.message || "Registration failed"
      );
    }
  }
);

/* ==========================
   Slice
========================== */
const parishRegisterSlice = createSlice({
  name: "parishRegister",
  initialState: {
    loading: false,
    success: false,
    error: null,
    registration: null,
  },

  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    clearRegistration: (state) => {
      state.registration = null;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* -------- Pending -------- */
      .addCase(createParishRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      /* -------- Fulfilled -------- */
      .addCase(createParishRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.registration = action.payload;
        state.error = null;
      })

      /* -------- Rejected -------- */
      .addCase(createParishRegistration.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus, clearRegistration } = parishRegisterSlice.actions;

export default parishRegisterSlice.reducer;
