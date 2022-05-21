import Head from 'next/head'
import Footer from '../components/Footer'
import { useSession } from "next-auth/react"
import { useEffect,useState } from 'react'
import Header from "../components/Header"
import { ActivatedModalContext } from '../utils/ActivatedModalContext'
import { CategoriesContext } from '../utils/CategoriesContext'
import { SearchContext } from '../utils/SearchContext'
import { useRouter } from 'next/router'
import { CartContext } from "../utils/CartContext"
import Link from 'next/link'
import Image from 'next/image'

export default function Home (props) {
  const { data: session, status } = useSession()

  const router = useRouter()


  const [activatedModal,setActivatedModal] = useState(false)
  const [value,setValue] = useState([])
  const [categoriesAndSubcategories,setCategoriesAndSubcategories] = useState([])
  const [search,setSearch] = useState('')
  const [cartNumber,setCartNumber] = useState(0)

  
  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch('/api/categoriesandsubcategories')
      const { data } = await res.json()
      setCategoriesAndSubcategories(data)
   }
      fetchCategories()
},[])

useEffect(() => {
  if(session)setCartNumber(session.user.cart.length)
},[session])

  
  useEffect(() => {
    if(status == 'authenticated' && (session.user.phone == null || session.user.address == null)) router.push('/login')
  })

  if (status === 'loading') {
    return (
      <div className='bg-white h-screen w-screen overflow-hidden flex items-center absolute z-[9999] left-0 top-0'>
        <div id="contact-loading" className="w-fit h-fit bg-white/70 z-[9999] mx-auto ">
          <div className="reverse-spinner "></div>
        </div>
      </div>
     )
    }


  return (
    <div id='body' className='relative'>
      <Head>
        <title>QUICK Medical Services</title>
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
        <ActivatedModalContext.Provider value={{activatedModal,setActivatedModal}}>
        <CartContext.Provider value={{cartNumber,setCartNumber}} >
        <SearchContext.Provider value={{search,setSearch}}>
        <CategoriesContext.Provider value={{categoriesAndSubcategories,setCategoriesAndSubcategories}}>
            <Header landingPage={false}  />
        </CategoriesContext.Provider>
          <div className='w-full h-fit grid place-items-center font-medium mt-14 text-na3ne3i'>
                          <p className='text-6xl text-orange font-extrabold'>PAGE NON TROUVÉE</p>
                          <div className='relative w-1/3 aspect-[46/19]'>
                              <Image src={'pfe/feelin_1_c5xhto'} alt='404' layout='fill' />
                          </div>
                          <p className='text-lg mt-5'>Veuillez nous excuser pour ce désagrément</p>
                          <Link href='/'>
                              <div className='whitespace-nowrap mt-5 flex items-center justify-center hover:text-orange'><span className='text-4xl'>&#x2190;</span>&nbsp;<span className='text-xl'>Retour à la page d&apos;acceuil</span> </div>
                          </Link>
        </div>
        </SearchContext.Provider>
        </CartContext.Provider>
        </ActivatedModalContext.Provider>
      <Footer />
    </div>
  )
}