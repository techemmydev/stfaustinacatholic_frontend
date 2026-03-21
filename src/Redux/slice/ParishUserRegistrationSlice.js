import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_API_URL = import.meta.env.VITE_API_URL;
const ADMIN_API_URL = import.meta.env.VITE_API_URLA;

// ── Auth header helper ─────────────────────────────────────────
const authHeader = () => {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ── Public: register a new parishioner ────────────────────────
export const createParishRegistration = createAsyncThunk(
  "parishRegister/create",
  async (parishData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${AUTH_API_URL}/registerParishioner`,
        parishData,
        {
          headers: { "Content-Type": "application/json" },
          validateStatus: (status) => status >= 200 && status < 300,
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Registration failed",
      );
    }
  },
);

// ── Admin: fetch all parishioners ─────────────────────────────
export const fetchParishioners = createAsyncThunk(
  "parishRegister/fetchAll",
  async ({ search = "", page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ADMIN_API_URL}/getParishioners`, {
        params: { search, page, limit },
        withCredentials: true,
        headers: authHeader(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// ── Admin: update parishioner ─────────────────────────────────
export const updateParishioner = createAsyncThunk(
  "parishRegister/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${ADMIN_API_URL}/parishioners/${id}`,
        data,
        {
          withCredentials: true,
          headers: authHeader(),
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// ── Admin: delete parishioner ─────────────────────────────────
export const deleteParishioner = createAsyncThunk(
  "parishRegister/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ADMIN_API_URL}/parishioners/${id}`, {
        withCredentials: true,
        headers: authHeader(),
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// ── Admin: delete all parishioners ────────────────────────────
export const deleteAllParishioners = createAsyncThunk(
  "parishRegister/deleteAll",
  async (_, { rejectWithValue }) => {
    try {
      await axios.delete(`${ADMIN_API_URL}/parishioners`, {
        withCredentials: true,
        headers: authHeader(),
      });
      return [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// ── Slice ──────────────────────────────────────────────────────
const parishRegisterSlice = createSlice({
  name: "parishRegister",
  initialState: {
    loading: false,
    success: false,
    error: null,
    registration: null,
    parishioners: [],
    total: 0,
    page: 1,
    limit: 10,
    selectedDates: {
      dob: null,
      baptismDate: null,
      communionDate: null,
      confirmationDate: null,
      marriageDate: null,
    },
  },
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    setSelectedDate: (state, action) => {
      const { key, date } = action.payload;
      if (key && date) {
        state.selectedDates[key] = new Date(date).toISOString().split("T")[0];
      } else if (key) {
        state.selectedDates[key] = null;
      }
    },
    clearRegistration: (state) => {
      state.registration = null;
      state.success = false;
      state.error = null;
      state.selectedDates = {
        dob: null,
        baptismDate: null,
        communionDate: null,
        confirmationDate: null,
        marriageDate: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createParishRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createParishRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.registration = action.payload;
        state.error = null;
        state.parishioners.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createParishRegistration.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      .addCase(fetchParishioners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParishioners.fulfilled, (state, action) => {
        state.loading = false;
        state.parishioners = action.payload.parishioners;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchParishioners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateParishioner.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateParishioner.fulfilled, (state, action) => {
        state.loading = false;
        state.parishioners = state.parishioners.map((p) =>
          p._id === action.payload._id ? action.payload : p,
        );
      })
      .addCase(updateParishioner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteParishioner.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteParishioner.fulfilled, (state, action) => {
        state.loading = false;
        state.parishioners = state.parishioners.filter(
          (p) => p._id !== action.payload,
        );
        state.total -= 1;
      })
      .addCase(deleteParishioner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteAllParishioners.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAllParishioners.fulfilled, (state) => {
        state.loading = false;
        state.parishioners = [];
        state.total = 0;
      })
      .addCase(deleteAllParishioners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus, clearRegistration, setSelectedDate } =
  parishRegisterSlice.actions;

export default parishRegisterSlice.reducer;
