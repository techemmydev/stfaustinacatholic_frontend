import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const ADMIN_API_URL = import.meta.env.VITE_API_URLA;

// ── Auth header helper ─────────────────────────────────────────
// Reads adminToken (not "token") — must match what adminSlice saves
const authHeader = () => {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ═══════════════════════════════════════════════════════
//  THUNKS
// ═══════════════════════════════════════════════════════

// ── Public ────────────────────────────────────────────────────
export const fetchPriests = createAsyncThunk(
  "priest/fetchPublic",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/priests`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch priests",
      );
    }
  },
);

// ── Admin: fetch all ──────────────────────────────────────────
export const fetchPriestsAdmin = createAsyncThunk(
  "priest/fetchAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${ADMIN_API_URL}/fetchpriests`, {
        withCredentials: true,
        headers: authHeader(),
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch priests",
      );
    }
  },
);

// ── Admin: create ─────────────────────────────────────────────
export const createPriest = createAsyncThunk(
  "priest/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${ADMIN_API_URL}/createpriest`, data, {
        withCredentials: true,
        headers: authHeader(),
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create priest",
      );
    }
  },
);

// ── Admin: update ─────────────────────────────────────────────
export const updatePriest = createAsyncThunk(
  "priest/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${ADMIN_API_URL}/updatepriest/${id}`, data, {
        withCredentials: true,
        headers: authHeader(),
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update priest",
      );
    }
  },
);

// ── Admin: toggle active ──────────────────────────────────────
export const togglePriestActive = createAsyncThunk(
  "priest/toggle",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${ADMIN_API_URL}/togglepriest/${id}`,
        {},
        {
          withCredentials: true,
          headers: authHeader(),
        },
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to toggle priest",
      );
    }
  },
);

// ── Admin: delete ─────────────────────────────────────────────
export const deletePriest = createAsyncThunk(
  "priest/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ADMIN_API_URL}/deletepriest/${id}`, {
        withCredentials: true,
        headers: authHeader(),
      });
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete priest",
      );
    }
  },
);

// ═══════════════════════════════════════════════════════
//  SLICE
// ═══════════════════════════════════════════════════════

const priestSlice = createSlice({
  name: "priest",
  initialState: {
    priests: [], // public
    publicLoading: false,
    publicError: null,
    adminPriests: [], // admin
    adminLoading: false,
    actionLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* -------- Public fetch -------- */
      .addCase(fetchPriests.pending, (state) => {
        state.publicLoading = true;
        state.publicError = null;
      })
      .addCase(fetchPriests.fulfilled, (state, action) => {
        state.publicLoading = false;
        state.priests = action.payload;
      })
      .addCase(fetchPriests.rejected, (state, action) => {
        state.publicLoading = false;
        state.publicError = action.payload;
      })

      /* -------- Admin fetch -------- */
      .addCase(fetchPriestsAdmin.pending, (state) => {
        state.adminLoading = true;
        state.error = null;
      })
      .addCase(fetchPriestsAdmin.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminPriests = action.payload;
      })
      .addCase(fetchPriestsAdmin.rejected, (state, action) => {
        state.adminLoading = false;
        state.error = action.payload;
      })

      /* -------- Create -------- */
      .addCase(createPriest.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(createPriest.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.adminPriests.push(action.payload);
      })
      .addCase(createPriest.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Update -------- */
      .addCase(updatePriest.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(updatePriest.fulfilled, (state, action) => {
        state.actionLoading = false;
        const idx = state.adminPriests.findIndex(
          (p) => p._id === action.payload._id,
        );
        if (idx !== -1) state.adminPriests[idx] = action.payload;
      })
      .addCase(updatePriest.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Toggle active -------- */
      .addCase(togglePriestActive.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(togglePriestActive.fulfilled, (state, action) => {
        state.actionLoading = false;
        const idx = state.adminPriests.findIndex(
          (p) => p._id === action.payload._id,
        );
        if (idx !== -1) state.adminPriests[idx] = action.payload;
      })
      .addCase(togglePriestActive.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Delete -------- */
      .addCase(deletePriest.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(deletePriest.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.adminPriests = state.adminPriests.filter(
          (p) => p._id !== action.payload,
        );
      })
      .addCase(deletePriest.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export default priestSlice.reducer;
