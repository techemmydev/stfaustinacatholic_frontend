import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URLA;

// ── Auth header helper ─────────────────────────────────────────
const authHeader = () => {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ── Fetch admin profile ────────────────────────────────────────
export const fetchAdminProfile = createAsyncThunk(
  "adminSettings/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/profile`, {
        withCredentials: true,
        headers: authHeader(),
      });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch profile",
      );
    }
  },
);

// ── Update profile (name, email, notifications, systemConfig) ──
export const updateAdminProfile = createAsyncThunk(
  "adminSettings/updateProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API}/profile`, payload, {
        withCredentials: true,
        headers: authHeader(),
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  },
);

// ── Update password ────────────────────────────────────────────
export const updateAdminPassword = createAsyncThunk(
  "adminSettings/updatePassword",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API}/password`, payload, {
        withCredentials: true,
        headers: authHeader(),
      });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Password update failed",
      );
    }
  },
);

// ── Slice ──────────────────────────────────────────────────────
const adminSettingsSlice = createSlice({
  name: "adminSettings",
  initialState: {
    profile: null,
    loading: false,
    actionLoading: false,
    error: null,
  },
  reducers: {
    clearSettingsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.profile = payload;
      })
      .addCase(fetchAdminProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(updateAdminProfile.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(updateAdminProfile.fulfilled, (state, { payload }) => {
        state.actionLoading = false;
        state.profile = payload;
      })
      .addCase(updateAdminProfile.rejected, (state, { payload }) => {
        state.actionLoading = false;
        state.error = payload;
      })

      .addCase(updateAdminPassword.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(updateAdminPassword.fulfilled, (state) => {
        state.actionLoading = false;
      })
      .addCase(updateAdminPassword.rejected, (state, { payload }) => {
        state.actionLoading = false;
        state.error = payload;
      });
  },
});

// ── Notification selector ──────────────────────────────────────
export const selectNotifications = createSelector(
  (state) => state.appointment?.adminAppointments,
  (state) => state.thanksgiving?.adminThanksgivings,
  (state) => state.testimonial?.adminTestimonials,
  (state) => state.contact?.adminContacts,
  (state) => state.donation?.adminDonations,
  (state) => state.parishRegister?.parishioners,
  (state) => state.adminSettings?.profile?.notifications,

  (
    adminAppointments,
    adminThanksgivings,
    adminTestimonials,
    adminContacts,
    adminDonations,
    parishioners,
    notifications,
  ) => {
    const items = [];

    const pendingApts = (adminAppointments || []).filter(
      (a) => a.status === "pending",
    );
    pendingApts.slice(0, 3).forEach((a) =>
      items.push({
        id: `apt-${a._id}`,
        color: "bg-blue-500",
        message: `New appointment from ${a.name}`,
        sub: a.appointmentType,
        date: a.createdAt,
        link: "/admin/appointments",
      }),
    );
    if (pendingApts.length > 3)
      items.push({
        id: "apt-more",
        color: "bg-blue-300",
        message: `+${pendingApts.length - 3} more pending appointments`,
        date: null,
        link: "/admin/appointments",
      });

    const pendingBooks = (adminThanksgivings || []).filter(
      (t) => t.status === "pending",
    );
    pendingBooks.slice(0, 2).forEach((t) =>
      items.push({
        id: `book-${t._id}`,
        color: "bg-purple-500",
        message: `Mass booking request from ${t.name}`,
        date: t.createdAt,
        link: "/admin/mass-bookings",
      }),
    );

    const pendingRevs = (adminTestimonials || []).filter(
      (r) => r.status === "pending",
    );
    pendingRevs.slice(0, 2).forEach((r) =>
      items.push({
        id: `rev-${r._id}`,
        color: "bg-yellow-500",
        message: `Review awaiting approval from ${r.name}`,
        date: r.createdAt,
        link: "/admin/reviews",
      }),
    );

    const unreadMsgs = (adminContacts || []).filter(
      (c) => c.status === "unread",
    );
    unreadMsgs.slice(0, 2).forEach((c) =>
      items.push({
        id: `msg-${c._id}`,
        color: "bg-pink-500",
        message: `New message from ${c.name}`,
        sub: c.subject,
        date: c.createdAt,
        link: "/admin/contacts",
      }),
    );

    const pendingDonations = (adminDonations || []).filter(
      (d) => d.status === "pending",
    );
    pendingDonations.slice(0, 2).forEach((d) =>
      items.push({
        id: `donation-${d._id}`,
        color: "bg-green-500",
        message: `New donation from ${d.donorName || d.name}`,
        sub: `Amount: ₦${Number(d.amount).toLocaleString()}`,
        date: d.createdAt,
        link: "/admin/donations",
      }),
    );

    const cutoff = Date.now() - 48 * 60 * 60 * 1000;
    const newParishioners = (parishioners || []).filter(
      (p) => new Date(p.createdAt).getTime() > cutoff,
    );
    newParishioners.slice(0, 2).forEach((p) =>
      items.push({
        id: `parish-${p._id}`,
        color: "bg-indigo-500",
        message: `New parishioner registered`,
        sub: p.email,
        date: p.createdAt,
        link: "/admin/parishioners",
      }),
    );

    if (notifications && notifications.emailNotifications === false) {
      items.push({
        id: "notif-email-off",
        color: "bg-gray-400",
        message: "Email notifications are currently disabled",
        sub: "Update in Settings",
        date: null,
        link: "/admin/settings",
      });
    }

    items.sort((a, b) => new Date(b.date) - new Date(a.date));

    return {
      count:
        pendingApts.length +
        pendingBooks.length +
        pendingRevs.length +
        unreadMsgs.length +
        pendingDonations.length +
        newParishioners.length,
      items,
    };
  },
);

export const { clearSettingsError } = adminSettingsSlice.actions;
export default adminSettingsSlice.reducer;
