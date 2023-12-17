import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Reducers/authSlice';
import taskReducer from '../Reducers/taskSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});
