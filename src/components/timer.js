import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { secondsToFormatedTime, currentPageFormatter } from '../utils'

const Timer = () => {
  const remainingTime = useSelector((state) => state.pomodoro.remainingTime)

  return (
    <>
      <HeadTimer remainingTime={remainingTime} />
      <div className="m-auto rounded-[50%] w-72 h-72 sm:w-96 sm:h-96 p-2 relative">
        <div className="m-auto rounded-[50%] w-full h-full p-2 relative main-gradient spin">
          <div className="w-full h-full rounded-[50%] p-1 bg-background"></div>
        </div>
        <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[1] text-[5rem] sm:text-[7rem]">
          {secondsToFormatedTime(remainingTime)}
        </p>
      </div>
    </>
  )
}

const HeadTimer = ({ remainingTime }) => {
  const { pathname } = useRouter()

  return (
    <Head>
      <title>
        {secondsToFormatedTime(remainingTime)} |{' '}
        {currentPageFormatter({ pathname })}
      </title>
      <meta property="og:title" content="Focus App" key="Focus App" />
    </Head>
  )
}

export default Timer
