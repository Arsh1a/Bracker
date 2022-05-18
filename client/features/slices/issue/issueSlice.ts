import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import issueService from "./issueService";

const initialState = {
  issues: <any[]>[],
  issueStats: {
    totalIssues: 0,
    openIssues: 0,
    inProgressIssues: 0,
    closedIssues: 0,
  },
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getIssues = createAsyncThunk("issue/getIssues", async (id: string, thunkAPI) => {
  try {
    return await issueService.getIssues(id);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const countIssues = createAsyncThunk("issue/countIssues", async (id: string, thunkAPI) => {
  try {
    return await issueService.countIssues(id);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createIssue = createAsyncThunk(
  "issue/create",
  async (
    issueData: {
      projectID: string;
      title: string;
      desc?: string;
      severity: "low" | "medium" | "high";
      status: "open" | "closed" | "inprogress";
      content: string;
      reporter: string;
      assignee?: string;
    },
    thunkAPI
  ) => {
    try {
      return await issueService.createIssues(issueData);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateIssue = createAsyncThunk(
  "issue/update",
  async (
    issueData: {
      issueID: string;
      title?: string;
      desc?: string;
      severity?: "low" | "medium" | "high";
      status?: "open" | "closed" | "inprogress";
      content?: string;
      assignee?: string;
    },
    thunkAPI
  ) => {
    try {
      return await issueService.updateIssue(issueData);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteIssue = createAsyncThunk("issue/delete", async (id: string, thunkAPI) => {
  try {
    return await issueService.deleteIssue(id);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: { reset: (state) => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(getIssues.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getIssues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.issues = action.payload;
      })
      .addCase(getIssues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(countIssues.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(countIssues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.issueStats = action.payload;
      })
      .addCase(countIssues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(createIssue.pending, (state: typeof initialState) => {
        state.isLoading = true;
      })
      .addCase(createIssue.fulfilled, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.issues.push(action.payload as never);
      })
      .addCase(createIssue.rejected, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(updateIssue.pending, (state: typeof initialState) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(updateIssue.fulfilled, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        state.issues = state.issues.map((issue) =>
          issue._id === action.payload._id ? action.payload : issue
        );
      })
      .addCase(updateIssue.rejected, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(deleteIssue.pending, (state: typeof initialState) => {
        state.isLoading = true;
      })
      .addCase(deleteIssue.fulfilled, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.issues = state.issues.filter((issue) => issue._id !== action.payload);
      })
      .addCase(deleteIssue.rejected, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = issueSlice.actions;
export default issueSlice.reducer;
