import { Provider } from 'react-redux'
import { store } from '../src/app/store'
import Sounds from '../src/components/sounds'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Sounds>
        <Component {...pageProps} />
      </Sounds>
    </Provider>
  )
}

export default MyApp
