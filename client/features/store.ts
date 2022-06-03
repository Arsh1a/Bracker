import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import projectReducer from "./slices/project/projectSlice";
import inviteReducer from "./slices/invite/inviteSlice";
import ticketReducer from "./slices/ticket/ticketSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    invite: inviteReducer,
    ticket: ticketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
