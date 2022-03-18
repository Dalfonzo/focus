import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../libs/supabaseClient'

const initialState = {
  user: {},
  session: {},
  status: 'idle',
  error: null,
}

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (payload, { dispatch }) => {
    try {
      dispatch({ type: 'auth/started' })

      const { error, session, user } = await supabase.auth.signIn({
        email: payload.email,
        password: payload.password,
      })

      if (error) {
        dispatch({ type: 'auth/error', error })
      } else {
        dispatch({ type: 'auth/success', payload: { session, user } })
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

      const { error, session, user } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
      })

      if (error) {
        dispatch({ type: 'auth/error', error })
      } else {
        dispatch({ type: 'auth/success', payload: { session, user } })
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
        dispatch({ type: 'auth/success', payload: { session: {}, user: {} } })
      }
    } catch (error) {
      dispatch({ type: 'auth/error', error: { message: 'Unexpected errror' } })
      console.log(error)
    }
  }
)

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
