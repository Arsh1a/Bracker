import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import inviteService from "./inviteService";

const initialState = {
  invites: <any[]>[],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getInvites = createAsyncThunk("invite/getInvites", async (_, thunkAPI) => {
  try {
    return await inviteService.getInvites();
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const handleInvite = createAsyncThunk(
  "invite/handleInvite",
  async (inviteData: { id: string; accepted: boolean }, thunkAPI) => {
    try {
      return await inviteService.handleInvite(inviteData);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const inviteSlice = createSlice({
  name: "invite",
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
      .addCase(getInvites.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getInvites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.invites = action.payload;
      })
      .addCase(getInvites.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(handleInvite.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(handleInvite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        //delete invite from state
        state.invites = state.invites!.filter((invite) => invite._id !== action.payload.inviteID);
      })
      .addCase(handleInvite.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = inviteSlice.actions;
export default inviteSlice.reducer;
