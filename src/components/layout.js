import React from 'react'
import Link from 'next/link'
import { BsNutFill } from 'react-icons/bs'
import { FaUserAstronaut } from 'react-icons/fa'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-white-70">
      <header className="max-w-screen-lg px-4 py-8 m-auto text-center align-middle gap-7 fade pop ">
        <nav className="flex justify-end ">
          <Link href="/configuration">
            <a className="flex items-center justify-center p-2 rounded-[5px] hover:text-white-normal transition-all ease-in-out delay-75 move-up">
              <BsNutFill className="mx-2" />
              Configuration
            </a>
          </Link>
          <Link href="/signin">
            <a className="flex items-center justify-center p-2 ml-4 hover:text-white-normal rounded-[5px] move-up">
              <FaUserAstronaut className="mx-2" />
              Log in
            </a>
          </Link>
        </nav>
      </header>
      <main className="max-w-screen-lg px-4 m-auto text-white-normal fade pop">
        {children}
      </main>
      <div className="h-full min-h-[20rem] max-h-[25rem] w-full min-w-[20rem] max-w-[25rem] rounded-[50%] blur-[150px] absolute top-[10%] left-[40%] translate-x-[-40%] bg-fuchsia pulse opacity-70" />
      <div className="h-full min-h-[20rem] max-h-[25rem] w-full min-w-[20rem] max-w-[25rem] rounded-[50%] blur-[150px] absolute top-[30%] left-[60%] translate-x-[-60%] bg-teal pulse opacity-70" />
      <footer className="max-w-screen-lg pt-16 pb-8 m-auto text-center  fade pop">
        &copy;2022
      </footer>
    </div>
  )
}

export default Layout
