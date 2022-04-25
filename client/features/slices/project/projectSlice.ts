import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectService from "./projectService";

const initialState = {
  projects: <any[]>[],
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
    return thunkAPI.rejectWithValue(message);
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
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/update",
  async (projectData: { id: string; title: string; desc?: string }, thunkAPI) => {
    try {
      return await projectService.updateProject(projectData);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProject = createAsyncThunk("projects/delete", async (id: string, thunkAPI) => {
  try {
    return await projectService.deleteProject(id);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const inviteToProject = createAsyncThunk(
  "projects/invite",
  async (data: { id: string; usersID: string[] }, thunkAPI) => {
    try {
      return await projectService.inviteToProject(data.id, data.usersID);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
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
      })
      .addCase(updateProject.pending, (state: typeof initialState) => {
        state.isLoading = true;
      })
      .addCase(updateProject.fulfilled, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = state.projects.map((project) =>
          project._id === action.payload._id ? action.payload : project
        );
      })
      .addCase(updateProject.rejected, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(deleteProject.pending, (state: typeof initialState) => {
        state.isLoading = true;
      })
      .addCase(deleteProject.fulfilled, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = state.projects.filter((project) => project._id !== action.payload);
      })
      .addCase(deleteProject.rejected, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(inviteToProject.pending, (state: typeof initialState) => {
        state.isLoading = true;
      })
      .addCase(inviteToProject.fulfilled, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = state.projects.map((project) =>
          project._id === action.payload.id
            ? { ...project, members: action.payload.members }
            : project
        );
      })
      .addCase(inviteToProject.rejected, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = projectSlice.actions;
export default projectSlice.reducer;
