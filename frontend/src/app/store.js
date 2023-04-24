import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/tasksSlice";
import authReducer from "../features/auth/authSlice";

export default configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
  },
});
