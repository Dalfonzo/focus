import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { changePhase } from '../../src/features/pomodoro/pomodoroSlice'

const Timer = () => {
  const dispatch = useDispatch()
  const remainingTime = useSelector((state) => state.pomodoro.remainingTime)

  const secondsToFormatedTime = (currSeconds) => {
    const min = currSeconds < 0 ? 0 : Math.floor(currSeconds / 60)
    const sec = currSeconds < 0 ? 0 : currSeconds - min * 60
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`
  }

  useEffect(() => {
    if (remainingTime > -1) {
      return
    }

    dispatch(changePhase())
  }, [remainingTime, dispatch])

  return (
    <div className="m-auto rounded-[50%] w-72 h-72 sm:w-96 sm:h-96 p-2 relative">
      <div className="m-auto rounded-[50%] w-full h-full p-2 relative main-gradient spin">
        <div className="w-full h-full rounded-[50%] p-1 bg-background"></div>
      </div>
      <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[1] text-[5rem] sm:text-[7rem]">
        {secondsToFormatedTime(remainingTime)}
      </p>
    </div>
  )
}

export default Timer
