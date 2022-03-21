import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePhase } from '../features/pomodoro/pomodoroSlice'

export const useTimerPhaseHandler = () => {
  const dispatch = useDispatch()
  const remainingTime = useSelector((state) => state.pomodoro.remainingTime)

  useEffect(() => {
    if (remainingTime > -1) {
      return
    }

    dispatch(changePhase())
  }, [remainingTime, dispatch])
}
