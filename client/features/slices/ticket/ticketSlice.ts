import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "./ticketService";

const initialState = {
  tickets: <any[]>[],
  ticketStats: {
    totalTickets: 0,
    openTickets: 0,
    inProgressTickets: 0,
    closedTickets: 0,
  },
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getTickets = createAsyncThunk("ticket/getTickets", async (id: string, thunkAPI) => {
  try {
    return await ticketService.getTickets(id);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const countTickets = createAsyncThunk(
  "ticket/countTickets",
  async (id: string, thunkAPI) => {
    try {
      return await ticketService.countTickets(id);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createTicket = createAsyncThunk(
  "ticket/create",
  async (
    ticketData: {
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
      return await ticketService.createTickets(ticketData);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateTicket = createAsyncThunk(
  "ticket/update",
  async (
    ticketData: {
      ticketID: string;
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
      return await ticketService.updateTicket(ticketData);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTicket = createAsyncThunk("ticket/delete", async (id: string, thunkAPI) => {
  try {
    return await ticketService.deleteTicket(id);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: { reset: (state) => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(getTickets.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(countTickets.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(countTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.ticketStats = action.payload;
      })
      .addCase(countTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(createTicket.pending, (state: typeof initialState) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets.push(action.payload as never);
      })
      .addCase(createTicket.rejected, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(updateTicket.pending, (state: typeof initialState) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(updateTicket.fulfilled, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        state.tickets = state.tickets.map((ticket) =>
          ticket._id === action.payload._id ? action.payload : ticket
        );
      })
      .addCase(updateTicket.rejected, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(deleteTicket.pending, (state: typeof initialState) => {
        state.isLoading = true;
      })
      .addCase(deleteTicket.fulfilled, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = state.tickets.filter((ticket) => ticket._id !== action.payload);
      })
      .addCase(deleteTicket.rejected, (state: typeof initialState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
