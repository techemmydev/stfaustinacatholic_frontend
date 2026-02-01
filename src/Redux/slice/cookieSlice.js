import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchCookieConsent = createAsyncThunk(
  "cookie/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/cookies`);
      return response.data.consent;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch consent",
      );
    }
  },
);

export const saveCookieConsent = createAsyncThunk(
  "cookie/save",
  async (consent, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/cookies`, { consent });
      return consent;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to save consent",
      );
    }
  },
);

const cookieSlice = createSlice({
  name: "cookie",
  initialState: {
    consent: null, // null = not yet decided, "accepted" or "rejected"
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      /* -------- Fetch: Pending -------- */
      .addCase(fetchCookieConsent.pending, (state) => {
        state.loading = true;
      })
      /* -------- Fetch: Fulfilled -------- */
      .addCase(fetchCookieConsent.fulfilled, (state, action) => {
        state.loading = false;
        state.consent = action.payload;
      })
      /* -------- Fetch: Rejected -------- */
      .addCase(fetchCookieConsent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- Save: Pending -------- */
      .addCase(saveCookieConsent.pending, (state) => {
        state.loading = true;
      })
      /* -------- Save: Fulfilled -------- */
      .addCase(saveCookieConsent.fulfilled, (state, action) => {
        state.loading = false;
        state.consent = action.payload;
      })
      /* -------- Save: Rejected -------- */
      .addCase(saveCookieConsent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cookieSlice.reducer;
