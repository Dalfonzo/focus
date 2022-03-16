import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  backgroundSound: 'none',
  alertSound: 'success',
  sessionDuration: 1500,
  shortBreakDuration: 300,
  longBreakDuration: 900,
  remainingTime: 1500,
  cycleType: 'normal',
  status: 'idle',
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

export const saveConfiguration = createAsyncThunk(
  'pomodoro/saveConfiguration',
  (payload, { dispatch, getState }) => {
    const { pomodoro: state } = getState()
    let remainingTime

    const sessionDurationChanged =
      payload.sessionDuration !== state.sessionDuration
    const shortBreakDurationChanged =
      payload.shortBreakDuration !== state.shortBreakDuration
    const longBreakDurationChanged =
      payload.longBreakDuration !== state.longBreakDuration

    if (sessionDurationChanged && state.cycleType === 'normal') {
      dispatch({ type: 'pomodoro/stopTimer' })
      remainingTime = payload.sessionDuration
    } else if (shortBreakDurationChanged && state.cycleType === 'shortBreak') {
      dispatch({ type: 'pomodoro/stopTimer' })
      remainingTime = payload.shortBreakDuration
    } else if (longBreakDurationChanged && state.cycleType === 'longBreak') {
      dispatch({ type: 'pomodoro/stopTimer' })
      remainingTime = payload.longBreakDuration
    } else {
      remainingTime = state.remainingTime
    }

    dispatch({
      type: 'pomodoro/assignNewConfiguration',
      payload: { ...payload, remainingTime },
    })
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
        status: 'idle',
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
    assignNewConfiguration: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
})

export const { pauseTimer, stopTimer, changePhase } = pomodoroReducer.actions

export default pomodoroReducer.reducer
