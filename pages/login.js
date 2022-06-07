import Head from 'next/head'
import Image from 'next/image'
import LoginForm from '../components/LoginForm'
import { useRouter } from 'next/router'

export default function Login (props) {

  const router = useRouter()

  return (
    <div id='body' className='relative h-screen min-h-screen overflow-hidden w-screen'>
      <Head>
        <title>Authentification - QUICK Medical Services</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content='Medical Supply Store' />
        <meta name='robots' content='index, follow' />
        <link rel='icon' href='/logo.png' />
        <meta name='googlebot' content='index, follow' />
        <meta name='keywords' content='' />
        <meta name='image' content='' />
        <meta itemProp='name' content='QUICK Medical Services' />
        <meta itemProp='description' content='Medical Supply Store' />
        <meta property='og:title' content='QUICK Medical Services' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='' />
        <meta property='og:image' content='' />
        <meta property='og:description' content='Medical Supply Store' />
        <meta itemProp='name' content='QUICK Medical Services' />
        <meta itemProp='description' content='Medical Supply Store' />
        <meta itemProp='image' content='' />
        <meta name='twitter:card' value='summary_large_image' />
        <meta name='twitter:title' value='QUICK Medical Services' />
        <meta name='twitter:description' value='Medical Supply Store' />
        <meta name='twitter:image' value='' />
      </Head>
      <div className='px-2 sm:px-10 md:px-20 lg:px-32 flex w-screen h-screen min-h-screen overflow-hidden justify-start bg-na3ne3i'>
          <button onClick={e => router.back()} className='absolute text-white text-5xl scale-x-125 font-medium top-1 left-4'>&#x2190;</button>
        <LoginForm />
        <div className='absolute h-1/2 sm:h-3/4 aspect-square right-0 bottom-0'>
          <Image src={'pfe/Untitled_design_texm1t.png'} alt="design" layout='fill' />
        </div>
        <div className='absolute w-20 h-16 sm:h-20 sm:w-28 right-1 bottom-3'>
          <Image src={'pfe/Quick_medical_services_4_xhplx6.png'} alt="design" layout='fill' />
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps () {
  return { props: { hi: 'hi' } }
}