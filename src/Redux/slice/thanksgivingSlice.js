import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const ADMIN_API_URL = import.meta.env.VITE_API_URLA;

// Helper to get auth token
const getAuthConfig = () => {
  const token = localStorage.getItem("adminToken");
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

// ============ PUBLIC ENDPOINTS ============

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

// ============ ADMIN ENDPOINTS ============

// Fetch all thanksgivings (admin)
export const fetchAllThanksgivingsAdmin = createAsyncThunk(
  "thanksgiving/fetchAllAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ADMIN_API_URL}/thanksgivings`,
        getAuthConfig(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load thanksgivings",
      );
    }
  },
);

// Approve thanksgiving
export const approveThanksgiving = createAsyncThunk(
  "thanksgiving/approve",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${ADMIN_API_URL}/thanksgivings/${id}/approve`,
        {},
        getAuthConfig(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to approve thanksgiving",
      );
    }
  },
);

// Reject thanksgiving
export const rejectThanksgiving = createAsyncThunk(
  "thanksgiving/reject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${ADMIN_API_URL}/thanksgivings/${id}/reject`,
        {},
        getAuthConfig(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reject thanksgiving",
      );
    }
  },
);

// Delete thanksgiving
export const deleteThanksgiving = createAsyncThunk(
  "thanksgiving/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${ADMIN_API_URL}/thanksgivings/${id}`,
        getAuthConfig(),
      );
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete thanksgiving",
      );
    }
  },
);

const thanksgivingSlice = createSlice({
  name: "thanksgiving",
  initialState: {
    // Public data
    masses: [],
    // Admin data
    adminThanksgivings: [],
    loading: false,
    submitting: false,
    actionLoading: false,
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
      /* -------- Fetch Masses -------- */
      .addCase(fetchMasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMasses.fulfilled, (state, action) => {
        state.loading = false;
        state.masses = action.payload;
      })
      .addCase(fetchMasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- Submit Thanksgiving -------- */
      .addCase(submitThanksgiving.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(submitThanksgiving.fulfilled, (state) => {
        state.submitting = false;
        state.success = true;
      })
      .addCase(submitThanksgiving.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      })

      /* -------- Fetch Admin Thanksgivings -------- */
      .addCase(fetchAllThanksgivingsAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllThanksgivingsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminThanksgivings = action.payload;
      })
      .addCase(fetchAllThanksgivingsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- Approve Thanksgiving -------- */
      .addCase(approveThanksgiving.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(approveThanksgiving.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.adminThanksgivings.findIndex(
          (t) => t._id === action.payload._id,
        );
        if (index !== -1) {
          state.adminThanksgivings[index] = action.payload;
        }
      })
      .addCase(approveThanksgiving.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Reject Thanksgiving -------- */
      .addCase(rejectThanksgiving.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(rejectThanksgiving.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.adminThanksgivings.findIndex(
          (t) => t._id === action.payload._id,
        );
        if (index !== -1) {
          state.adminThanksgivings[index] = action.payload;
        }
      })
      .addCase(rejectThanksgiving.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Delete Thanksgiving -------- */
      .addCase(deleteThanksgiving.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(deleteThanksgiving.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.adminThanksgivings = state.adminThanksgivings.filter(
          (t) => t._id !== action.payload,
        );
      })
      .addCase(deleteThanksgiving.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetThanksgivingState } = thanksgivingSlice.actions;
export default thanksgivingSlice.reducer;
