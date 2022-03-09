import React from 'react'
import Link from 'next/link'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen text-primary bg-background">
      <header className="flex justify-end max-w-screen-lg p-8 m-auto text-center align-middle gap-7">
        <p>
          <Link href="/configuration">Configuration</Link>
        </p>
        <p>
          <Link href="/signin">Log in</Link>
        </p>
      </header>
      <main className="max-w-screen-lg m-auto">{children}</main>
      <footer className="max-w-screen-lg pt-16 m-auto text-center">
        &copy;2022
      </footer>
    </div>
  )
}

export default Layout
