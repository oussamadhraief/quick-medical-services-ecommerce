import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import OrderComponent from '../../../components/OrderComponent'
import { CategoriesContext } from '../../../utils/CategoriesContext'
import { useEffect, useState,useRef } from 'react'
import Image from 'next/image'
import { SearchContext } from '../../../utils/SearchContext'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"
import Head from 'next/head'
import { useRouter } from 'next/router'
import { CartContext } from "../../../utils/CartContext"


export default function Orders() {
  const { data: session, status } = useSession()

  const router = useRouter()

  const dashboardScroller = useRef()

  const [categoriesAndSubcategories, setCategoriesAndSubcategories] = useState(
    []
  )
  const [search, setSearch] = useState('')
  const [orders,setOrders] = useState([])
  const [loading,setLoading] = useState(true)
  const [cartNumber,setCartNumber] = useState(0)


  useEffect(() => {
    const AbortController = window.AbortController;
    const abortController = new AbortController()
    async function fetchData () {
      try {
        const res = await fetch('/api/categoriesandsubcategories',{ signal: abortController.signal })
        const { data } = await res.json()
        setCategoriesAndSubcategories(data)
      } catch (error) {
        console.error(error)
      }
    }
    async function fetchOrders() {
      try {
        const res = await fetch('/api/user/userorders',{ signal: abortController.signal })
        const { data } = await res.json()
        setOrders(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    fetchOrders()
    fetchData()
    return () => {
      abortController.abort();
    }
  }, [])

  useEffect(() => {
    if(session){
      async function fetchCart(){
          const res = await fetch('/api/user/usercart')
          const { data } = await res.json()
          setCartNumber(data.length)
      }
      fetchCart()
    }
  },[status])

    const scrollLeft = () => {
      dashboardScroller.current.scroll(dashboardScroller.current.scrollLeft - 150,0)
    }

    const scrollRight = () => {
      dashboardScroller.current.scroll(dashboardScroller.current.scrollLeft + 150,0)
    }

  if(status == 'loading' || loading) return  (
    <div className='bg-white h-screen w-screen overflow-hidden flex items-center absolute z-[9999] left-0 top-0'>
      <div id="contact-loading" className="w-fit h-fit bg-white/70 z-[9999] mx-auto ">
        <div className="reverse-spinner "></div>
      </div>
    </div>
   )
   
   if(status == 'unauthenticated') {
    router.push('/login')  
    return null
   }


  return (
    <div>
      <Head>
        <title>Mes commandes - QUICK Medical Services</title>
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
      <CategoriesContext.Provider
        value={{ categoriesAndSubcategories, setCategoriesAndSubcategories }}
      >
        <SearchContext.Provider value={{ search, setSearch }}>
        <CartContext.Provider value={{cartNumber,setCartNumber}} >
                <Header landingPage={false}  />
            </CartContext.Provider>
        </SearchContext.Provider>
      </CategoriesContext.Provider>
      <main className='w-full h-fit grid place-content-center place-items-center overflow-hidden lg:flex flex-nowrap justify-center items-start px-2 mt-20'>
          <div className='w-screen lg:w-80 h-fit flex justify-start items-center'>
            <button className='relative bg-white w-7 h-full z-[90] font-bold text-2xl block lg:hidden' onClick={e => scrollLeft()}><Image src={'pfe/arrow-right-3098_-_Copy_hsxwaz'} alt='arrow' width={20} height={20} layout='fixed' className='hover:scale-x-125' /></button>
            <div ref={dashboardScroller} className='noScrollBar h-fit lg:grid w-full overflow-x-auto flex'>
                <Link href='/account/information'>
                      <a className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center pr-5 gap-3 border-t pl-[13px] py-3 hover:text-black group whitespace-nowrap'><Image src={'pfe/icons8-security-pass-80_cr72so.png'} alt='general informations' width={30} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100' /><p>Informations personnelles</p></a>
                  </Link>
                  
                  <Link href='/account/quoterequests'>
                      <a className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center pr-5 gap-3 border-t pl-[13px] py-3 hover:text-black group whitespace-nowrap'><Image src={'pfe/icons8-price-64_jp7edw.png'} alt='general informations' width={25} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100'  /><p>Historique des devis</p></a>
                  </Link>
                  
                  <Link href='/account/orders'>
                      <a className='text-zinc-600 font-medium w-full h-fit flex flex-nowrap justify-start items-center pr-5 gap-3 border-t pl-2.5 py-3 bg-harvey whitespace-nowrap'><Image src={'pfe/icons8-order-history-50_jafgle.png'} alt='general informations' width={25} height={25} layout='fixed'/><p>Historiques des commandes</p></a>
                  </Link>
                  
                  <Link href='/account/password'>
                      <a className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center pr-5 gap-3 border-t pl-[12px] py-3 hover:text-black group whitespace-nowrap'><Image src={'pfe/icons8-password-24_nrik4g.png'} alt='general informations' width={22} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100' /><p>Changer le mot de passe</p> </a>
                  </Link>
                
                  <button className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center pr-5 gap-4 border-y pl-[11px] py-3 hover:cursor-pointer hover:text-black group' onClick={() => signOut({ callbackUrl: window.location.origin+'/login' })} ><Image src={'pfe/icons8-logout-50_ouya9u.png'} alt='general informations' width={20} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100' /> Déconnexion</button>
            </div>
              <button className='relative  bg-white w-7 h-full z-[90] font-bold text-2xl block lg:hidden' onClick={e => scrollRight()}><Image src={'pfe/arrow-right-3098_eujgfr'} alt='arrow' width={20} height={20} layout='fixed' className='hover:scale-x-125' /></button>
                
  
          </div>
          <div className='w-full lg:w-full mx-auto h-fit pl-0 lg:pl-2 overflow-x-auto'>
          {orders.length <1  ? <p className="w-full text-center h-fit mx-auto font-medium text-third mt-2">Pas de résultats trouvés :&#x28; ...</p> :
            
            <table className=' w-full h-fit'>
                <thead className='w-full h-12 border-b border-zinc-400'>
                    <tr>
                    <th className='bg-white text-sm'>Référence</th>
                    <th className='bg-white text-sm'>Adresse de livraison</th>
                    <th className='bg-white text-sm'>Adresse de facturation</th>
                    <th className='bg-white text-sm'>Num. de téléphone</th>
                    <th className='bg-white text-sm'>Date</th>
                    <th className='bg-white text-sm'>Email</th>
                    <th className='bg-white text-sm'>Status</th>
                    <th></th>
                    </tr>
                    
                </thead>
              <tbody className='w-full'>
                {orders.map(item => {
                if(item.address.length == 1 ) return (<OrderComponent key={item._id} id={item._id} createdAt={item.createdAt} phoneNumber={item.phoneNumber} status={item.status} email={item.email} address={item.address[0]} city={item.city[0]} country={item.country[0]} zipCode={item.zipCode[0]} address2={item.address[0]} city2={item.city[0]} country2={item.country[0]} zipCode2={item.zipCode[0]} />)
                return (<OrderComponent key={item._id} id={item._id} createdAt={item.createdAt} phoneNumber={item.phoneNumber} status={item.status} email={item.email} address={item.address[0]} city={item.city[0]} country={item.country[0]} zipCode={item.zipCode[0]} address2={item.address[1]} city2={item.city[1]} country2={item.country[1]} zipCode2={item.zipCode[1]} />)
              })}
              </tbody>
            </table>
}
          </div>
      </main>
      <Footer />
    </div>
  )
}

export async function getServerSideProps () {
  return { props: { hi: 'hi' } }
}
