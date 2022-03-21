import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { supabase } from '../lib/supabaseClient'
import { useAuthGuard } from './useAuthGuard'

export const useProgressPersistence = () => {
  const { isAuthenticated } = useAuthGuard()

  const { remainingTime, cycleType, sessionTime, userID } = useSelector(
    ({ pomodoro, auth }) => ({
      remainingTime: pomodoro.remainingTime,
      cycleType: pomodoro.cycleType,
      sessionTime: pomodoro.sessionDuration,
      userID: auth.user.id,
    })
  )

  const persistProgress = useCallback(async () => {
    if (!isAuthenticated) return

    try {
      await supabase
        .from('pomodoro')
        .insert([{ duration: sessionTime, user_id: userID }])
    } catch (e) {
      console.log('Something went wrong')
    }
  }, [sessionTime, userID, isAuthenticated])

  useEffect(() => {
    if (remainingTime === 0 && cycleType === 'normal') {
      persistProgress()
    }
  }, [remainingTime, cycleType, persistProgress])
}
