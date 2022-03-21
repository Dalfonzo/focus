import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/layout'
import { saveConfiguration } from '../features/pomodoro/pomodoroSlice'
import { secondsToMinutes, minutesToSeconds } from '../utils'
import BackBtn from '../components/back-btn'

const ALERT_SOUNDS = ['success']
const BACKGROUND_SOUNDS = ['none', 'rain', 'bonfire']

const Configuration = () => {
  const initState = useSelector((state) => ({
    sessionDuration: secondsToMinutes(state.pomodoro.sessionDuration),
    shortBreakDuration: secondsToMinutes(state.pomodoro.shortBreakDuration),
    longBreakDuration: secondsToMinutes(state.pomodoro.longBreakDuration),
    backgroundSound: state.pomodoro.backgroundSound,
    alertSound: state.pomodoro.alertSound,
  }))

  const [config, setConfig] = useState(initState)
  const dispatch = useDispatch()

  const onChangeHandler = (event) => {
    const isNumber = [
      'sessionDuration',
      'shortBreakDuration',
      'longBreakDuration',
    ].includes(event.target.name)

    const value = isNumber ? Number(event.target.value) : event.target.value

    setConfig((prevState) => ({
      ...prevState,
      [event.target.name]: value,
    }))
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    dispatch(
      saveConfiguration({
        ...config,
        sessionDuration: minutesToSeconds(config.sessionDuration),
        shortBreakDuration: minutesToSeconds(config.shortBreakDuration),
        longBreakDuration: minutesToSeconds(config.longBreakDuration),
      })
    )
  }

  return (
    <Layout>
      <BackBtn />
      <div className="w-full max-w-lg mx-auto bg-white-10 z-[1] relative p-[1rem] md:p-[3rem] lg:p-[5rem] shadow-container rounded-[10px]">
        <form className="w-full" onSubmit={onSubmitHandler}>
          <p className="block mt-6 mb-4 text-xs font-bold tracking-wide underline uppercase">
            Duration (minutes)
          </p>
          <div className="flex flex-wrap">
            <div className="w-full px-3 md:w-1/3 md:mb-0">
              <label
                className="block mb-2 text-xs font-bold tracking-wide "
                htmlFor="sessionDuration"
              >
                Pomodoro
              </label>
              <input
                className="block w-full px-4 py-3 leading-tight bg-transparent border border-white rounded appearance-none focus:outline-none focus:border-fuchsia"
                id="sessionDuration"
                name="sessionDuration"
                type="number"
                min="1"
                max="99"
                value={config.sessionDuration}
                onChange={onChangeHandler}
              />
            </div>
            <div className="w-full px-3 md:w-1/3">
              <label
                className="block mb-2 text-xs font-bold tracking-wide "
                htmlFor="shortBreakDuration"
              >
                Small Break
              </label>
              <input
                className="block w-full px-4 py-3 leading-tight bg-transparent border border-white rounded appearance-none focus:outline-none focus:border-fuchsia"
                type="number"
                min="1"
                max="99"
                id="shortBreakDuration"
                name="shortBreakDuration"
                value={config.shortBreakDuration}
                onChange={onChangeHandler}
              />
            </div>
            <div className="w-full px-3 md:w-1/3">
              <label
                className="block mb-2 text-xs font-bold tracking-wide "
                htmlFor="longBreakDuration"
              >
                Long Break
              </label>
              <input
                className="block w-full px-4 py-3 leading-tight bg-transparent border border-white rounded appearance-none focus:outline-none focus:border-fuchsia"
                id="longBreakDuration"
                name="longBreakDuration"
                value={config.longBreakDuration}
                onChange={onChangeHandler}
                type="number"
                min="1"
                max="99"
              />
            </div>
          </div>

          <div className="pt-6 mb-6">
            <p className="block mt-6 mb-4 text-xs font-bold tracking-wide underline uppercase">
              background sound
            </p>
            <p className="mt-1 mb-4 text-sm text-fuchsia">
              Note: These sounds will play only when the pomodoro is runnig
            </p>
            <div className="space-y-4">
              {BACKGROUND_SOUNDS.map((sound, index) => {
                return (
                  <div className="flex items-center" key={index}>
                    <label className="cursor-pointer label" htmlFor={sound}>
                      <input
                        className="toggle toggle-accent"
                        id={sound}
                        name="backgroundSound"
                        value={sound}
                        onChange={onChangeHandler}
                        checked={config.backgroundSound === sound}
                        type="radio"
                      />
                      <span className="ml-3 text-sm capitalize text-white-normal">
                        {sound}
                      </span>
                    </label>
                  </div>
                )
              })}
            </div>
            <div className="pt-6 mb-6 ">
              <p className="block mt-6 mb-4 text-xs font-bold tracking-wide underline uppercase">
                Alert Sound
              </p>
              <div className="space-y-4">
                {ALERT_SOUNDS.map((sound, index) => {
                  return (
                    <div className="flex items-center" key={index}>
                      <label className="cursor-pointer label" htmlFor={sound}>
                        <input
                          className="toggle toggle-accent"
                          id={sound}
                          name="alertSound"
                          value={sound}
                          onChange={onChangeHandler}
                          checked={config.alertSound === sound}
                          type="radio"
                        />
                        <span className="ml-3 text-sm capitalize text-white-normal">
                          {sound}
                        </span>
                      </label>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5 text-center  mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700 my-6 mx-auto w-full btn-gradient move-up"
          >
            Save Changes
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Configuration
