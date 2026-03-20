import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URLA;

// ── Auth header helper ─────────────────────────────────────────
// Sends the token in the Authorization header as a fallback for
// mobile browsers (Safari ITP) that block cross-site cookies.
const authHeader = () => {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ── Login ──────────────────────────────────────────────────────
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

// ── Logout ─────────────────────────────────────────────────────
export const logoutAdmin = createAsyncThunk(
  "admin/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/logout`,
        {},
        {
          withCredentials: true,
          headers: authHeader(),
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  },
);

// ── Change password ────────────────────────────────────────────
export const changePassword = createAsyncThunk(
  "admin/changePassword",
  async (passwords, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/change-password`,
        passwords,
        {
          headers: {
            "Content-Type": "application/json",
            ...authHeader(),
          },
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

// ── Get current admin (used on refresh to restore session) ─────
export const getCurrentAdmin = createAsyncThunk(
  "admin/getCurrent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/me`, {
        withCredentials: true,
        headers: authHeader(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get admin info",
      );
    }
  },
);

// ── Fetch all admins ───────────────────────────────────────────
export const fetchAllAdmins = createAsyncThunk(
  "admin/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        withCredentials: true,
        headers: authHeader(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch admins",
      );
    }
  },
);

// ── Create admin ───────────────────────────────────────────────
export const createAdmin = createAsyncThunk(
  "admin/create",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users`, adminData, {
        headers: {
          "Content-Type": "application/json",
          ...authHeader(),
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create admin",
      );
    }
  },
);

// ── Update admin ───────────────────────────────────────────────
export const updateAdmin = createAsyncThunk(
  "admin/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/users/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          ...authHeader(),
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update admin",
      );
    }
  },
);

// ── Toggle admin status ────────────────────────────────────────
export const toggleAdminStatus = createAsyncThunk(
  "admin/toggleStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/users/${id}/toggle-status`,
        {},
        {
          withCredentials: true,
          headers: authHeader(),
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle status",
      );
    }
  },
);

// ── Delete admin ───────────────────────────────────────────────
export const deleteAdmin = createAsyncThunk(
  "admin/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/users/${id}`, {
        withCredentials: true,
        headers: authHeader(),
      });
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete admin",
      );
    }
  },
);

// ── Slice ──────────────────────────────────────────────────────
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
      /* -------- Login -------- */
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAdmin = action.payload.admin;
        state.isAuthenticated = true;
        state.error = null;
        // Save token for mobile browsers that block cookies (Safari ITP)
        if (action.payload.token) {
          localStorage.setItem("adminToken", action.payload.token);
        }
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- Logout -------- */
      .addCase(logoutAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.loading = false;
        state.currentAdmin = null;
        state.isAuthenticated = false;
        state.error = null;
        localStorage.removeItem("adminToken");
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- Change Password -------- */
      .addCase(changePassword.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.actionLoading = false;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Get Current Admin -------- */
      .addCase(getCurrentAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAdmin = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(getCurrentAdmin.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.currentAdmin = null;
        // Clear expired or invalid token from storage
        localStorage.removeItem("adminToken");
      })

      /* -------- Fetch All Admins -------- */
      .addCase(fetchAllAdmins.pending, (state) => {
        state.adminsLoading = true;
        state.error = null;
      })
      .addCase(fetchAllAdmins.fulfilled, (state, action) => {
        state.adminsLoading = false;
        state.admins = action.payload;
        state.error = null;
      })
      .addCase(fetchAllAdmins.rejected, (state, action) => {
        state.adminsLoading = false;
        state.error = action.payload;
      })

      /* -------- Create Admin -------- */
      .addCase(createAdmin.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(createAdmin.fulfilled, (state) => {
        state.actionLoading = false;
        state.error = null;
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Update Admin -------- */
      .addCase(updateAdmin.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(updateAdmin.fulfilled, (state) => {
        state.actionLoading = false;
        state.error = null;
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Toggle Status -------- */
      .addCase(toggleAdminStatus.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(toggleAdminStatus.fulfilled, (state) => {
        state.actionLoading = false;
        state.error = null;
      })
      .addCase(toggleAdminStatus.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Delete Admin -------- */
      .addCase(deleteAdmin.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.admins = state.admins.filter((a) => a._id !== action.payload.id);
        state.error = null;
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAdminError, clearCurrentAdmin } = adminSlice.actions;
export default adminSlice.reducer;
