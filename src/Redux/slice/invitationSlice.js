import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const submitInvitation = createAsyncThunk(
  "invitation/submit",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/invitation`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send invitation",
      );
    }
  },
);

const invitationSlice = createSlice({
  name: "invitation",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },

  reducers: {
    resetInvitationState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(submitInvitation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitInvitation.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitInvitation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetInvitationState } = invitationSlice.actions;
export default invitationSlice.reducer;
