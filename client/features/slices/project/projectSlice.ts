import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectService from "./projectService";

const initialState = {
  projects: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getProjects = createAsyncThunk("project/getProjects", async (_, thunkAPI) => {
  try {
    return await projectService.getProjects();
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue({ message });
  }
});

export const createProject = createAsyncThunk(
  "projects/create",
  async (projectData: { title: string; desc?: string; members?: any[] }, thunkAPI) => {
    try {
      return await projectService.createProject(projectData);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: { reset: (state) => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(createProject.pending, (state: typeof initialState) => {
        state.isLoading = true;
      })
      .addCase(createProject.fulfilled, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects.push(action.payload as never);
      })
      .addCase(createProject.rejected, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = projectSlice.actions;
export default projectSlice.reducer;
