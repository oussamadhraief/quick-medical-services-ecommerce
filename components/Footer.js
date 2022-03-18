import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Footer () {
  const [isMobile, setIsMobile] = useState(false)

  const delivery = 'pfe/delivery_nexa3b.png'
  const payment = 'pfe/payment_zy8xmo.png'
  const rapidity = 'pfe/rapidity_xclfrf.png'
  const satisfaction = 'pfe/satisfait_yak5un.png'
  const facebook = 'pfe/facebook_dryelz.png'
  const location = 'pfe/location_nkg5e0.png'
  const logo = 'pfe/22BF79_2_ciuoj6.png'
  const english = 'pfe/icons8-usa-480_wogdn9.png'
  const french = 'pfe/icons8-france-480_qz3wxt.png'

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 640px)')
    if (mql.matches) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [])

  return (
    <footer className='w-full min-w-full h-fit grid bg-cool rounded-tr-[70px] mt-32 shadow-3xl'>
      <div className='h-fit py-5 px-5 w-[94%] flex justify-center gap-10 lg:gap-20 flex-wrap md:flex-nowrap items-center'>
        <div className='flex flex-nowrap justify-between gap-4 items-center w-fit h-fit'>
          <Image src={delivery} alt='' width={100} height={60} layout='fixed' />
          <p className='text-center font-medium text-sm text-third'>
            Livraison à<br />domicile
          </p>
        </div>
        <div className='flex flex-nowrap justify-between gap-4 items-center w-fit h-fit'>
          <Image src={payment} alt='' width={80} height={80} layout='fixed' />
          <p className='text-center font-medium text-sm text-third'>
            Paiement à<br />la livraison
          </p>
        </div>
        <div className='flex flex-nowrap justify-between gap-4 items-center w-fit h-fit'>
          <Image src={rapidity} alt='' width={80} height={80} layout='fixed' />
          <p className='text-center font-medium text-sm text-third'>
            Rapidité et<br />efficacité
          </p>
        </div>
        <div className='flex flex-nowrap justify-between gap-4 items-center w-fit h-fit'>
          <Image
            src={satisfaction}
            alt=''
            width={80}
            height={80}
            layout='fixed'
          />
          <p className='text-start font-medium text-sm text-third'>
            Garantie de<br />satisfaction totale
          </p>
        </div>
      </div>
      <div className='w-[98%] md:w-[94%] min-h-[350px] min-w-full gap-10 grid md:place-items-center md:px-5 lg:flex lg:justify-around items-center h-fit py-10 lg:py-20 bg-third rounded-tr-[70px]'>
        <address className='text-white grid place-items-center space-y-2 not-italic w-fit h-fit'>
          <Link href='https://www.facebook.com/QMSJRIBI'>
            <a
              target='_blank'
              className='flex items-center flex-nowrap whitespace-nowrap'
            >
              <Image
                src={facebook}
                alt='facebook'
                width={16}
                height={16}
                layout='fixed'
              />
              &nbsp;Facebook: QUICK Medical services
            </a>
          </Link>
          <p className='whitespace-nowrap'>
            &#x2709; Email: qms.jribi@gmail.com
          </p>
          <p className='whitespace-nowrap'>&#x260E; Tel: +216 44 219 218</p>

          <div className='flex items-center flex-nowrap'>
            <Image
              src={location}
              alt='location'
              width={20}
              height={20}
              layout='fixed'
            />
            <p className='whitespace-nowrap'>Sfax, Tunisie</p>
          </div>
        </address>

        <div className='text-white italic flex flex-nowrap justify-center h-fit w-fit items-center whitespace-nowrap'>
          {' '}
          Créé par&nbsp;
          <div className='font-medium text-ciel hover:cursor-pointer relative group'>
            Oussema&nbsp;
            <p className="absolute -top-[90px] -left-20 text-center bg-white hidden text-third group-hover:grid px-2 py-1 rounded-xl after:content-[''] after:absolute after:-bottom-3 after:right-24 after:border-b-0 after:border-r-[15px] after:border-r-transparent after:border-l-[15px] after:border-l-transparent after:border-t-[15px] after:border-t-white">
              Oussema Dhraief
              <br />.dhraief@gmail.com <br />
              <Link href='https://www.oussama-dhraief.tech'>
                <a target='_blank'>www.oussama-dhraief.tech</a>
              </Link>
            </p>
          </div>{' '}
          et &nbsp;
          <div className='font-medium text-secondary hover:cursor-pointer relative group'>
            Mohamed
            <p className="absolute -top-[75px] -left-16 text-center bg-white hidden text-third group-hover:grid px-3 py-2 rounded-xl after:content-[''] after:absolute after:-bottom-3 after:right-20 after:border-b-0 after:border-r-[15px] after:border-r-transparent after:border-l-[15px] after:border-l-transparent after:border-t-[15px] after:border-t-white">
              Mohamed Halouani
              <br />halouani142@gmail.com
            </p>
          </div>
          {isMobile ? <br /> : null}
          &nbsp; &#xa9; 2022, Tunisie.
        </div>
        <div className='w-fit h-fit grid hover:cursor-pointer relative place-self-center'>
          <div className='relative w-fit h-fit group'>
            <Image
              src={logo}
              alt='Quick medical services logo'
              width={120}
              height={120}
              layout='fixed'
              objectFit='center'
              onClick={() => window.scroll(0, 0)}
            />
            <p className="absolute -top-11 -left-8 text-center font-semibold bg-white hidden text-third whitespace-nowrap group-hover:block px-2 py-1 rounded-xl after:content-[''] after:absolute after:-bottom-3 after:left-20 after:border-b-0 after:border-r-[15px] after:border-r-transparent after:border-l-[15px] after:border-l-transparent after:border-t-[15px] after:border-t-white">
              QUICK Medical Services
            </p>
          </div>
          <div className='flex flex-nowrap w-fit h-fit items-center justify-center gap-3 mx-auto mt-5'>
            <div className='relative w-fit h-fit hover:cursor-pointer group-foo hover:scale-110 grayscale hover:grayscale-0'>
              <div className='absolute hidden group-foo-hover:block -bottom-8 bg-white text-third -left-3 rounded-lg w-fit h-fit font-medium px-2 py-1 mx-auto'>
                Anglais
              </div>
              <Image
                src={english}
                alt='language'
                width={40}
                height={25}
                layout='fixed'
              />
            </div>
            <div className='relative w-fit h-fit hover:cursor-pointer group-foo hover:scale-110 grayscale hover:grayscale-0'>
              <div className='absolute hidden group-foo-hover:block -bottom-8 bg-white text-third -left-4 rounded-lg w-fit h-fit font-medium px-2 py-1 mx-auto'>
                Français
              </div>
              <Image
                src={french}
                alt='language'
                width={40}
                height={25}
                layout='fixed'
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
