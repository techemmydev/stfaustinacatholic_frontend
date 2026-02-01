import { configureStore } from "@reduxjs/toolkit";

import parishRegisterReducer from "./slice/ParishUserRegistrationSlice";
import appointmentReducer from "./slice/BookingAppointSlice";
import cookieReducer from "./slice/cookieSlice";
import lockReducer from "./slice/lockSlice";
export const store = configureStore({
  reducer: {
    parishRegister: parishRegisterReducer,
    appointment: appointmentReducer,
    cookie: cookieReducer,
    lock: lockReducer,
  },
});
