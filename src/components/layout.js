import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { SignInIcon, SignOutIcon, ProfileIcon, NutIcon, HomeIcon } from '../lib'
import { currentPageFormatter } from '../utils'
import { useAuthGuard } from '../hooks/useAuthGuard'
import { signOut } from '../features/authentication/authenticationSlice'
import { useProgressPersistence, useTimerPhaseHandler } from '../hooks'

const Layout = ({ children }) => {
  const { pathname } = useRouter()
  const { isAuthenticated } = useAuthGuard()
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.auth.user.id)
  useProgressPersistence()
  useTimerPhaseHandler()

  return (
    <div className="min-h-screen bg-background text-white-70">
      <Head>
        <title>{currentPageFormatter({ pathname })}</title>
        <meta property="og:title" content="Focus App" key="Focus App" />
        <meta
          name="description"
          content=" An app to increase productivity using the pomodoro technique"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="../favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="../favicon-16x16.png"
        />
      </Head>
      <header className="max-w-screen-lg px-4 py-8 m-auto text-center align-middle gap-7">
        <nav className="flex justify-end ">
          <Link href="/">
            <a
              className="flex items-center justify-center p-2 rounded-[5px] hover:text-white-normal move-up"
              title="Home"
            >
              <HomeIcon className="mx-2" />
              <p className="hidden sm:block">Home</p>
            </a>
          </Link>
          <Link href="/configuration">
            <a
              className="flex items-center justify-center p-2 rounded-[5px] hover:text-white-normal move-up"
              title="Configuration"
            >
              <NutIcon className="mx-2" />
              <p className="hidden sm:block">Configuration</p>
            </a>
          </Link>
          {isAuthenticated ? (
            <>
              <Link href={`/profile/${userId}`}>
                <a
                  className="flex items-center justify-center p-2 hover:text-white-normal rounded-[5px] move-up"
                  title="Profile"
                >
                  <ProfileIcon className="mx-2" />
                  <p className="hidden sm:block">Profile</p>
                </a>
              </Link>
              <button
                className="flex items-center justify-center p-2 hover:text-white-normal rounded-[5px] move-up"
                onClick={() => dispatch(signOut())}
              >
                <SignOutIcon className="mx-2" title="Sign Out" />
                <p className="hidden sm:block">Sign out</p>
              </button>
            </>
          ) : (
            <Link href="/signin">
              <a
                className="flex items-center justify-center p-2 hover:text-white-normal rounded-[5px] move-up"
                title="Sign in"
              >
                <SignInIcon className="mx-2" />
                <p className="hidden sm:block">Sign in</p>
              </a>
            </Link>
          )}
        </nav>
      </header>
      <main className="max-w-screen-lg px-4 m-auto text-white-normal fade pop">
        {children}
      </main>
      <div className="h-full min-h-[20rem] max-h-[25rem] w-full min-w-[20rem] max-w-[25rem] rounded-[50%] blur-[150px] absolute top-[10%] left-[40%] translate-x-[-40%] bg-fuchsia pulse opacity-70" />
      <div className="h-full min-h-[20rem] max-h-[25rem] w-full min-w-[20rem] max-w-[25rem] rounded-[50%] blur-[150px] absolute top-[30%] left-[60%] translate-x-[-60%] bg-teal pulse opacity-70" />
      <footer className="max-w-screen-lg pt-16 pb-8 m-auto text-center fade pop">
        &copy;2022
      </footer>
    </div>
  )
}

export default Layout
