import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  backgroundSound: 'none',
  alertSound: 'none',
  sessionDuration: 3,
  shortBreakDuration: 4,
  longBreakDuration: 5,
  remainingTime: 3,
  cycleType: 'normal', //normal - shortBreak - longBreak
  status: 'idle', // idle - playing - paused
  interval: null,
  cycleNumber: 0,
}

let interval = null

export const initTimer = createAsyncThunk(
  'pomodoro/initTimer',
  (_, { dispatch }) => {
    dispatch({ type: 'pomodoro/play' })

    interval = setInterval(() => {
      dispatch({ type: 'pomodoro/tick' })
    }, 1000)
  }
)

const pomodoroReducer = createSlice({
  name: 'pomodoro',
  initialState,
  reducers: {
    play: (state) => {
      return {
        ...state,
        status: 'playing',
      }
    },
    tick: (state) => {
      return {
        ...state,
        remainingTime: state.remainingTime - 1,
        interval: state.interval || interval,
      }
    },
    stopTimer: (state) => {
      clearInterval(interval)
      return {
        ...state,
        remainingTime:
          state.cycleType === 'longBreak'
            ? state.longBreakDuration
            : state.cycleType === 'shortBreak'
            ? state.shortBreakDuration
            : state.sessionDuration,
        cycleNumber: state.cycleNumber,
        cycleType: state.cycleType,
      }
    },
    pauseTimer: (state) => {
      clearInterval(interval)
      return {
        ...state,
        status: 'paused',
        interval: null,
      }
    },
    changePhase: (state) => {
      if (state.cycleType === 'normal') {
        return {
          ...state,
          cycleType: state.cycleNumber < 3 ? 'shortBreak' : 'longBreak',
          remainingTime:
            state.cycleNumber < 3
              ? state.shortBreakDuration
              : state.longBreakDuration,
          cycleNumber: state.cycleNumber + 1,
        }
      } else {
        return {
          ...state,
          cycleType: 'normal',
          remainingTime: state.sessionDuration,
          cycleNumber: state.cycleNumber === 4 ? 0 : state.cycleNumber,
        }
      }
    },
    saveConfiguration: (state, action) => ({ ...state, ...action.payload }),
  },
})

export const { pauseTimer, stopTimer, changePhase, saveConfiguration } =
  pomodoroReducer.actions

export default pomodoroReducer.reducer
