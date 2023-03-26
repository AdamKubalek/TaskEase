import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    setTasks: (state, action) => action.payload,
    addTask: (state, action) => [...state, action.payload],
    updateTask: (state, action) =>
      state.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      ),
    deleteTask: (state, action) =>
      state.filter((task) => task.id !== action.payload),
  },
});

export const { setTasks, addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
