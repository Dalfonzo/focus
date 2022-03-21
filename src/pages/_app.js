import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { store } from '../app/store'
import Sounds from '../components/sounds'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  let persistor = persistStore(store)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Sounds>
          <Component {...pageProps} />
        </Sounds>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
