import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const ADMIN_API_URL = import.meta.env.VITE_API_URLA;

// ── Auth header helper ─────────────────────────────────────────
const authHeader = () => {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ═══════════════════════════════════════════════════════
//  SERMON THUNKS
// ═══════════════════════════════════════════════════════

export const fetchSermons = createAsyncThunk(
  "sermon/fetchPublic",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/sermons`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch sermons",
      );
    }
  },
);

export const fetchSermonsAdmin = createAsyncThunk(
  "sermon/fetchAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${ADMIN_API_URL}/sermons`, {
        withCredentials: true,
        headers: authHeader(),
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch sermons",
      );
    }
  },
);

export const createSermon = createAsyncThunk(
  "sermon/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${ADMIN_API_URL}/sermons`, data, {
        withCredentials: true,
        headers: authHeader(),
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create sermon",
      );
    }
  },
);

export const updateSermon = createAsyncThunk(
  "sermon/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${ADMIN_API_URL}/sermons/${id}`, data, {
        withCredentials: true,
        headers: authHeader(),
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update sermon",
      );
    }
  },
);

export const toggleSermonPublished = createAsyncThunk(
  "sermon/toggle",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${ADMIN_API_URL}/sermons/${id}/toggle`,
        {},
        {
          withCredentials: true,
          headers: authHeader(),
        },
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to toggle sermon",
      );
    }
  },
);

export const deleteSermon = createAsyncThunk(
  "sermon/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ADMIN_API_URL}/sermons/${id}`, {
        withCredentials: true,
        headers: authHeader(),
      });
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete sermon",
      );
    }
  },
);

// ═══════════════════════════════════════════════════════
//  GALLERY THUNKS
// ═══════════════════════════════════════════════════════

export const fetchPhotos = createAsyncThunk(
  "sermon/fetchPhotosPublic",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/gallery`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch photos",
      );
    }
  },
);

export const fetchPhotosAdmin = createAsyncThunk(
  "sermon/fetchPhotosAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${ADMIN_API_URL}/gallery`, {
        withCredentials: true,
        headers: authHeader(),
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch photos",
      );
    }
  },
);

export const createPhoto = createAsyncThunk(
  "sermon/createPhoto",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${ADMIN_API_URL}/gallery`, data, {
        withCredentials: true,
        headers: authHeader(),
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add photo",
      );
    }
  },
);

export const updatePhoto = createAsyncThunk(
  "sermon/updatePhoto",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${ADMIN_API_URL}/gallery/${id}`, data, {
        withCredentials: true,
        headers: authHeader(),
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update photo",
      );
    }
  },
);

export const togglePhotoPublished = createAsyncThunk(
  "sermon/togglePhoto",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${ADMIN_API_URL}/gallery/${id}/toggle`,
        {},
        {
          withCredentials: true,
          headers: authHeader(),
        },
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to toggle photo",
      );
    }
  },
);

export const deletePhoto = createAsyncThunk(
  "sermon/deletePhoto",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ADMIN_API_URL}/gallery/${id}`, {
        withCredentials: true,
        headers: authHeader(),
      });
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete photo",
      );
    }
  },
);

// ═══════════════════════════════════════════════════════
//  SLICE
// ═══════════════════════════════════════════════════════

const sermonSlice = createSlice({
  name: "sermon",
  initialState: {
    sermons: [],
    photos: [],
    publicLoading: false,
    publicError: null,
    adminSermons: [],
    adminSermonsLoading: false,
    adminPhotos: [],
    adminPhotosLoading: false,
    actionLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSermons.pending, (state) => {
        state.publicLoading = true;
      })
      .addCase(fetchSermons.fulfilled, (state, action) => {
        state.publicLoading = false;
        state.sermons = action.payload;
      })
      .addCase(fetchSermons.rejected, (state, action) => {
        state.publicLoading = false;
        state.publicError = action.payload;
      })

      .addCase(fetchPhotos.pending, (state) => {
        state.publicLoading = true;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.publicLoading = false;
        state.photos = action.payload;
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.publicLoading = false;
        state.publicError = action.payload;
      })

      .addCase(fetchSermonsAdmin.pending, (state) => {
        state.adminSermonsLoading = true;
      })
      .addCase(fetchSermonsAdmin.fulfilled, (state, action) => {
        state.adminSermonsLoading = false;
        state.adminSermons = action.payload;
      })
      .addCase(fetchSermonsAdmin.rejected, (state) => {
        state.adminSermonsLoading = false;
      })

      .addCase(createSermon.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(createSermon.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.adminSermons.unshift(action.payload);
      })
      .addCase(createSermon.rejected, (state) => {
        state.actionLoading = false;
      })

      .addCase(updateSermon.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(updateSermon.fulfilled, (state, action) => {
        state.actionLoading = false;
        const idx = state.adminSermons.findIndex(
          (s) => s._id === action.payload._id,
        );
        if (idx !== -1) state.adminSermons[idx] = action.payload;
      })
      .addCase(updateSermon.rejected, (state) => {
        state.actionLoading = false;
      })

      .addCase(toggleSermonPublished.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(toggleSermonPublished.fulfilled, (state, action) => {
        state.actionLoading = false;
        const idx = state.adminSermons.findIndex(
          (s) => s._id === action.payload._id,
        );
        if (idx !== -1) state.adminSermons[idx] = action.payload;
      })
      .addCase(toggleSermonPublished.rejected, (state) => {
        state.actionLoading = false;
      })

      .addCase(deleteSermon.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(deleteSermon.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.adminSermons = state.adminSermons.filter(
          (s) => s._id !== action.payload,
        );
      })
      .addCase(deleteSermon.rejected, (state) => {
        state.actionLoading = false;
      })

      .addCase(fetchPhotosAdmin.pending, (state) => {
        state.adminPhotosLoading = true;
      })
      .addCase(fetchPhotosAdmin.fulfilled, (state, action) => {
        state.adminPhotosLoading = false;
        state.adminPhotos = action.payload;
      })
      .addCase(fetchPhotosAdmin.rejected, (state) => {
        state.adminPhotosLoading = false;
      })

      .addCase(createPhoto.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(createPhoto.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.adminPhotos.unshift(action.payload);
      })
      .addCase(createPhoto.rejected, (state) => {
        state.actionLoading = false;
      })

      .addCase(updatePhoto.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.actionLoading = false;
        const idx = state.adminPhotos.findIndex(
          (p) => p._id === action.payload._id,
        );
        if (idx !== -1) state.adminPhotos[idx] = action.payload;
      })
      .addCase(updatePhoto.rejected, (state) => {
        state.actionLoading = false;
      })

      .addCase(togglePhotoPublished.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(togglePhotoPublished.fulfilled, (state, action) => {
        state.actionLoading = false;
        const idx = state.adminPhotos.findIndex(
          (p) => p._id === action.payload._id,
        );
        if (idx !== -1) state.adminPhotos[idx] = action.payload;
      })
      .addCase(togglePhotoPublished.rejected, (state) => {
        state.actionLoading = false;
      })

      .addCase(deletePhoto.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.adminPhotos = state.adminPhotos.filter(
          (p) => p._id !== action.payload,
        );
      })
      .addCase(deletePhoto.rejected, (state) => {
        state.actionLoading = false;
      });
  },
});

export default sermonSlice.reducer;
