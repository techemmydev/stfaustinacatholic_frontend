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

// Fetch all published events
export const fetchPublishedEvents = createAsyncThunk(
  "event/fetchPublished",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/events`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load events",
      );
    }
  },
);

// ============ ADMIN ENDPOINTS ============

// Fetch all events (admin - includes unpublished)
export const fetchAllEventsAdmin = createAsyncThunk(
  "event/fetchAllAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ADMIN_API_URL}/events`,
        getAuthConfig(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load events",
      );
    }
  },
);

// Create event
export const createEvent = createAsyncThunk(
  "event/create",
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${ADMIN_API_URL}/events`,
        eventData,
        getAuthConfig(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create event",
      );
    }
  },
);

// Update event
export const updateEvent = createAsyncThunk(
  "event/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${ADMIN_API_URL}/events/${id}`,
        data,
        getAuthConfig(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update event",
      );
    }
  },
);

// Toggle publish status
export const toggleEventPublish = createAsyncThunk(
  "event/togglePublish",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${ADMIN_API_URL}/events/${id}/toggle-publish`,
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

// Delete event
export const deleteEvent = createAsyncThunk(
  "event/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ADMIN_API_URL}/events/${id}`, getAuthConfig());
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete event",
      );
    }
  },
);

const eventSlice = createSlice({
  name: "event",
  initialState: {
    // Public events (published only)
    publishedEvents: [],
    // Admin events (all statuses)
    adminEvents: [],
    loading: false,
    actionLoading: false,
    error: null,
  },

  reducers: {
    clearEventError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* -------- Fetch Published Events -------- */
      .addCase(fetchPublishedEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublishedEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.publishedEvents = action.payload;
      })
      .addCase(fetchPublishedEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- Fetch Admin Events -------- */
      .addCase(fetchAllEventsAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEventsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminEvents = action.payload;
      })
      .addCase(fetchAllEventsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- Create Event -------- */
      .addCase(createEvent.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.adminEvents.unshift(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Update Event -------- */
      .addCase(updateEvent.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.adminEvents.findIndex(
          (evt) => evt._id === action.payload._id,
        );
        if (index !== -1) {
          state.adminEvents[index] = action.payload;
        }
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Toggle Publish -------- */
      .addCase(toggleEventPublish.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(toggleEventPublish.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.adminEvents.findIndex(
          (evt) => evt._id === action.payload._id,
        );
        if (index !== -1) {
          state.adminEvents[index] = action.payload;
        }
      })
      .addCase(toggleEventPublish.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Delete Event -------- */
      .addCase(deleteEvent.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.adminEvents = state.adminEvents.filter(
          (evt) => evt._id !== action.payload,
        );
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEventError } = eventSlice.actions;
export default eventSlice.reducer;
