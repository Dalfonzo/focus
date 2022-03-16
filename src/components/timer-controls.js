import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsFillPlayFill, BsPause } from 'react-icons/bs'
import { MdRestartAlt } from 'react-icons/md'
import {
  initTimer,
  pauseTimer,
  stopTimer,
} from '../features/pomodoro/pomodoroSlice'

const Controls = () => {
  const dispatch = useDispatch()
  const status = useSelector((state) => state.pomodoro.status)

  const onPlayClickHandler = () => {
    status === 'playing' ? dispatch(pauseTimer()) : dispatch(initTimer())
  }

  const onStopClickHandler = () => {
    dispatch(stopTimer())
  }
  return (
    <div className="flex justify-center m-auto my-8 text-3xl align-middle relative z-[1]">
      <button
        onClick={onPlayClickHandler}
        className="flex rounded-[50%]  p-1 relative main-gradient move-up"
      >
        <span className="w-full h-full rounded-[50%] p-1 bg-[rgb(0 0 0 / 5%)] backdrop-blur-xl backdrop-saturate-100 ">
          {status === 'playing' ? (
            <BsPause className="m-2" />
          ) : (
            <BsFillPlayFill className="m-2" />
          )}
        </span>
      </button>
      <button onClick={onStopClickHandler} disabled={status === 'idle'}>
        <MdRestartAlt className="m-2 move-up" />
      </button>
    </div>
  )
}

export default Controls
