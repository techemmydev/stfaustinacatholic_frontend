import { createSlice } from "@reduxjs/toolkit";

const lockSlice = createSlice({
  name: "lock",
  initialState: {
    isLocked: false,
  },

  reducers: {
    lockScreen: (state) => {
      state.isLocked = true;
    },
    unlockScreen: (state) => {
      state.isLocked = false;
    },
  },
});

export const { lockScreen, unlockScreen } = lockSlice.actions;
export default lockSlice.reducer;
