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

// Fetch all active masses (for public booking)
export const fetchActiveMasses = createAsyncThunk(
  "mass/fetchActive",
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

// ============ ADMIN ENDPOINTS ============

// Fetch all masses (admin - includes inactive)
export const fetchAllMassesAdmin = createAsyncThunk(
  "mass/fetchAllAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ADMIN_API_URL}/masses`,
        getAuthConfig(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load masses",
      );
    }
  },
);

// Create mass
export const createMass = createAsyncThunk(
  "mass/create",
  async (massData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${ADMIN_API_URL}/masses`,
        massData,
        getAuthConfig(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create mass",
      );
    }
  },
);

// Create bulk masses
export const createBulkMasses = createAsyncThunk(
  "mass/createBulk",
  async (massesData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${ADMIN_API_URL}/masses/bulk`,
        massesData,
        getAuthConfig(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create masses",
      );
    }
  },
);

// Update mass
export const updateMass = createAsyncThunk(
  "mass/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${ADMIN_API_URL}/masses/${id}`,
        data,
        getAuthConfig(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update mass",
      );
    }
  },
);

// Toggle mass status
export const toggleMassStatus = createAsyncThunk(
  "mass/toggleStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${ADMIN_API_URL}/masses/${id}/toggle-status`,
        {},
        getAuthConfig(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle mass status",
      );
    }
  },
);

// Delete mass
export const deleteMass = createAsyncThunk(
  "mass/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ADMIN_API_URL}/masses/${id}`, getAuthConfig());
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete mass",
      );
    }
  },
);

const massSlice = createSlice({
  name: "mass",
  initialState: {
    // Public masses (active only)
    activeMasses: [],
    // Admin masses (all)
    adminMasses: [],
    loading: false,
    actionLoading: false,
    error: null,
  },

  reducers: {
    clearMassError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* -------- Fetch Active Masses -------- */
      .addCase(fetchActiveMasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveMasses.fulfilled, (state, action) => {
        state.loading = false;
        state.activeMasses = action.payload;
      })
      .addCase(fetchActiveMasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- Fetch Admin Masses -------- */
      .addCase(fetchAllMassesAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMassesAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminMasses = action.payload;
      })
      .addCase(fetchAllMassesAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- Create Mass -------- */
      .addCase(createMass.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(createMass.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.adminMasses.push(action.payload);
      })
      .addCase(createMass.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Create Bulk Masses -------- */
      .addCase(createBulkMasses.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(createBulkMasses.fulfilled, (state) => {
        state.actionLoading = false;
      })
      .addCase(createBulkMasses.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Update Mass -------- */
      .addCase(updateMass.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(updateMass.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.adminMasses.findIndex(
          (m) => m._id === action.payload._id,
        );
        if (index !== -1) {
          state.adminMasses[index] = action.payload;
        }
      })
      .addCase(updateMass.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Toggle Mass Status -------- */
      .addCase(toggleMassStatus.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(toggleMassStatus.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.adminMasses.findIndex(
          (m) => m._id === action.payload._id,
        );
        if (index !== -1) {
          state.adminMasses[index] = action.payload;
        }
      })
      .addCase(toggleMassStatus.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Delete Mass -------- */
      .addCase(deleteMass.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(deleteMass.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.adminMasses = state.adminMasses.filter(
          (m) => m._id !== action.payload,
        );
      })
      .addCase(deleteMass.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMassError } = massSlice.actions;
export default massSlice.reducer;
