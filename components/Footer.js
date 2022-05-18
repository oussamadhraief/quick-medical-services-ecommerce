import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Footer () {
  const [isMobile, setIsMobile] = useState(false)

  const facebook = 'pfe/facebook_dryelz.png'
  const location = 'pfe/location_nkg5e0.png'
  const logo = 'pfe/Quick_medical_services_4_xhplx6.png'
  const english = 'pfe/icons8-usa-480_wogdn9.png'
  const french = 'pfe/icons8-france-480_qz3wxt.png'

  return (
    <footer className='w-full min-w-full h-fit grid mt-32 shadow-3xl'>
      <div className='w-[98%] md:w-[94%] min-h-[350px] min-w-full gap-10 grid place-items-center md:px-5 lg:flex lg:justify-around items-center h-fit py-10 lg:py-20 bg-third'>
        <address className='text-white grid place-items-start space-y-2 not-italic w-fit h-fit'>
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

        <div className='text-white italic flex flex-wrap sm:flex-nowrap justify-center h-fit w-fit items-center whitespace-nowrap'>
          Créé par&nbsp;
          <p className='font-medium text-ciel hover:cursor-pointer relative group'>
            Oussema&nbsp;
            <span className="absolute -top-[90px] -left-20 text-center bg-white hidden text-third group-hover:grid px-2 py-1 rounded-xl after:content-[''] after:absolute after:-bottom-3 after:right-24 after:border-b-0 after:border-r-[15px] after:border-r-transparent after:border-l-[15px] after:border-l-transparent after:border-t-[15px] after:border-t-white">
              Oussema Dhraief
              <br />oussema.dhraief@gmail.com <br />
              <Link href='https://www.oussama-dhraief.tech'>
                <a target='_blank'>www.oussama-dhraief.tech</a>
              </Link>
            </span>
          </p>
          et &nbsp;
          <p className='font-medium text-orange hover:cursor-pointer relative group'>
            Mohamed
            <span className="absolute -top-[75px] -left-[72px] text-center bg-white hidden text-third group-hover:grid px-3 py-2 rounded-xl after:content-[''] after:absolute after:-bottom-3 after:right-20 after:border-b-0 after:border-r-[15px] after:border-r-transparent after:border-l-[15px] after:border-l-transparent after:border-t-[15px] after:border-t-white">
              Mohamed Halouani
              <br />halouani142@gmail.com
            </span>
          </p>
          &nbsp; &#xa9; 2022, Tunisie.
        </div>
          <div className='relative w-fit h-fit group cursor-pointer'>
            <Image
              src={logo}
              alt='Quick medical services logo'
              width={120}
              height={90}
              layout='fixed'
              objectFit='center'
              onClick={() => window.scroll(0, 0)}
            />
            <p className="absolute -top-11 -left-8 text-center font-semibold bg-white hidden text-third whitespace-nowrap group-hover:block px-2 py-1 rounded-xl after:content-[''] after:absolute after:-bottom-3 after:left-20 after:border-b-0 after:border-r-[15px] after:border-r-transparent after:border-l-[15px] after:border-l-transparent after:border-t-[15px] after:border-t-white">
              QUICK Medical Services
            </p>
        </div>
      </div>
    </footer>
  )
}
