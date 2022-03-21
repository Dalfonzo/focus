import { configureStore } from '@reduxjs/toolkit'
import pomodoroReducer from '../features/pomodoro/pomodoroSlice'
import authReducer from '../features/authentication/authenticationSlice'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { persistReducer, createTransform } from 'redux-persist'
import thunk from 'redux-thunk'

const pomodoroBlacklist = createTransform(
  null,
  (state) => {
    const newState = {
      ...state,
      status: 'idle',
      interval: null,
      cycleType: 'normal',
      cycleNumber: 0,
    }
    newState.remainingTime = newState.sessionDuration
    return newState
  },
  { whitelist: ['pomodoro'] }
)

const persistConfig = {
  timeout: 500,
  key: 'root',
  storage,
  transforms: [pomodoroBlacklist],
}

const reducers = combineReducers({
  pomodoro: pomodoroReducer,
  auth: authReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})
