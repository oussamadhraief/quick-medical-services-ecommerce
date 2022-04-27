import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import RegisterForm from '../components/RegisterForm'

export default function Register () {
  return (
    <div id='body' className='relative'>
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
      <div className='px-32 flex w-screen h-screen overflow-hidden justify-end bg-na3ne3i'>
        <Link href='/'>
          <a className='absolute text-white text-5xl scale-x-125 font-medium top-0 left-14 z-10'>&#x2190;</a>
        </Link>
        <RegisterForm />
        <div className='absolute h-full aspect-square left-0 bottom-0'>
          <Image src={'pfe/Untitled_design_g74cig.png'} alt="design" layout='fill' />
        </div>
        <div className='absolute h-20 w-24 left-1 bottom-3'>
          <Image src={'pfe/Quick_medical_services_4_xhplx6.png'} alt="design" layout='fill' />
        </div>
      </div>
    </div>
  )
}