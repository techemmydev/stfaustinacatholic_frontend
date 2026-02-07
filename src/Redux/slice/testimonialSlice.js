import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Fetch all approved testimonials
export const fetchTestimonials = createAsyncThunk(
  "testimonial/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/testimonials`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load testimonials",
      );
    }
  },
);

// Submit a new testimonial
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

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState: {
    testimonials: [],
    loading: false,
    submitting: false,
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
      /* -------- Fetch: Pending -------- */
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      /* -------- Fetch: Fulfilled -------- */
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload;
      })
      /* -------- Fetch: Rejected -------- */
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- Submit: Pending -------- */
      .addCase(submitTestimonial.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      /* -------- Submit: Fulfilled -------- */
      .addCase(submitTestimonial.fulfilled, (state) => {
        state.submitting = false;
        state.success = true;
      })
      /* -------- Submit: Rejected -------- */
      .addCase(submitTestimonial.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      });
  },
});

export const { resetTestimonialState } = testimonialSlice.actions;
export default testimonialSlice.reducer;
