import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URLA;

// Login admin
export const loginAdmin = createAsyncThunk(
  "admin/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

// Logout admin
export const logoutAdmin = createAsyncThunk(
  "admin/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/logout`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  },
);

export const changePassword = createAsyncThunk(
  "admin/changePassword",
  async (passwords, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/admin/change-password`,
        passwords,
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to change password",
      );
    }
  },
);

// Get current admin
export const getCurrentAdmin = createAsyncThunk(
  "admin/getCurrent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/me`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get admin info",
      );
    }
  },
);

// Get all admins
export const fetchAllAdmins = createAsyncThunk(
  "admin/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch admins",
      );
    }
  },
);

// Create admin
export const createAdmin = createAsyncThunk(
  "admin/create",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users`, adminData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create admin",
      );
    }
  },
);

// Update admin
export const updateAdmin = createAsyncThunk(
  "admin/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/users/${id}`, data, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update admin",
      );
    }
  },
);

// Toggle admin status
export const toggleAdminStatus = createAsyncThunk(
  "admin/toggleStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/admin/users/${id}/toggle-status`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle status",
      );
    }
  },
);

// Delete admin
export const deleteAdmin = createAsyncThunk(
  "admin/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/users/${id}`);
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete admin",
      );
    }
  },
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    currentAdmin: null,
    admins: [],
    isAuthenticated: false,
    loading: false,
    adminsLoading: false,
    actionLoading: false,
    error: null,
  },

  reducers: {
    resetAdminError: (state) => {
      state.error = null;
    },
    clearCurrentAdmin: (state) => {
      state.currentAdmin = null;
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {
    builder
      /* -------- Login: Pending -------- */
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      /* -------- Login: Fulfilled -------- */
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAdmin = action.payload.admin;
        state.isAuthenticated = true;
        state.error = null; // Clear any errors on success
      })
      /* -------- Login: Rejected -------- */
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- Logout: Pending -------- */
      .addCase(logoutAdmin.pending, (state) => {
        state.loading = true;
      })
      /* -------- Logout: Fulfilled -------- */
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.loading = false;
        state.currentAdmin = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      /* -------- Logout: Rejected -------- */
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- Change Password: Pending -------- */
      .addCase(changePassword.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      /* -------- Change Password: Fulfilled -------- */
      .addCase(changePassword.fulfilled, (state) => {
        state.actionLoading = false;
        state.error = null;
      })
      /* -------- Change Password: Rejected -------- */
      .addCase(changePassword.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Get Current Admin: Pending -------- */
      .addCase(getCurrentAdmin.pending, (state) => {
        state.loading = true;
      })
      /* -------- Get Current Admin: Fulfilled -------- */
      .addCase(getCurrentAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAdmin = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      /* -------- Get Current Admin: Rejected -------- */
      .addCase(getCurrentAdmin.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.currentAdmin = null;
      })

      /* -------- Fetch All Admins: Pending -------- */
      .addCase(fetchAllAdmins.pending, (state) => {
        state.adminsLoading = true;
        state.error = null; // Clear previous errors
      })
      /* -------- Fetch All Admins: Fulfilled -------- */
      .addCase(fetchAllAdmins.fulfilled, (state, action) => {
        state.adminsLoading = false;
        state.admins = action.payload;
        state.error = null;
      })
      /* -------- Fetch All Admins: Rejected -------- */
      .addCase(fetchAllAdmins.rejected, (state, action) => {
        state.adminsLoading = false;
        state.error = action.payload;
      })

      /* -------- Create Admin: Pending -------- */
      .addCase(createAdmin.pending, (state) => {
        state.actionLoading = true;
        state.error = null; // Clear previous errors
      })
      /* -------- Create Admin: Fulfilled -------- */
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.error = null;
        // Will refetch the list after creation
      })
      /* -------- Create Admin: Rejected -------- */
      .addCase(createAdmin.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Update Admin: Pending -------- */
      .addCase(updateAdmin.pending, (state) => {
        state.actionLoading = true;
        state.error = null; // Clear previous errors
      })
      /* -------- Update Admin: Fulfilled -------- */
      .addCase(updateAdmin.fulfilled, (state) => {
        state.actionLoading = false;
        state.error = null;
      })
      /* -------- Update Admin: Rejected -------- */
      .addCase(updateAdmin.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Toggle Status: Pending -------- */
      .addCase(toggleAdminStatus.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      /* -------- Toggle Status: Fulfilled -------- */
      .addCase(toggleAdminStatus.fulfilled, (state) => {
        state.actionLoading = false;
        state.error = null;
      })
      /* -------- Toggle Status: Rejected -------- */
      .addCase(toggleAdminStatus.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Delete Admin: Pending -------- */
      .addCase(deleteAdmin.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      /* -------- Delete Admin: Fulfilled -------- */
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.admins = state.admins.filter((a) => a._id !== action.payload.id);
        state.error = null;
      })
      /* -------- Delete Admin: Rejected -------- */
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAdminError, clearCurrentAdmin } = adminSlice.actions;
export default adminSlice.reducer;
