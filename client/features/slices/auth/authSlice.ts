import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import Cookies from "js-cookie";

// Get user info cookie from browser
let cookie = Cookies.get("user");
const user = cookie?.toString();

const initialState = {
  user: user ? JSON.parse(user) : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user: { username: string; email: string; password: string }, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Login user
export const login = createAsyncThunk(
  "auth/login",
  async (user: { email: string; password: string }, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

//Get user info (if cookie still exists)
export const getUser = createAsyncThunk("auth/getUser", async () => {
  await authService.getUserInfo();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(getUser.fulfilled, (state, action: any) => {
        state.user = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
