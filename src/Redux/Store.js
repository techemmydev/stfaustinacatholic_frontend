import { configureStore } from "@reduxjs/toolkit";

import parishRegisterReducer from "./slice/ParishUserRegistrationSlice";
export const store = configureStore({
  reducer: {
    parishRegister: parishRegisterReducer,
  },
});
