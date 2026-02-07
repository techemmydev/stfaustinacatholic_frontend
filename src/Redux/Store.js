import { configureStore } from "@reduxjs/toolkit";

import parishRegisterReducer from "./slice/ParishUserRegistrationSlice";
import appointmentReducer from "./slice/BookingAppointSlice";
import cookieReducer from "./slice/cookieSlice";
import lockReducer from "./slice/lockSlice";
import contactReducer from "./slice/ContactSlice";
import invitationReducer from "./slice/invitationSlice";
import testimonialReducer from "./slice/testimonialSlice";
export const store = configureStore({
  reducer: {
    parishRegister: parishRegisterReducer,
    appointment: appointmentReducer,
    cookie: cookieReducer,
    lock: lockReducer,
    contact: contactReducer,
    invitation: invitationReducer,
    testimonial: testimonialReducer,
  },
});
