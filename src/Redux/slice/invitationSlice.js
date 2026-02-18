import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const ADMIN_API_URL = import.meta.env.VITE_API_URLA; // For admin endpoints
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

// ============ PUBLIC ENDPOINTS (for users) ============

// Submit a new invitation (from public form)
export const submitInvitation = createAsyncThunk(
  "invitation/submit",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/invitations`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit invitation",
      );
    }
  },
);

// ============ ADMIN ENDPOINTS ============

// Fetch all invitations (admin)
export const fetchAllInvitationsAdmin = createAsyncThunk(
  "invitation/fetchAllAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ADMIN_API_URL}/invitations`,
        getAuthConfig(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load invitations",
      );
    }
  },
);

// Accept invitation
export const acceptInvitation = createAsyncThunk(
  "invitation/accept",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${ADMIN_API_URL}/invitations/${id}/accept`,
        {},
        getAuthConfig(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to accept invitation",
      );
    }
  },
);

// Reject invitation
export const rejectInvitation = createAsyncThunk(
  "invitation/reject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${ADMIN_API_URL}/invitations/${id}/reject`,
        {},
        getAuthConfig(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reject invitation",
      );
    }
  },
);

// Delete invitation
export const deleteInvitation = createAsyncThunk(
  "invitation/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ADMIN_API_URL}/invitations/${id}`, getAuthConfig());
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete invitation",
      );
    }
  },
);

const invitationSlice = createSlice({
  name: "invitation",
  initialState: {
    // Admin invitations (all statuses)
    adminInvitations: [],
    loading: false,
    submitting: false,
    actionLoading: false,
    success: false,
    error: null,
  },

  reducers: {
    resetInvitationState: (state) => {
      state.submitting = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* -------- Submit Invitation -------- */
      .addCase(submitInvitation.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(submitInvitation.fulfilled, (state) => {
        state.submitting = false;
        state.success = true;
      })
      .addCase(submitInvitation.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      })

      /* -------- Fetch Admin Invitations -------- */
      .addCase(fetchAllInvitationsAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllInvitationsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminInvitations = action.payload;
      })
      .addCase(fetchAllInvitationsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- Accept Invitation -------- */
      .addCase(acceptInvitation.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(acceptInvitation.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.adminInvitations.findIndex(
          (inv) => inv._id === action.payload._id,
        );
        if (index !== -1) {
          state.adminInvitations[index] = action.payload;
        }
      })
      .addCase(acceptInvitation.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Reject Invitation -------- */
      .addCase(rejectInvitation.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(rejectInvitation.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.adminInvitations.findIndex(
          (inv) => inv._id === action.payload._id,
        );
        if (index !== -1) {
          state.adminInvitations[index] = action.payload;
        }
      })
      .addCase(rejectInvitation.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Delete Invitation -------- */
      .addCase(deleteInvitation.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(deleteInvitation.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.adminInvitations = state.adminInvitations.filter(
          (inv) => inv._id !== action.payload,
        );
      })
      .addCase(deleteInvitation.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetInvitationState } = invitationSlice.actions;
export default invitationSlice.reducer;
