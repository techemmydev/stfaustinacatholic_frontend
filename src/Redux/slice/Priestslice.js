import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const ADMIN_API_URL = import.meta.env.VITE_API_URLA;

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ═══════════════════════════════════════════════════════
//  THUNKS
// ═══════════════════════════════════════════════════════

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

export const fetchPriestsAdmin = createAsyncThunk(
  "priest/fetchAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${ADMIN_API_URL}/fetchpriests`, {
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

export const createPriest = createAsyncThunk(
  "priest/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${ADMIN_API_URL}/createpriest`, data, {
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

export const updatePriest = createAsyncThunk(
  "priest/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${ADMIN_API_URL}/updatepriest/${id}`, data, {
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

export const togglePriestActive = createAsyncThunk(
  "priest/toggle",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${ADMIN_API_URL}/togglepriest/${id}`,
        {},
        { headers: authHeader() },
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to toggle priest",
      );
    }
  },
);

export const deletePriest = createAsyncThunk(
  "priest/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ADMIN_API_URL}/deletepriest/${id}`, {
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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // public fetch
      .addCase(fetchPriests.pending, (s) => {
        s.publicLoading = true;
      })
      .addCase(fetchPriests.fulfilled, (s, a) => {
        s.publicLoading = false;
        s.priests = a.payload;
      })
      .addCase(fetchPriests.rejected, (s, a) => {
        s.publicLoading = false;
        s.publicError = a.payload;
      })

      // admin fetch
      .addCase(fetchPriestsAdmin.pending, (s) => {
        s.adminLoading = true;
      })
      .addCase(fetchPriestsAdmin.fulfilled, (s, a) => {
        s.adminLoading = false;
        s.adminPriests = a.payload;
      })
      .addCase(fetchPriestsAdmin.rejected, (s) => {
        s.adminLoading = false;
      })

      // create
      .addCase(createPriest.pending, (s) => {
        s.actionLoading = true;
      })
      .addCase(createPriest.fulfilled, (s, a) => {
        s.actionLoading = false;
        s.adminPriests.push(a.payload);
      })
      .addCase(createPriest.rejected, (s) => {
        s.actionLoading = false;
      })

      // update
      .addCase(updatePriest.pending, (s) => {
        s.actionLoading = true;
      })
      .addCase(updatePriest.fulfilled, (s, a) => {
        s.actionLoading = false;
        const idx = s.adminPriests.findIndex((p) => p._id === a.payload._id);
        if (idx !== -1) s.adminPriests[idx] = a.payload;
      })
      .addCase(updatePriest.rejected, (s) => {
        s.actionLoading = false;
      })

      // toggle
      .addCase(togglePriestActive.pending, (s) => {
        s.actionLoading = true;
      })
      .addCase(togglePriestActive.fulfilled, (s, a) => {
        s.actionLoading = false;
        const idx = s.adminPriests.findIndex((p) => p._id === a.payload._id);
        if (idx !== -1) s.adminPriests[idx] = a.payload;
      })
      .addCase(togglePriestActive.rejected, (s) => {
        s.actionLoading = false;
      })

      // delete
      .addCase(deletePriest.pending, (s) => {
        s.actionLoading = true;
      })
      .addCase(deletePriest.fulfilled, (s, a) => {
        s.actionLoading = false;
        s.adminPriests = s.adminPriests.filter((p) => p._id !== a.payload);
      })
      .addCase(deletePriest.rejected, (s) => {
        s.actionLoading = false;
      });
  },
});

export default priestSlice.reducer;
