import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
        headers: { "Content-Type": "application/json" },
        validateStatus: (status) => status >= 200 && status < 300,
      });

      return response.data;
    } catch (error) {
      console.error("Parish Registration Error:", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Registration failed",
      );
    }
  },
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
    selectedDates: {
      dob: null,
      baptismDate: null,
      communionDate: null,
      confirmationDate: null,
      marriageDate: null,
    },
  },

  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },

    setSelectedDate: (state, action) => {
      // Expect action.payload = { key: "dob"|"baptismDate"|..., date: Date }
      const { key, date } = action.payload;
      if (key && date) {
        state.selectedDates[key] = new Date(date).toISOString().split("T")[0];
      } else if (key) {
        state.selectedDates[key] = null;
      }
    },

    clearRegistration: (state) => {
      state.registration = null;
      state.success = false;
      state.error = null;
      state.selectedDates = {
        dob: null,
        baptismDate: null,
        communionDate: null,
        confirmationDate: null,
        marriageDate: null,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createParishRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createParishRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.registration = action.payload;
        state.error = null;
      })
      .addCase(createParishRegistration.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus, clearRegistration, setSelectedDate } =
  parishRegisterSlice.actions;

export default parishRegisterSlice.reducer;
