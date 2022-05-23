import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { CartContext } from "../../../utils/CartContext"
import { CategoriesContext } from '../../../utils/CategoriesContext'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { SearchContext } from '../../../utils/SearchContext'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Orders() {
  const { data: session, status } = useSession()

  const router = useRouter()

  

  const [categoriesAndSubcategories, setCategoriesAndSubcategories] = useState(
    []
  )
  const [search, setSearch] = useState('')
  const [order,setOrder] = useState([])
  const [cartNumber,setCartNumber] = useState(0)
  const [loading,setLoading] = useState(true)


  useEffect(() => {
    const AbortController = window.AbortController;
    const abortController = new AbortController()
    async function fetchData () {
      try {
        const res = await fetch('/api/categoriesandsubcategories',{ signal: abortController.signal })
        const { data } = await res.json()
        let categories = data.map(item => item.category)
        categories = [...new Set(categories)]
        const orderedStuff = categories.map(item => orderedTable(item, data))
        setCategoriesAndSubcategories(orderedStuff)
      } catch (error) {
        console.error(error)
      }
    }
    async function fetchOrder() {
      try {
        const res = await fetch('/api/user/userorders/'+ router.query.id,{ signal: abortController.signal })
        const { data } = await res.json()
        setOrder(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    fetchOrder()
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

  function orderedTable (item, data) {
    return {
      category: item,
      subcategories: [
        ...new Set(
          data
            .filter(element => element.category == item)
            .map(elem => elem.subcategory)
        )
      ]
    }
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
      <main className='w-full h-fit flex flex-nowrap justify-center items-start px-10 mt-20'>
          <div className='w-2/12 h-fit grid'>
                <Link href='/account/information'>
                    <a className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center gap-3 border-t pl-[13px] pr-2 py-3 hover:text-black group'><Image src={'pfe/icons8-security-pass-80_cr72so.png'} alt='general informations' width={30} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100' /><p>Informations personnelles</p></a>
                </Link>
                
                <Link href='/account/estimates'>
                    <a className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center gap-3 border-t pl-[13px] pr-2 py-3 hover:text-black group'><Image src={'pfe/icons8-price-64_jp7edw.png'} alt='general informations' width={25} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100'  /><p>Historique des devis</p></a>
                </Link>
                
                <Link href='/account/orders'>
                    <a className='text-zinc-600 font-medium w-full h-fit flex flex-nowrap justify-start items-center gap-3 border-t px-2 py-3 bg-[#E7EDEE]'><Image src={'pfe/icons8-order-history-50_jafgle.png'} alt='general informations' width={25} height={25} layout='fixed'/><p>Historiques des commandes</p></a>
                </Link>
                
                <Link href='/account/password'>
                    <a className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center gap-3 border-t pl-[12px] pr-2 py-3 hover:text-black group'><Image src={'pfe/icons8-password-24_nrik4g.png'} alt='general informations' width={22} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100' /><p>Changer le mot de passe</p> </a>
                </Link>
              
                <div className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center gap-4 border-y pl-[11px] pr-2 py-3 hover:cursor-pointer hover:text-black group' onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })} ><Image src={'pfe/icons8-logout-50_ouya9u.png'} alt='general informations' width={20} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100' /> <p>Déconnexion</p></div>
  
          </div>
            <div className='w-10/12 mx-auto h-full relative px-10'>
              <Link href='/account/orders'>
                <a className='absolute left-2 -top-2 w-fit h-fit text-5xl font-bold text-zinc-400 hover:text-orange'>&#x2190;</a>
              </Link>
              <p className='text-3xl w-fit mx-auto mt-10'>
                <span className='font-medium border-b-2 border-orange'>Référence de la commande</span>:  {order._id}
              </p>
              <p className='mt-2 text-sm font-medium text-zinc-600'>Cette commande a été passée le <span className='underline'>{`${order.createdAt.substr(8,2)} ${Intl.DateTimeFormat('fr', { month: 'long' }).format(new Date(order.createdAt.substr(6,2)))} ${order.createdAt.substr(0,4)}`}</span>  et elle est actuellement <span className='underline'>{order.status}</span>. </p>
              <p className='text-2xl font-medium mt-5'>Détails de la commande</p>
              <p className='mt-5'><span className='font-medium'>Nom et prénom:</span> {order.name}</p>
              <p className='mt-5'> <span className='font-medium'>Num. de téléphone:</span> {order.phone}</p>
              <div className='mt-5 flex flex-nowrap justify-around gap-5'>
                <div className='w-72 h-fit border border-na3ne3i px-10 pb-10 pt-1 grid gap-8'><span>Adresse de livraison:</span> <p>{order.address[0]}</p></div>
                <div className='w-72 h-fit border border-na3ne3i px-10 pb-10 pt-1 grid gap-8'><span>Adresse de facturation:</span><p>{order.address[0]}</p> </div>
              </div>
              <p className='mt-5'><span className='font-medium'>Nom de clinique:</span> {order.clinicName}</p>
              <p className='mt-5'><span className='font-medium'>Matricule fiscale:</span> {order.taxRegistrationNumber}</p>
              <p className='mt-5'><span className='font-medium'>Email:</span> {order.email}</p>
              <p className='mt-5'><span className='font-medium'>Message:</span> {order.note}</p>
              
              <table className='w-full mt-10 px-10'>
                <thead>
                <tr className='border-b h-10 border-zinc-400'>
                  <th className='font-bold'>RÉFÉRENCE</th>
                  <th className='font-bold'>IMAGE</th>
                  <th className='font-bold'>NOM</th>
                  <th className='font-bold'>TAILLE</th>
                  <th className='font-bold'>QUANTITÉ</th>
                </tr>
                </thead>
                <tbody>
                  {order.cart.map((item,index) => {return(
                    <tr key={index} className='border-b'>
                      <td className='text-center font-medium'>{item.product.reference}</td>
                      <td className='w-40 h-48'><Image src={item.product.image} alt='image' width={150} height={170}  objectFit="contain" objectPosition="center"  /></td>
                      <td className='text-center font-medium'>{item.product.name}</td>
                      <td className='text-center font-medium'>{order.cart[index].size}</td>
                      <td className='text-center font-medium'>{order.cart[index].quantity}</td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
      </main>
      <Footer />
    </div>
  )
}

export async function getServerSideProps () {
  return { props: { hi: 'hi' } }
}
