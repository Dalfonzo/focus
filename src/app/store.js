import { configureStore } from '@reduxjs/toolkit'
import pomodoroReducer from '../features/pomodoro/pomodoroSlice'
import authReducer from '../features/authentication/authenticationSlice'

export const store = configureStore({
  reducer: {
    pomodoro: pomodoroReducer,
    auth: authReducer,
  },
})
