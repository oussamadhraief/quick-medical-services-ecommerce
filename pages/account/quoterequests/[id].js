import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Modal from '../../../components/Modal'
import Notification from '../../../components/Notification'
import { CartContext } from "../../../utils/CartContext"
import { CategoriesContext } from '../../../utils/CategoriesContext'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { SearchContext } from '../../../utils/SearchContext'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Quote() {
  const { data: session, status } = useSession()

  const router = useRouter()

  const dashboardScroller = useRef()  

  const [categoriesAndSubcategories, setCategoriesAndSubcategories] = useState(
    []
  )
  const [search, setSearch] = useState('')
  const [quote,setQuote] = useState([])
  const [cartNumber,setCartNumber] = useState(0)
  const [loading,setLoading] = useState(true)
  const [showNotification,setShowNotification] = useState(false)
  const [message,setMessage] = useState('')
  const [show, setShow] = useState(false)
  const [addToCartReference,setAddToCartReference] = useState('')



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
    async function fetchOrder() {
      try {
        const res = await fetch('/api/user/userquoterequests/'+ router.query.id,{ signal: abortController.signal })
        const { data } = await res.json()
        setQuote(data)
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

  const scrollLeft = () => {
    dashboardScroller.current.scroll(dashboardScroller.current.scrollLeft - 150,0)
  }

  const scrollRight = () => {
    dashboardScroller.current.scroll(dashboardScroller.current.scrollLeft + 150,0)
  }

  async function handleAddToCart() {
    try {
        const res = await fetch('/api/user/addproducttocart', {
          method : 'PATCH',
          headers:{
              'accept' : 'application/json',
              'Content-Type' : 'application/json'
          },
          body : JSON.stringify({reference : addToCartReference})
      })
      const { cart } = await res.json()
      if(cartNumber < cart) {

        setCartNumber(cart)
        setShowNotification(false)
        setMessage('Le produit a été ajouté au panier')
        setShowNotification(true)
      }else{
        setCartNumber(cart)
        setShowNotification(false)
        setMessage('Le produit déjà existe dans votre panier')
        setShowNotification(true)
      }
    } catch (error) {
      console.error(error)
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
      <main className='w-full h-fit grid place-content-center place-items-center overflow-hidden lg:flex flex-nowrap justify-center items-start px-2 mt-20'>
          <div className='w-screen lg:w-80 h-fit flex justify-start items-center'>
            <button className='relative bg-white w-7 h-full z-[90] font-bold text-2xl block lg:hidden' onClick={e => scrollLeft()}><Image src={'pfe/arrow-right-3098_-_Copy_hsxwaz'} alt='arrow' width={20} height={20} layout='fixed' className='hover:scale-x-125' /></button>
            <div ref={dashboardScroller} className='noScrollBar w-full h-fit lg:grid overflow-x-auto flex'>
                <Link href='/account/information'>
                      <a className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center pr-5 gap-3 border-t pl-[10px] py-3 hover:text-black group whitespace-nowrap'><Image src={'pfe/icons8-security-pass-80_cr72so.png'} alt='general informations' width={30} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100' /><p>Informations personnelles</p></a>
                  </Link>
                  
                  <Link href='/account/quoterequests'>
                      <a className='text-zinc-600 font-medium w-full h-fit flex flex-nowrap justify-start items-center pr-5 gap-3 border-t pl-3 py-3 bg-harvey whitespace-nowrap'><Image src={'pfe/icons8-price-64_jp7edw.png'} alt='general informations' width={25} height={25} layout='fixed'   /><p>Historique des devis</p></a>
                  </Link>
                  
                  <Link href='/account/orders'>
                      <a className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center pr-5 gap-3 border-t pl-[10px] py-3 hover:text-black group whitespace-nowrap'><Image src={'pfe/icons8-order-history-50_jafgle.png'} alt='general informations' width={25} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100' /><p>Historiques des commandes</p></a>
                  </Link>
                  
                  <Link href='/account/password'>
                      <a className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center pr-5 gap-3 border-t pl-[12px] py-3 hover:text-black group whitespace-nowrap'><Image src={'pfe/icons8-password-24_nrik4g.png'} alt='general informations' width={22} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100' /><p>Changer le mot de passe</p> </a>
                  </Link>
                
                  <button className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center pr-5 gap-4 border-y pl-[11px] py-3 hover:cursor-pointer hover:text-black group' onClick={() => signOut({ callbackUrl: window.location.origin+'/login' })} ><Image src={'pfe/icons8-logout-50_ouya9u.png'} alt='general informations' width={20} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100' /> Déconnexion</button>
            </div>
              <button className='relative  bg-white w-7 h-full z-[90] font-bold text-2xl block lg:hidden' onClick={e => scrollRight()}><Image src={'pfe/arrow-right-3098_eujgfr'} alt='arrow' width={20} height={20} layout='fixed' className='hover:scale-x-125' /></button>
                
  
          </div>
          <div className='w-full lg:w-full mx-auto h-fit px-2 py-10 overflow-x-auto relative lg:p-10'>

            
          <Link href='/account/quoterequests'>
                <a className='absolute left-2 -top-2 w-fit h-fit text-5xl font-bold text-zinc-400 hover:text-orange'>&#x2190;</a>
              </Link>

          <div className='flex justify-between items-center w-fit border-b border-zinc-400 pb-1'>
          <p className='text-sm font-medium text-zinc-600 h-fit whitespace-nowrap w-fit'>Cette demande de devis a été passée le <span className='underline'>{`${quote.createdAt.substr(8,2)} ${Intl.DateTimeFormat('fr', { month: 'long' }).format(new Date(quote.createdAt.substr(6,2)))} ${quote.createdAt.substr(0,4)}`}</span>  et elle est actuellement <span className='underline'>{quote.status}</span>. </p>
                    </div>
                    <div className='grid gap-4 mt-2'>

                    <p className='font-medium text-lg w-full text-center'> <span className='text-na3ne3i underline text-xl'>Référence de la demande de devis:</span>&nbsp; {quote._id}</p>
                    
                    <p className='font-medium'> <span className='text-na3ne3i text-lg'>Nom et prénom:</span>&nbsp; {quote.name}</p>
                    <p className='font-medium'> <span className='text-na3ne3i text-lg'>E-mail:</span>&nbsp; {quote.email}</p>
                    <p className='font-medium'> <span className='text-na3ne3i text-lg'>Num. de téléphone:</span>&nbsp; {quote.phoneNumber}</p>
                    <p className='font-medium break-words overflow-hidden'> <span className='text-na3ne3i text-lg'>Message:</span> &nbsp;{quote.note}</p>
                    {
                    quote.price != null && quote.message != null ? 
                    <>
                    <p className='w-fit font-medium text-pinky underline'>Réponse de l&apos;administrateur:</p>
                    <p className='font-medium'> <span className='text-na3ne3i text-lg'>Prix:</span>&nbsp; {quote.price} TND</p>
                    <p className='font-medium break-words overflow-hidden'> <span className='text-na3ne3i text-lg'>Message:</span> &nbsp;{quote.message}</p>
                    </>
                    : <p className='text-third font-medium'>L&apos;administateur n&apos;a pas encore répondu à votre demande.</p>
                    }
                    <table className='w-full mt-10 px-10'>
                <thead>
                <tr className='border-b h-10 border-zinc-400'>
                  <th className='font-bold'>RÉFÉRENCE</th>
                  <th className='font-bold'>IMAGE</th>
                  <th className='font-bold'>NOM</th>
                  <th className='font-bold'>TAILLE</th>
                  <th className='font-bold px-1'>QUANTITÉ</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                  {quote.cart.map((item,index) => {return(
                    <tr key={index} className='border-b'>
                      <td className='text-center font-medium'>{item.product.reference}</td>
                      <td className='w-40 h-48'><Image src={item.product.image} alt='image' width={150} height={170} layout='fixed' objectFit="contain" objectPosition="center"  /></td>
                      <td className='text-center font-medium px-1'>
                        <Link href={'/products/' + item.product.reference} >
                          <a className='hover:underline' target='_blank'>{item.product.name}</a>
                        
                        </Link>
                        </td>
                      <td className='text-center font-medium px-1'>{quote.cart[index].size} cm</td>
                      <td className='text-center font-medium px-1'>{quote.cart[index].quantity}</td>
                      <td className='w-52 h-fit px-1'>
                        {item.product.archived ? 
                        <p className='font-medium w-fit h-fit bg-zinc-200 px-3 py-1 rounded hover:cursor-not-allowed transition-all relative group whitespace-nowrap'>
                          Ajouter au panier
                          <p className='absolute -left-10 w-32 h-fit mx-auto bottom-[120%] hidden group-hover:block whitespace-nowrap text-red-500 font-normal'>Ce produit n&apos;est plus disponible.</p>
                        </p> : 
                        <button onClick={e=> {
                          setShow(true)
                          setAddToCartReference(item.product.reference)
                        }} className='font-medium mx-auto w-fit h-fit bg-na3ne3i shadow-[0px_3px_10px_rgba(25,98,102,0.5)] px-3 py-1 rounded text-white hover:bg-pinky hover:shadow-[0px_3px_10px_rgba(247,177,162,0.5)] hover:scale-110 transition-all whitespace-nowrap'>Ajouter au panier</button>}
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
                </div>
        </div>
        <Modal show={show} onClose={() => setShow(false)} onConfirm={() => handleAddToCart()} action={'add'} content={'Êtes-vous sûr de vouloir ajouter ce produit au panier?'} />
          <Notification show={showNotification} setShow={setShowNotification} message={message} />
      </main>
      <Footer />
    </div>
  )
}

export async function getServerSideProps () {
  return { props: { hi: 'hi' } }
}
