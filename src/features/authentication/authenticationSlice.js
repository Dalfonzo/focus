import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../lib/supabaseClient'

const initialState = {
  user: {},
  status: 'idle',
  error: null,
}

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (payload, { dispatch }) => {
    try {
      dispatch({ type: 'auth/started' })

      const { error, user } = await supabase.auth.signIn({
        email: payload.email,
        password: payload.password,
      })

      if (error) {
        dispatch({ type: 'auth/error', error })
      } else {
        dispatch({ type: 'auth/success', payload: { user } })
      }
    } catch (error) {
      dispatch({ type: 'auth/error', error: { message: 'Unexpected errror' } })
      console.log(error)
    }
  }
)

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (payload, { dispatch }) => {
    try {
      dispatch({ type: 'auth/started' })

      const { error, user } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
      })

      if (error) {
        dispatch({ type: 'auth/error', error })
      } else {
        dispatch({ type: 'auth/success', payload: { user } })
      }
    } catch (error) {
      dispatch({ type: 'auth/error', error: { message: 'Unexpected errror' } })
      console.log(error)
    }
  }
)

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { dispatch }) => {
    try {
      dispatch({ type: 'auth/started' })
      const { error } = await supabase.auth.signOut()
      if (error) {
        dispatch({ type: 'auth/error', error })
      } else {
        dispatch({ type: 'auth/success', payload: { user: {} } })
      }
    } catch (error) {
      dispatch({ type: 'auth/error', error: { message: 'Unexpected errror' } })
      console.log(error)
    }
  }
)

export const resetStatus = createAsyncThunk(
  'auth/resetStatus',
  async (_, { dispatch }) => {
    dispatch({ type: 'auth/reset' })
  }
)

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      return {
        ...state,
        status: 'idle',
        error: null,
      }
    },
    started: (state) => {
      return {
        ...state,
        status: 'pending',
        error: null,
      }
    },
    error: (state, { error }) => {
      return {
        ...state,
        status: 'rejected',
        error,
      }
    },
    success: (state, { payload }) => {
      return {
        ...state,
        status: 'resolved',
        ...payload,
      }
    },
  },
})

export default authReducer.reducer
