import Head from 'next/head'
import Image from 'next/image'
import { BsFillPlayFill, BsPause } from 'react-icons/bs'
import { MdRestartAlt } from 'react-icons/md'
import { useEffect, useRef } from 'react'
import Layout from '../src/components/layout'
import {
  initTimer,
  pauseTimer,
  stopTimer,
  changePhase,
} from '../src/features/pomodoro/pomodoroSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Home() {
  const dispatch = useDispatch()
  const remainingTime = useSelector((state) => state.pomodoro.remainingTime)
  const status = useSelector((state) => state.pomodoro.status)

  const secondsToFormatedTime = (currSeconds) => {
    const min = Math.floor(currSeconds / 60)
    const sec = currSeconds - min * 60
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`
  }

  useEffect(() => {
    if (remainingTime > 0) {
      return
    }

    dispatch(changePhase())
  }, [remainingTime, dispatch])

  const onPlayClickHandler = () => {
    status === 'playing' ? dispatch(pauseTimer()) : dispatch(initTimer())
  }

  const onStopClickHandler = () => {
    dispatch(stopTimer())
  }

  const playerRef = useRef(null)

  useEffect(() => {
    playerRef.current.play()
  }, [])

  return (
    <Layout>
      <audio
        controls
        src="/sounds/0.mp3"
        ref={playerRef}
        loop
        className="hidden h-0"
      />
      <div className="text-center border-lg rounded-full pb-[35%] w-[35%] h-0 overflow-hidden box-content relative m-auto">
        <p className="text-9xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          {secondsToFormatedTime(remainingTime)}
        </p>
      </div>
      <div className="flex justify-center m-auto my-8 text-3xl align-middle">
        <button onClick={onPlayClickHandler}>
          {status === 'playing' ? (
            <BsPause className="m-2" />
          ) : (
            <BsFillPlayFill className="m-2" />
          )}
        </button>
        <button onClick={onStopClickHandler} disabled={status === 'idle'}>
          <MdRestartAlt className="m-2" />
        </button>
      </div>
    </Layout>
  )
}
