import '../styles/globals.css'
import {SessionProvider} from "next-auth/react"
import { useSession } from "next-auth/react"



export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {

  return (
    <SessionProvider session={session}  >
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

function Auth({ children }) {
  const { status } = useSession({ required: true})

  if (status === 'loading') {
    return (
      <div className='bg-white h-screen w-screen overflow-hidden flex items-center absolute z-[9999] left-0 top-0'>
        <div id="contact-loading" className="w-fit h-fit bg-white/70 z-[9999] mx-auto ">
          <div className="reverse-spinner "></div>
        </div>
      </div>
     )
    }

  return children
}
