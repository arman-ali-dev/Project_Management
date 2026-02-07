import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMyTasks = createAsyncThunk(
  "task/fetchMyTasks",
  async (filterData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      let url = "http://localhost:8080/api/tasks/my";

      if (filterData?.status) {
        url += `?status=${filterData.status}`;
      }

      if (filterData?.priority) {
        url += `?priority=${filterData.priority}`;
      }

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched tasks successfully", data);

      return data;
    } catch (err) {
      console.log("tasks: ", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const updateTaskStatus = createAsyncThunk(
  "task/updateTaskStatus",
  async ({ taskId, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.patch(
        `http://localhost:8080/api/tasks/${taskId}/status?status=${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Changed task status successfully", data);

      return data;
    } catch (err) {
      console.log("tasks: ", err.message);
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    updateTaskStatusLocal: (state, action) => {
      const { taskId, status } = action.payload;

      const task = state.tasks.find((t) => t.id == taskId);

      if (task) {
        task.status = status;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMyTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchMyTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Task Status
      .addCase(updateTaskStatus.pending, (state) => {
        state.error = null;
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t,
        );
      })
      .addCase(updateTaskStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
export const { updateTaskStatusLocal } = taskSlice.actions;
