import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { store } from '../app/store'
import Sounds from '../components/sounds'
import RouterGuard from '../components/router-guard'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  let persistor = persistStore(store)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterGuard>
          <Sounds>
            <Component {...pageProps} />
          </Sounds>
        </RouterGuard>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
