import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import projectReducer from "./slices/project/projectSlice";

export const store = configureStore({
  reducer: { auth: authReducer, project: projectReducer },
});

export type RootState = ReturnType<typeof store.getState>;
