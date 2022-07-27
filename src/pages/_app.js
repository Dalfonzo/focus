import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { store } from '../app/store'
import Sounds from '../components/sounds'
import RouterGuard from '../components/router-guard'
import Layout from '../components/layout'
import { useLoadingHandler } from '../hooks/useLoadingHandler'
import Spinner from '../components/spinner'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  const { isLoading } = useLoadingHandler()
  let persistor = persistStore(store)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterGuard>
          <Sounds>
            <Layout>
              {isLoading ? <Spinner /> : <Component {...pageProps} />}
            </Layout>
          </Sounds>
        </RouterGuard>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
