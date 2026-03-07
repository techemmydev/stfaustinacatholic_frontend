import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const ADMIN_API_URL = import.meta.env.VITE_API_URLA;

// ── Public ──────────────────────────────────────────────────────────────────

export const submitContactForm = createAsyncThunk(
  "contact/submit",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/contact`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send message",
      );
    }
  },
);

// ── Admin ───────────────────────────────────────────────────────────────────

export const fetchAllContactsAdmin = createAsyncThunk(
  "contact/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${ADMIN_API_URL}/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch contacts",
      );
    }
  },
);

export const markContactAsRead = createAsyncThunk(
  "contact/markAsRead",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${ADMIN_API_URL}/contact/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark as read",
      );
    }
  },
);

export const markContactAsResponded = createAsyncThunk(
  "contact/markAsResponded",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${ADMIN_API_URL}/contact/${id}/responded`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark as responded",
      );
    }
  },
);

export const deleteContact = createAsyncThunk(
  "contact/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${ADMIN_API_URL}/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete message",
      );
    }
  },
);

// ── Slice ────────────────────────────────────────────────────────────────────

const contactsSlice = createSlice({
  name: "contact",
  initialState: {
    // public
    loading: false,
    success: false,
    error: null,
    // admin
    adminContacts: [],
    adminLoading: false,
    adminError: null,
    actionLoading: false,
  },
  reducers: {
    resetContactState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // submit
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch all (admin)
      .addCase(fetchAllContactsAdmin.pending, (state) => {
        state.adminLoading = true;
        state.adminError = null;
      })
      .addCase(fetchAllContactsAdmin.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminContacts = action.payload;
      })
      .addCase(fetchAllContactsAdmin.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = action.payload;
      })

      // mark as read
      .addCase(markContactAsRead.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(markContactAsRead.fulfilled, (state, action) => {
        state.actionLoading = false;
        const idx = state.adminContacts.findIndex(
          (c) => c._id === action.payload._id,
        );
        if (idx !== -1) state.adminContacts[idx] = action.payload;
      })
      .addCase(markContactAsRead.rejected, (state) => {
        state.actionLoading = false;
      })

      // mark as responded
      .addCase(markContactAsResponded.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(markContactAsResponded.fulfilled, (state, action) => {
        state.actionLoading = false;
        const idx = state.adminContacts.findIndex(
          (c) => c._id === action.payload._id,
        );
        if (idx !== -1) state.adminContacts[idx] = action.payload;
      })
      .addCase(markContactAsResponded.rejected, (state) => {
        state.actionLoading = false;
      })

      // delete
      .addCase(deleteContact.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.adminContacts = state.adminContacts.filter(
          (c) => c._id !== action.payload,
        );
      })
      .addCase(deleteContact.rejected, (state) => {
        state.actionLoading = false;
      });
  },
});

export const { resetContactState } = contactsSlice.actions;
export default contactsSlice.reducer;
