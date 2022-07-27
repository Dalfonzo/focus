import React from 'react'

const ErrorMessage = () => {
  return (
    <div className="relative my-[6rem] z-1">
      <h1 className="font-bold text-center text-9xl">UPS...</h1>
      <h2 className="text-4xl font-bold text-center">
        Something went wrong :(
      </h2>
      <p className="my-4 text-center">Please try again later</p>
    </div>
  )
}

export default ErrorMessage
