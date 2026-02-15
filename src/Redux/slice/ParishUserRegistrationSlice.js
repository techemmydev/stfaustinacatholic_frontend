import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ FIX: Use separate constants for different endpoints
const AUTH_API_URL = import.meta.env.VITE_API_URL; // For auth/public endpoints
const ADMIN_API_URL = import.meta.env.VITE_API_URLA; // For admin endpoints

/* ==========================
   Async Thunks
========================== */

// Create / register a new parishioner (PUBLIC - uses AUTH_API_URL)
export const createParishRegistration = createAsyncThunk(
  "parishRegister/create",
  async (parishData, { rejectWithValue }) => {
    try {
      console.log("Parish Registration Data:", parishData);

      // ✅ Use AUTH_API_URL for public registration
      const response = await axios.post(
        `${AUTH_API_URL}/registerParishioner`,
        parishData,
        {
          headers: { "Content-Type": "application/json" },
          validateStatus: (status) => status >= 200 && status < 300,
        },
      );

      return response.data;
    } catch (error) {
      console.error("Parish Registration Error:", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Registration failed",
      );
    }
  },
);

// Fetch all parishioners (ADMIN - uses ADMIN_API_URL)
export const fetchParishioners = createAsyncThunk(
  "parishRegister/fetchAll",
  async ({ search = "", page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      // ✅ Use ADMIN_API_URL for admin dashboard
      const response = await axios.get(`${ADMIN_API_URL}/getParishioners`, {
        params: { search, page, limit },
      });
      return response.data;
    } catch (error) {
      console.error("Fetch Parishioners Error:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// Update parishioner (ADMIN - uses ADMIN_API_URL)
export const updateParishioner = createAsyncThunk(
  "parishRegister/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      // ✅ Use ADMIN_API_URL for admin operations
      const response = await axios.patch(
        `${ADMIN_API_URL}/parishioners/${id}`,
        data,
      );
      return response.data;
    } catch (error) {
      console.error("Update Parishioner Error:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// Delete parishioner (ADMIN - uses ADMIN_API_URL)
export const deleteParishioner = createAsyncThunk(
  "parishRegister/delete",
  async (id, { rejectWithValue }) => {
    try {
      // ✅ Use ADMIN_API_URL for admin operations
      await axios.delete(`${ADMIN_API_URL}/parishioners/${id}`);
      return id;
    } catch (error) {
      console.error("Delete Parishioner Error:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// Delete all parishioners (ADMIN - uses ADMIN_API_URL)
export const deleteAllParishioners = createAsyncThunk(
  "parishRegister/deleteAll",
  async (_, { rejectWithValue }) => {
    try {
      // ✅ Use ADMIN_API_URL for admin operations
      await axios.delete(`${ADMIN_API_URL}/parishioners`);
      return [];
    } catch (error) {
      console.error("Delete All Parishioners Error:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
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
    parishioners: [],
    total: 0,
    page: 1,
    limit: 10,
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
      /* ===== Create Parishioner ===== */
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
        // Add new parishioner to list
        state.parishioners.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createParishRegistration.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      /* ===== Fetch All Parishioners ===== */
      .addCase(fetchParishioners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParishioners.fulfilled, (state, action) => {
        state.loading = false;
        state.parishioners = action.payload.parishioners;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchParishioners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== Update Parishioner ===== */
      .addCase(updateParishioner.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateParishioner.fulfilled, (state, action) => {
        state.loading = false;
        state.parishioners = state.parishioners.map((p) =>
          p._id === action.payload._id ? action.payload : p,
        );
      })
      .addCase(updateParishioner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== Delete Parishioner ===== */
      .addCase(deleteParishioner.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteParishioner.fulfilled, (state, action) => {
        state.loading = false;
        state.parishioners = state.parishioners.filter(
          (p) => p._id !== action.payload,
        );
        state.total -= 1;
      })
      .addCase(deleteParishioner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== Delete All Parishioners ===== */
      .addCase(deleteAllParishioners.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAllParishioners.fulfilled, (state) => {
        state.loading = false;
        state.parishioners = [];
        state.total = 0;
      })
      .addCase(deleteAllParishioners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus, clearRegistration, setSelectedDate } =
  parishRegisterSlice.actions;

export default parishRegisterSlice.reducer;
