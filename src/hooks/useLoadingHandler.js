import React from 'react'
import Router from 'next/router'

export const useLoadingHandler = () => {
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    const start = () => setIsLoading(true)
    const end = () => setIsLoading(false)

    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)

    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])

  return { isLoading }
}
