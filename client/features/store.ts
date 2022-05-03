import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import projectReducer from "./slices/project/projectSlice";
import inviteReducer from "./slices/invite/inviteSlice";

export const store = configureStore({
  reducer: { auth: authReducer, project: projectReducer, invite: inviteReducer },
});

export type RootState = ReturnType<typeof store.getState>;
