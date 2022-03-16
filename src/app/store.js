import { configureStore } from '@reduxjs/toolkit'
import pomodoroReducer from '../features/pomodoro/pomodoroSlice'

export const store = configureStore({
  reducer: {
    pomodoro: pomodoroReducer,
  },
})
