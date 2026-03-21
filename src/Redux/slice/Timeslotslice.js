import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ADMIN_API_URL = import.meta.env.VITE_API_URLA;

// ── Auth header helper ─────────────────────────────────────────
const authHeader = () => {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ─── THUNKS ───────────────────────────────────────────────────

export const fetchSlotsForDate = createAsyncThunk(
  "timeSlot/fetchForDate",
  async (date, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ADMIN_API_URL}/time-slots`, {
        params: { date },
        withCredentials: true,
        headers: authHeader(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch slots",
      );
    }
  },
);

export const createSlot = createAsyncThunk(
  "timeSlot/create",
  async (slotData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${ADMIN_API_URL}/time-slots`,
        slotData,
        {
          withCredentials: true,
          headers: authHeader(),
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create slot",
      );
    }
  },
);

export const createBulkSlots = createAsyncThunk(
  "timeSlot/createBulk",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${ADMIN_API_URL}/time-slots/bulk`,
        payload,
        {
          withCredentials: true,
          headers: authHeader(),
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create slots",
      );
    }
  },
);

export const updateSlot = createAsyncThunk(
  "timeSlot/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${ADMIN_API_URL}/time-slots/${id}`,
        data,
        {
          withCredentials: true,
          headers: authHeader(),
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update slot",
      );
    }
  },
);

export const deleteSlot = createAsyncThunk(
  "timeSlot/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ADMIN_API_URL}/time-slots/${id}`, {
        withCredentials: true,
        headers: authHeader(),
      });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete slot",
      );
    }
  },
);

// ─── SLICE ────────────────────────────────────────────────────

const timeSlotSlice = createSlice({
  name: "timeSlot",
  initialState: {
    slots: [],
    loading: false,
    actionLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* -------- Fetch for date -------- */
      .addCase(fetchSlotsForDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSlotsForDate.fulfilled, (state, action) => {
        state.loading = false;
        state.slots = action.payload;
      })
      .addCase(fetchSlotsForDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- Create single slot -------- */
      .addCase(createSlot.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(createSlot.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.slots.push(action.payload);
      })
      .addCase(createSlot.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Create bulk slots -------- */
      .addCase(createBulkSlots.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(createBulkSlots.fulfilled, (state) => {
        state.actionLoading = false;
      })
      .addCase(createBulkSlots.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Update slot -------- */
      .addCase(updateSlot.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(updateSlot.fulfilled, (state, action) => {
        state.actionLoading = false;
        const idx = state.slots.findIndex((s) => s._id === action.payload._id);
        if (idx !== -1) state.slots[idx] = action.payload;
      })
      .addCase(updateSlot.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Delete slot -------- */
      .addCase(deleteSlot.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(deleteSlot.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.slots = state.slots.filter((s) => s._id !== action.payload);
      })
      .addCase(deleteSlot.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export default timeSlotSlice.reducer;
