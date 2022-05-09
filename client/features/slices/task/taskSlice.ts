import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "./taskService";

const initialState = {
  tasks: <any[]>[],
  taskStats: {
    totalTasks: 0,
    openTasks: 0,
    inProgressTasks: 0,
    closedTasks: 0,
  },
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getTasks = createAsyncThunk("task/getTasks", async (id: string, thunkAPI) => {
  try {
    return await taskService.getTasks(id);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const countTasks = createAsyncThunk("task/countTasks", async (id: string, thunkAPI) => {
  try {
    return await taskService.countTasks(id);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createTask = createAsyncThunk(
  "task/create",
  async (
    taskData: {
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
      return await taskService.createTasks(taskData);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/update",
  async (
    taskData: {
      taskID: string;
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
      return await taskService.updateTask(taskData);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTask = createAsyncThunk("task/delete", async (id: string, thunkAPI) => {
  try {
    return await taskService.deleteTask(id);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: { reset: (state) => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.tasks = action.payload.tasks;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(countTasks.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(countTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.taskStats = action.payload;
      })
      .addCase(countTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(createTask.pending, (state: typeof initialState) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.push(action.payload as never);
      })
      .addCase(createTask.rejected, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(updateTask.pending, (state: typeof initialState) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(updateTask.fulfilled, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      })
      .addCase(updateTask.rejected, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(deleteTask.pending, (state: typeof initialState) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
