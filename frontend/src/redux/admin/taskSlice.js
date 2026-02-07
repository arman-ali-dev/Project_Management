import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasks = createAsyncThunk(
  "adminTask/fetchTasks",
  async (filterData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");

      let url = "http://localhost:8080/api/admin/tasks/all";

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
      console.log("admin tasks: ", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const createTask = createAsyncThunk(
  "adminTask/createTask",
  async (taskData, { rejectWithValue }) => {
    console.log("Creating task with data:", taskData);

    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.post(
        "http://localhost:8080/api/admin/tasks",
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Created task successfully", data);

      return data;
    } catch (err) {
      console.log("admin tasks: ", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

const initialState = {
  tasks: [],
  loading: false,
  error: null,

  createLoading: false,
};

const taskSlice = createSlice({
  name: "adminTask",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Task
      .addCase(createTask.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.createLoading = false;
        state.tasks = [action.payload, ...state.tasks];
      })
      .addCase(createTask.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
