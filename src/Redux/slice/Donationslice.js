import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const ADMIN_API_URL = import.meta.env.VITE_API_URLA;

// ── Auth header helper ─────────────────────────────────────────
const authHeader = () => {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ── Public: initialize payment ────────────────────────────────
export const initializeDonation = createAsyncThunk(
  "donation/initialize",
  async (donationData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/donations/initialize`,
        donationData,
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to initialize payment.",
      );
    }
  },
);

// ── Public: verify payment ────────────────────────────────────
export const verifyDonation = createAsyncThunk(
  "donation/verify",
  async (reference, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/donations/verify/${reference}`,
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Verification failed.",
      );
    }
  },
);

// ── Admin: fetch all donations ────────────────────────────────
export const fetchAllDonationsAdmin = createAsyncThunk(
  "donation/fetchAllAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${ADMIN_API_URL}/donations/initialize`,
        {
          withCredentials: true,
          headers: authHeader(),
        },
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load donations.",
      );
    }
  },
);

// ── Admin: fetch stats ────────────────────────────────────────
export const fetchDonationStats = createAsyncThunk(
  "donation/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${ADMIN_API_URL}/donations/stats`, {
        withCredentials: true,
        headers: authHeader(),
      });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load stats.",
      );
    }
  },
);

// ── Admin: delete donation ────────────────────────────────────
export const deleteDonation = createAsyncThunk(
  "donation/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ADMIN_API_URL}/donations/${id}`, {
        withCredentials: true,
        headers: authHeader(),
      });
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete donation.",
      );
    }
  },
);

// ── Slice ─────────────────────────────────────────────────────
const donationSlice = createSlice({
  name: "donation",
  initialState: {
    currentReference: null,
    initLoading: false,
    verifyLoading: false,
    verifiedDonation: null,
    adminDonations: [],
    stats: null,
    adminLoading: false,
    error: null,
  },
  reducers: {
    clearDonationError(state) {
      state.error = null;
    },
    clearVerifiedDonation(state) {
      state.verifiedDonation = null;
      state.currentReference = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeDonation.pending, (state) => {
        state.initLoading = true;
        state.error = null;
      })
      .addCase(initializeDonation.fulfilled, (state, action) => {
        state.initLoading = false;
        state.currentReference = action.payload.reference;
      })
      .addCase(initializeDonation.rejected, (state, action) => {
        state.initLoading = false;
        state.error = action.payload;
      })

      .addCase(verifyDonation.pending, (state) => {
        state.verifyLoading = true;
        state.error = null;
      })
      .addCase(verifyDonation.fulfilled, (state, action) => {
        state.verifyLoading = false;
        state.verifiedDonation = action.payload.donation;
      })
      .addCase(verifyDonation.rejected, (state, action) => {
        state.verifyLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchAllDonationsAdmin.pending, (state) => {
        state.adminLoading = true;
        state.error = null;
      })
      .addCase(fetchAllDonationsAdmin.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminDonations = action.payload;
      })
      .addCase(fetchAllDonationsAdmin.rejected, (state, action) => {
        state.adminLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchDonationStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })

      .addCase(deleteDonation.fulfilled, (state, action) => {
        state.adminDonations = state.adminDonations.filter(
          (d) => d._id !== action.payload,
        );
      });
  },
});

export const { clearDonationError, clearVerifiedDonation } =
  donationSlice.actions;
export default donationSlice.reducer;
