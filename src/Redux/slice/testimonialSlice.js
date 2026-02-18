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

// ============ PUBLIC ENDPOINTS (for parishioners) ============

// Fetch all approved testimonials (for public display)
export const fetchTestimonials = createAsyncThunk(
  "testimonial/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ADMIN_API_URL}/testimonials`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load testimonials",
      );
    }
  },
);

// Submit a new testimonial (from public form)
export const submitTestimonial = createAsyncThunk(
  "testimonial/submit",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/testimonials`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit testimonial",
      );
    }
  },
);

// ============ ADMIN ENDPOINTS ============

// Fetch all testimonials (admin - includes pending, approved, rejected)
export const fetchAllTestimonialsAdmin = createAsyncThunk(
  "testimonial/fetchAllAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ADMIN_API_URL}/testimonials`,
        getAuthConfig(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load testimonials",
      );
    }
  },
);

// Approve testimonial
export const approveTestimonial = createAsyncThunk(
  "testimonial/approve",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${ADMIN_API_URL}/testimonials/${id}/approve`,
        {},
        getAuthConfig(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to approve testimonial",
      );
    }
  },
);

// Reject testimonial
export const rejectTestimonial = createAsyncThunk(
  "testimonial/reject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${ADMIN_API_URL}/testimonials/${id}/reject`,
        {},
        getAuthConfig(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reject testimonial",
      );
    }
  },
);

// Delete testimonial
export const deleteTestimonial = createAsyncThunk(
  "testimonial/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${ADMIN_API_URL}/testimonials/${id}`,
        getAuthConfig(),
      );
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete testimonial",
      );
    }
  },
);

// Toggle visibility
export const toggleTestimonialVisibility = createAsyncThunk(
  "testimonial/toggleVisibility",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${ADMIN_API_URL}/testimonials/${id}/toggle-visibility`,
        {},
        getAuthConfig(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle visibility",
      );
    }
  },
);

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState: {
    // Public testimonials (approved only)
    testimonials: [],
    // Admin testimonials (all statuses)
    adminTestimonials: [],
    loading: false,
    submitting: false,
    actionLoading: false,
    success: false,
    error: null,
  },

  reducers: {
    resetTestimonialState: (state) => {
      state.submitting = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* -------- Fetch Public Testimonials -------- */
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- Submit Testimonial -------- */
      .addCase(submitTestimonial.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(submitTestimonial.fulfilled, (state) => {
        state.submitting = false;
        state.success = true;
      })
      .addCase(submitTestimonial.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      })

      /* -------- Fetch Admin Testimonials -------- */
      .addCase(fetchAllTestimonialsAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTestimonialsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminTestimonials = action.payload;
      })
      .addCase(fetchAllTestimonialsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- Approve Testimonial -------- */
      .addCase(approveTestimonial.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(approveTestimonial.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.adminTestimonials.findIndex(
          (t) => t._id === action.payload._id,
        );
        if (index !== -1) {
          state.adminTestimonials[index] = action.payload;
        }
      })
      .addCase(approveTestimonial.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Reject Testimonial -------- */
      .addCase(rejectTestimonial.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(rejectTestimonial.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.adminTestimonials.findIndex(
          (t) => t._id === action.payload._id,
        );
        if (index !== -1) {
          state.adminTestimonials[index] = action.payload;
        }
      })
      .addCase(rejectTestimonial.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Delete Testimonial -------- */
      .addCase(deleteTestimonial.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.adminTestimonials = state.adminTestimonials.filter(
          (t) => t._id !== action.payload,
        );
      })
      .addCase(deleteTestimonial.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      /* -------- Toggle Visibility -------- */
      .addCase(toggleTestimonialVisibility.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(toggleTestimonialVisibility.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.adminTestimonials.findIndex(
          (t) => t._id === action.payload._id,
        );
        if (index !== -1) {
          state.adminTestimonials[index] = action.payload;
        }
      })
      .addCase(toggleTestimonialVisibility.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTestimonialState } = testimonialSlice.actions;
export default testimonialSlice.reducer;
