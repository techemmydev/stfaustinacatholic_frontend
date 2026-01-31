import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ API_URL properly switches between development and production
// const API_URL =
//   import.meta.env.MODE === "development"
//     ? import.meta.env.VITE_API_URL
//     : "/api";
const API_URL = import.meta.env.VITE_API_URL;
const WEB3FORMS_API_URL = import.meta.env.VITE_API_URLWEB;
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_API_WEB3FORM;
// ✅ Async action for submitting the contact form
export const submitContactForm = createAsyncThunk(
  "contact/submit",
  async (contactData, { rejectWithValue }) => {
    try {
      console.log("Contact Data:", contactData); // Debugging

      // 1️⃣ Send booking to your backend
      const backendResponse = await axios.post(
        `${API_URL}/contact`,
        contactData
      );

      // 2️⃣ Send booking to Web3Forms
      const web3Response = await axios.post(WEB3FORMS_API_URL, {
        access_key: WEB3FORMS_ACCESS_KEY, // Required API key
        ...contactData, // Include all form fields
      });

      return {
        backend: backendResponse.data,
        web3forms: web3Response.data,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to submit contact form"
      );
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: { loading: false, success: false, error: null },
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = contactSlice.actions;
export default contactSlice.reducer;
