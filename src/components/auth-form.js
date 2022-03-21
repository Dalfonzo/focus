import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import BackBtn from '../components/back-btn'
import { useAuthGuard } from '../hooks/useAuthGuard'

const AuthForm = ({ onSubmitHandler, title }) => {
  const error = useSelector((state) => state.auth.error)
  const status = useSelector((state) => state.auth.status)
  const isLoading = status === 'pending'
  const [{ email, password }, setState] = useState({
    email: '',
    password: '',
  })

  const { isAuthenticated } = useAuthGuard()
  const router = useRouter()

  const onChangeHandler = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    router.push('/')
  }, [isAuthenticated, router])

  return (
    <Layout>
      <BackBtn />
      <div className="w-full max-w-lg mx-auto bg-white-10 z-[1] relative p-[1rem] md:p-[3rem] lg:p-[4rem] shadow-container rounded-[10px]">
        {error && (
          <p className="text-center text-red-400 bold">
            **Error: {error.message}**
          </p>
        )}
        <form
          className="w-full"
          onSubmit={(e) => onSubmitHandler(e, { email, password })}
        >
          <p className="block mt-6 mb-4 text-xs font-bold tracking-wide underline uppercase ">
            {title}
          </p>
          <div className="flex flex-wrap">
            <div className="w-full px-3 mb-[1rem]">
              <label
                className="block mb-2 text-xs font-bold tracking-wide "
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="block w-full px-4 py-3 leading-tight bg-transparent border border-white rounded appearance-none focus:outline-none focus:border-fuchsia"
                id="email"
                name="email"
                type="text"
                placeholder="Insert email"
                value={email}
                onChange={onChangeHandler}
              />
            </div>
            <div className="w-full px-3">
              <label
                className="block mb-2 text-xs font-bold tracking-wide "
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="block w-full px-4 py-3 leading-tight bg-transparent border border-white rounded appearance-none focus:outline-none focus:border-fuchsia"
                type="password"
                id="password"
                name="password"
                placeholder="Insert password"
                value={password}
                onChange={onChangeHandler}
              />
            </div>
          </div>

          <button
            type="submit"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5 text-center  mb-2  my-6 mx-auto w-full btn-gradient "
            disabled={isLoading}
          >
            {isLoading ? 'Cargando...' : title}
          </button>
          {router.pathname === '/signin' && (
            <p className="py-3 text-sm text-white">
              Not registered yet? Sign Up
              <Link href="/signup">
                <a className="px-2 underline text-fuchsia move-up">here</a>
              </Link>
            </p>
          )}
        </form>
      </div>
    </Layout>
  )
}

export default AuthForm
