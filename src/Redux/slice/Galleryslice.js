import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const ADMIN_API_URL = import.meta.env.VITE_API_URLA;

// ── Auth header helper ─────────────────────────────────────────
const authHeader = () => {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ── Public ────────────────────────────────────────────────────
export const fetchGalleryPhotos = createAsyncThunk(
  "gallery/fetchPhotos",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/gallery`);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load gallery.",
      );
    }
  },
);

// ── Admin ─────────────────────────────────────────────────────
export const fetchGalleryPhotosAdmin = createAsyncThunk(
  "gallery/fetchPhotosAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${ADMIN_API_URL}/gallery`, {
        withCredentials: true,
        headers: authHeader(),
      });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load gallery.",
      );
    }
  },
);

export const createGalleryPhoto = createAsyncThunk(
  "gallery/createPhoto",
  async (photoData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${ADMIN_API_URL}/gallery`, photoData, {
        withCredentials: true,
        headers: authHeader(),
      });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create photo.",
      );
    }
  },
);

export const updateGalleryPhoto = createAsyncThunk(
  "gallery/updatePhoto",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${ADMIN_API_URL}/gallery/${id}`,
        updates,
        {
          withCredentials: true,
          headers: authHeader(),
        },
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update photo.",
      );
    }
  },
);

export const toggleGalleryPhotoPublished = createAsyncThunk(
  "gallery/togglePublished",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${ADMIN_API_URL}/gallery/${id}/toggle`,
        {},
        {
          withCredentials: true,
          headers: authHeader(),
        },
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to toggle photo.",
      );
    }
  },
);

export const deleteGalleryPhoto = createAsyncThunk(
  "gallery/deletePhoto",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ADMIN_API_URL}/gallery/${id}`, {
        withCredentials: true,
        headers: authHeader(),
      });
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete photo.",
      );
    }
  },
);

// ── Slice ─────────────────────────────────────────────────────
const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    photos: [],
    adminPhotos: [],
    publicLoading: false,
    adminLoading: false,
    error: null,
  },
  reducers: {
    clearGalleryError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGalleryPhotos.pending, (state) => {
        state.publicLoading = true;
        state.error = null;
      })
      .addCase(fetchGalleryPhotos.fulfilled, (state, action) => {
        state.publicLoading = false;
        state.photos = action.payload;
      })
      .addCase(fetchGalleryPhotos.rejected, (state, action) => {
        state.publicLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchGalleryPhotosAdmin.pending, (state) => {
        state.adminLoading = true;
        state.error = null;
      })
      .addCase(fetchGalleryPhotosAdmin.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminPhotos = action.payload;
      })
      .addCase(fetchGalleryPhotosAdmin.rejected, (state, action) => {
        state.adminLoading = false;
        state.error = action.payload;
      })

      .addCase(createGalleryPhoto.fulfilled, (state, action) => {
        state.adminPhotos.unshift(action.payload);
        if (action.payload.isPublished) {
          state.photos.unshift(action.payload);
        }
      })
      .addCase(createGalleryPhoto.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(updateGalleryPhoto.fulfilled, (state, action) => {
        const updated = action.payload;
        state.adminPhotos = state.adminPhotos.map((p) =>
          p._id === updated._id ? updated : p,
        );
        state.photos = state.photos.map((p) =>
          p._id === updated._id ? updated : p,
        );
      })
      .addCase(updateGalleryPhoto.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(toggleGalleryPhotoPublished.fulfilled, (state, action) => {
        const toggled = action.payload;
        state.adminPhotos = state.adminPhotos.map((p) =>
          p._id === toggled._id ? toggled : p,
        );
        if (toggled.isPublished) {
          if (!state.photos.find((p) => p._id === toggled._id)) {
            state.photos.unshift(toggled);
          }
        } else {
          state.photos = state.photos.filter((p) => p._id !== toggled._id);
        }
      })

      .addCase(deleteGalleryPhoto.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.adminPhotos = state.adminPhotos.filter(
          (p) => p._id !== deletedId,
        );
        state.photos = state.photos.filter((p) => p._id !== deletedId);
      });
  },
});

export const { clearGalleryError } = gallerySlice.actions;
export default gallerySlice.reducer;
