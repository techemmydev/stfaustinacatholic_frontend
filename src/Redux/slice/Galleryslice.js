import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const ADMIN_API_URL = import.meta.env.VITE_API_URLA; // For admin endpoints

// ── Public thunk ─────────────────────────────────────────────────
/** GET /api/gallery  — published photos only */
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

// ── Admin thunks ─────────────────────────────────────────────────
/** GET /api/admin/gallery  — all photos (published + unpublished) */
export const fetchGalleryPhotosAdmin = createAsyncThunk(
  "gallery/fetchPhotosAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${ADMIN_API_URL}/gallery`);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load gallery.",
      );
    }
  },
);

/** POST /api/admin/gallery  — add a photo */
export const createGalleryPhoto = createAsyncThunk(
  "gallery/createPhoto",
  async (photoData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${ADMIN_API_URL}/gallery`, photoData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create photo.",
      );
    }
  },
);

/** PUT /api/admin/gallery/:id  — update a photo */
export const updateGalleryPhoto = createAsyncThunk(
  "gallery/updatePhoto",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${ADMIN_API_URL}/gallery/${id}`,
        updates,
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update photo.",
      );
    }
  },
);

/** PATCH /api/admin/gallery/:id/toggle  — toggle published */
export const toggleGalleryPhotoPublished = createAsyncThunk(
  "gallery/togglePublished",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${ADMIN_API_URL}/gallery/${id}/toggle`,
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to toggle photo.",
      );
    }
  },
);

/** DELETE /api/admin/gallery/:id  — delete a photo */
export const deleteGalleryPhoto = createAsyncThunk(
  "gallery/deletePhoto",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ADMIN_API_URL}/gallery/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete photo.",
      );
    }
  },
);

// ── Slice ─────────────────────────────────────────────────────────
const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    photos: [], // public-facing photos
    adminPhotos: [], // admin list (all)
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
    // ── fetchGalleryPhotos (public) ──────────────────────────────
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
      });

    // ── fetchGalleryPhotosAdmin ──────────────────────────────────
    builder
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
      });

    // ── createGalleryPhoto ───────────────────────────────────────
    builder
      .addCase(createGalleryPhoto.fulfilled, (state, action) => {
        state.adminPhotos.unshift(action.payload);
        if (action.payload.isPublished) {
          state.photos.unshift(action.payload);
        }
      })
      .addCase(createGalleryPhoto.rejected, (state, action) => {
        state.error = action.payload;
      });

    // ── updateGalleryPhoto ───────────────────────────────────────
    builder
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
      });

    // ── toggleGalleryPhotoPublished ──────────────────────────────
    builder.addCase(toggleGalleryPhotoPublished.fulfilled, (state, action) => {
      const toggled = action.payload;
      state.adminPhotos = state.adminPhotos.map((p) =>
        p._id === toggled._id ? toggled : p,
      );
      // add or remove from public list
      if (toggled.isPublished) {
        if (!state.photos.find((p) => p._id === toggled._id)) {
          state.photos.unshift(toggled);
        }
      } else {
        state.photos = state.photos.filter((p) => p._id !== toggled._id);
      }
    });

    // ── deleteGalleryPhoto ───────────────────────────────────────
    builder.addCase(deleteGalleryPhoto.fulfilled, (state, action) => {
      const deletedId = action.payload;
      state.adminPhotos = state.adminPhotos.filter((p) => p._id !== deletedId);
      state.photos = state.photos.filter((p) => p._id !== deletedId);
    });
  },
});

export const { clearGalleryError } = gallerySlice.actions;
export default gallerySlice.reducer;
