import Head from 'next/head'
import Image from 'next/image'
import { BsFillPlayFill, BsPause } from 'react-icons/bs'
import { MdRestartAlt } from 'react-icons/md'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const NORMAL_STARTING_TIME = 1500
const SMALL_BREAK_STARTING_TIME = 300
const LONG_BREAK_STARTING_TIME = 900

const initState = {
  seconds: NORMAL_STARTING_TIME,
  cycleType: 'normal', //normal - smallBreak - longBreak
  status: 'idle', // idle - playing - paused
  interval: null,
  cycleNumber: 1,
}

export default function Home() {
  const [{ seconds, status, interval, cycleNumber, cycleType }, setState] =
    useState(initState)

  const secondsToFormatedTime = (currSeconds) => {
    const min = Math.floor(currSeconds / 60)
    const sec = currSeconds - min * 60
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`
  }

  useEffect(() => {
    if (seconds !== 0) {
      return
    }

    if (cycleType === 'normal') {
      if (cycleNumber === 4) {
        setState((prevState) => ({
          ...prevState,
          cycleType: 'longBreak',
          seconds: LONG_BREAK_STARTING_TIME,
          cycleNumber: 1,
        }))
      } else {
        setState((prevState) => ({
          ...prevState,
          cycleType: 'smallBreak',
          seconds: SMALL_BREAK_STARTING_TIME,
          cycleNumber: prevState.cycleNumber + 1,
        }))
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        cycleType: 'normal',
        seconds: NORMAL_STARTING_TIME,
      }))
    }
  }, [seconds, cycleType, cycleNumber])

  useEffect(() => {
    return () => {
      clearInterval(interval)
    }
  }, [interval])

  const onPlayClickHandler = () => {
    const interval = setInterval(() => {
      setState((prevState) => ({
        ...prevState,
        seconds: prevState.seconds - 1,
        status: 'playing',
        interval: prevState.interval || interval,
      }))
    }, 1000)
  }

  const onPauseClickHandler = () => {
    clearInterval(interval)
    setState((prevState) => ({
      ...prevState,
      status: 'paused',
      interval: null,
    }))
  }

  const onStopClickHandler = () => {
    if (interval) {
      clearInterval(interval)
    }

    setState((prevState) => ({
      ...initState,
      seconds:
        prevState.cycleType === 'longBreak'
          ? LONG_BREAK_STARTING_TIME
          : prevState.cycleType === 'smallBreak'
          ? SMALL_BREAK_STARTING_TIME
          : NORMAL_STARTING_TIME,
      cycleNumber: prevState.cycleNumber,
      cycleType: prevState.cycleType,
    }))
  }

  return (
    <main className="min-h-screen text-primary bg-background">
      <div className="flex-col justify-center max-w-screen-lg m-auto align-middle">
        <header className="flex justify-end p-8 text-center align-middle">
          <p>
            <Link href="/config">Config</Link>
          </p>
          <p>sign-in</p>
        </header>
        <div className="text-center border-lg rounded-full pb-[35%] w-[35%] h-0 overflow-hidden box-content relative m-auto">
          <p className="text-9xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            {secondsToFormatedTime(seconds)}
          </p>
        </div>
        <div className="flex justify-center m-auto my-8 text-3xl align-middle">
          <button onClick={onPlayClickHandler} disabled={status === 'playing'}>
            <BsFillPlayFill className="m-2" />
          </button>
          <button onClick={onPauseClickHandler} disabled={status !== 'playing'}>
            <BsPause className="m-2" />
          </button>
          <button onClick={onStopClickHandler} disabled={status === 'idle'}>
            <MdRestartAlt className="m-2" />
          </button>
        </div>
        <footer className="text-center"> made by</footer>
      </div>
    </main>
  )
}
