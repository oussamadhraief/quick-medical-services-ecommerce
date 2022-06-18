import '../styles/globals.css'
import {SessionProvider} from "next-auth/react"
import ErrorBoundary from '../components/ErrorBoundary'
import ErrorFallback from '../components/ErrorFallback'



export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {

  return (
    <SessionProvider session={session}  >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Component {...pageProps} />
        </ErrorBoundary>
    </SessionProvider>
  )
}
