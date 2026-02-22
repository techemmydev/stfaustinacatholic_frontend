import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ADMIN_API_URL = import.meta.env.VITE_API_URLA; // For admin endpoints
const API_URL = import.meta.env.VITE_API_URL;
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

// Fetch all published mass schedules
export const fetchPublishedMassSchedules = createAsyncThunk(
  "massSchedule/fetchPublished",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/mass-schedules`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load mass schedules",
      );
    }
  },
);

// ============ ADMIN ENDPOINTS ============

// Fetch all mass schedules (admin - includes unpublished)
export const fetchAllMassSchedulesAdmin = createAsyncThunk(
  "massSchedule/fetchAllAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ADMIN_API_URL}/mass-schedules`,
        getAuthConfig(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load mass schedules",
      );
    }
  },
);

// Create mass schedule
export const createMassSchedule = createAsyncThunk(
  "massSchedule/create",
  async (scheduleData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${ADMIN_API_URL}/mass-schedules`,
        scheduleData,
        getAuthConfig(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create mass schedule",
      );
    }
  },
);

// Update mass schedule
export const updateMassSchedule = createAsyncThunk(
  "massSchedule/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${ADMIN_API_URL}/mass-schedules/${id}`,
        data,
        getAuthConfig(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update mass schedule",
      );
    }
  },
);

// Toggle publish status
export const toggleMassSchedulePublish = createAsyncThunk(
  "massSchedule/togglePublish",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${ADMIN_API_URL}/mass-schedules/${id}/toggle-publish`,
        {},
        getAuthConfig(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle publish status",
      );
    }
  },
);

// Delete mass schedule
export const deleteMassSchedule = createAsyncThunk(
  "massSchedule/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${ADMIN_API_URL}/mass-schedules/${id}`,
        getAuthConfig(),
      );
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete mass schedule",
      );
    }
  },
);

const massScheduleSlice = createSlice({
  name: "massSchedule",
  initialState: {
    // Public mass schedules (published only)
    publishedSchedules: [],
    // Admin mass schedules (all statuses)
    adminSchedules: [],
    loading: false,
    actionLoading: false,
    error: null,
  },

  reducers: {
    clearMassScheduleError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* -------- Fetch Published Mass Schedules -------- */
      .addCase(fetchPublishedMassSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublishedMassSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.publishedSchedules = action.payload;
      })
      .addCase(fetchPublishedMassSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- Fetch Admin Mass Schedules -------- */
      .addCase(fetchAllMassSchedulesAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMassSchedulesAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminSchedules = action.payload;
      })
      .addCase(fetchAllMassSchedulesAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- Create Mass Schedule -------- */
      .addCase(createMassSchedule.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(createMassSchedule.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.adminSchedules.unshift(action.payload);
      })
      .addCase(createMassSchedule.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Update Mass Schedule -------- */
      .addCase(updateMassSchedule.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(updateMassSchedule.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.adminSchedules.findIndex(
          (schedule) => schedule._id === action.payload._id,
        );
        if (index !== -1) {
          state.adminSchedules[index] = action.payload;
        }
      })
      .addCase(updateMassSchedule.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Toggle Publish -------- */
      .addCase(toggleMassSchedulePublish.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(toggleMassSchedulePublish.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.adminSchedules.findIndex(
          (schedule) => schedule._id === action.payload._id,
        );
        if (index !== -1) {
          state.adminSchedules[index] = action.payload;
        }
      })
      .addCase(toggleMassSchedulePublish.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Delete Mass Schedule -------- */
      .addCase(deleteMassSchedule.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(deleteMassSchedule.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.adminSchedules = state.adminSchedules.filter(
          (schedule) => schedule._id !== action.payload,
        );
      })
      .addCase(deleteMassSchedule.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMassScheduleError } = massScheduleSlice.actions;
export default massScheduleSlice.reducer;
