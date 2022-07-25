import '../styles/globals.css'
import '../styles/app.scss'
import type { AppProps } from 'next/app'
import { wrapper } from '../redux/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
			<Component {...pageProps} />
	)
}

export default wrapper.withRedux(MyApp)