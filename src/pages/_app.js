import { Provider } from 'react-redux'
import { store } from '../app/store'
import Sounds from '../components/sounds'
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
