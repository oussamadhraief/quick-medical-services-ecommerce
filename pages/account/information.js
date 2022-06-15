import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Modal from '../../components/Modal'
import { CategoriesContext } from '../../utils/CategoriesContext'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { SearchContext } from '../../utils/SearchContext'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"
import Head from 'next/head'
import { useRouter } from 'next/router'
import { CartContext } from "../../utils/CartContext"


export default function Information () {
  const { data: session, status } = useSession()

  const router = useRouter()
  const dashboardScroller = useRef()
  const saveAccountDataButton = useRef()


  const [categoriesAndSubcategories, setCategoriesAndSubcategories] = useState(
    []
  )
  const [search, setSearch] = useState('')
  const [information,setInformation] = useState({name: '',phone: ''})
  const [firstAddress,setFirstAddress] = useState({address: '',city: '', country: '', zipCode: null})
  const [editingFirstAddress,setEditingFirstAddress] = useState(false)
  const [secondAddress,setSecondAddress] = useState({address: '',city: '', country: '', zipCode: null})
  const [editingSecondAddress,setEditingSecondAddress] = useState(false)
  const [NullAddresses,setNullAddresses] = useState(false)
  const [show,setShow] = useState(false)
  const [open,setOpen] = useState(false)
  const [open2,setOpen2] = useState(false)
  const [cartNumber,setCartNumber] = useState(0)


  const handleChange = e => {
    saveAccountDataButton.current.disabled = false
    setInformation({
        ...information,
        [e.target.name]: e.target.value
      }
    )
  }

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
        
      setInformation({
        name: session.user.name,
        phone: session.user.phone,
      })

      if (session.user.address.length == 1) {
        setFirstAddress({
          address: session.user.address[0],
          city: session.user.city[0],
          country: session.user.country[0],
          zipCode: session.user.zipCode[0]
        })
        setSecondAddress({
          address: session.user.address[0],
        city: session.user.city[0],
        country: session.user.country[0],
        zipCode: session.user.zipCode[0]
        })
      }

      if (session.user.address.length == 2) {
        setFirstAddress({
          address: session.user.address[0],
          city: session.user.city[0],
          country: session.user.country[0],
          zipCode: session.user.zipCode[0]
        })
      setSecondAddress({
        address: session.user.address[1],
        city: session.user.city[1],
        country: session.user.country[1],
        zipCode: session.user.zipCode[1]
      })
    }

    if (session.user.address.length == 0) {
      setNullAddresses(true)
    }
  }
  },[status])

  const handleSubmit = async () => {
    try {
      await fetch('/api/updatenameandphone',{
        method: 'PATCH',
        headers: {
          "Accept" : "application/json",
          "Content-type" : "application/json"
        },
        body: JSON.stringify(information)
      })
      location.reload()
    } catch (error) {
      console.error(error);
    }
    
  }

  const handleFirstAddressChange = e => {
    setFirstAddress({
      ...firstAddress,
      [e.target.name]: e.target.value
    }
  )
  }

  const handleFirstAddressSubmit = async () => {
    try {
      await fetch('/api/updateuseraddress',{
        method: 'PATCH',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          address: firstAddress,
          addressType: 'first'
        })
      })
      location.reload()
    } catch (error) {
      console.error(error);
    }
    
  }

  const handleSecondAddressChange = e => {
    setSecondAddress({
      ...secondAddress,
      [e.target.name]: e.target.value
    }
  )
  }

  const handleSecondAddressSubmit = async () => {
    try {
      await fetch('/api/updateuseraddress',{
        method: 'PATCH',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          address: secondAddress,
          addressType: 'second'
        })
      })
      location.reload()
    } catch (error) {
      console.error(error);
    }
   
  }

  const scrollLeft = () => {
    dashboardScroller.current.scroll(dashboardScroller.current.scrollLeft - 150,0)
  }

  const scrollRight = () => {
    dashboardScroller.current.scroll(dashboardScroller.current.scrollLeft + 150,0)
  }

 

  if(status == 'loading') return  (
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
        <title>Mon compte - QUICK Medical Services</title>
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
                      <a className='text-zinc-600 font-medium w-full h-fit flex flex-nowrap justify-start items-center pr-5 gap-3 border-t pl-2 py-3 bg-harvey whitespace-nowrap'><Image src={'pfe/icons8-security-pass-80_cr72so.png'} alt='general informations' width={30} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100' /><p>Informations personnelles</p></a>
                  </Link>
                  
                  <Link href='/account/quoterequests'>
                      <a className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center pr-5 gap-3 border-t pl-[13px] py-3 hover:text-black group whitespace-nowrap'><Image src={'pfe/icons8-price-64_jp7edw.png'} alt='historique' width={25} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100'  /><p>Historique des devis</p></a>
                  </Link>
                  
                  <Link href='/account/orders'>
                      <a className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center pr-5 gap-3 border-t pl-[13px] py-3 hover:text-black group whitespace-nowrap'><Image src={'pfe/icons8-order-history-50_jafgle.png'} alt='historique' width={25} height={25} layout='fixed'/><p>Historiques des commandes</p></a>
                  </Link>
                  
                  <Link href='/account/password'>
                      <a className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center pr-5 gap-3 border-t pl-[12px] py-3 hover:text-black group whitespace-nowrap'><Image src={'pfe/icons8-password-24_nrik4g.png'} alt='mot de passe' width={22} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100' /><p>Changer le mot de passe</p> </a>
                  </Link>
                
                  <button className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center pr-5 gap-4 border-y pl-[11px] py-3 hover:cursor-pointer hover:text-black group' onClick={() => signOut({ callbackUrl: window.location.origin+'/login' })} ><Image src={'pfe/icons8-logout-50_ouya9u.png'} alt='Déconnexion' width={20} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100' /> Déconnexion</button>
            </div>
              <button className='relative  bg-white w-7 h-full z-[90] font-bold text-2xl block lg:hidden' onClick={e => scrollRight()}><Image src={'pfe/arrow-right-3098_eujgfr'} alt='arrow' width={20} height={20} layout='fixed' className='hover:scale-x-125' /></button>
                
  
          </div>
          <div className='w-full lg:w-full mx-auto h-fit px-2 py-10 overflow-auto relative lg:py-10 lg:px-2'>

          <form onSubmit={e => {
            e.preventDefault()
            setShow(true)
          }} className='max-w-full lg:max-w-[836px] w-full h-fit grid gap-16 mb-10 px-2 lg:px-10'>
              <p className='font-medium text-xl lg:text-3xl mx-auto'>Vos <span className='border-b border-pinky'>informations personnelles</span> </p>
              <label className='font-medium lg:w-11/12 flex flex-wrap lg:flex-nowrap justify-between'>Nom et prénom:
                  <input type="text" required minLength={4} onChange={e => handleChange(e)} name="name" value={information.name} placeholder='Nom et prénom' className='outline-none border-b min-w-[300px] w-full md:w-8/12'/>
              </label>
              <label className='font-medium lg:w-11/12 flex flex-wrap lg:flex-nowrap justify-between'>Num de téléphone:
                  <input type="number" required max='10000000000000'
              min='10000000' onChange={e => handleChange(e)} name="phone" value={information.phone} placeholder='Num. de téléphone' className='removeArrows outline-none border-b min-w-[300px] w-full md:w-8/12' />
              </label>
              <button ref={saveAccountDataButton} type="submit" disabled className='saveAccountDataButton w-fit h-fit bg-pinky shadow-[0px_3px_10px_rgba(247,177,162,0.5)] text-white px-5 py-1.5 lg:py-2.5 rounded-md font-medium hover:scale-105 transition-all mx-auto disabled:bg-zinc-300 disabled:text-zinc-600 disabled:shadow-none disabled:hover:scale-100'>Enregistrer</button>
          </form>

          <div className='mx-auto xl:mx-0 grid w-fit gap-5'>
            
                <p className='text-xl font-medium w-fit mx-auto'>Modifer <span className='border-b-2 border-pinky'> vos adresses</span>: </p>
                <div className='grid xl:flex flex-nowrap w-fit h-fit gap-16'>
              <form onSubmit={e => {
                e.preventDefault()
                setOpen(true)
              }}  className='w-80 sm:w-96 h-fit grid  relative  rounded-md px-5 pt-4 pb-10 border border-na3ne3i'>
                <p className={editingFirstAddress ?  "w-fit h-fit font-medium after:content-[''] after:absolute after:top-[200%] after:left-0 after:bg-na3ne3i after:h-[1px] after:sm:w-[346px] after:w-[280px] relative " : "w-fit h-fit font-medium after:content-[''] after:absolute after:top-[111%] after:left-0 after:bg-na3ne3i after:h-[1px] after:sm:w-[346px] after:w-[280px] relative "}>Adresse de facturation</p>
                {
                  editingFirstAddress ? <>
                  <input type="text" name="address" value={firstAddress.address} required onChange={e => handleFirstAddressChange(e)} className='w-full border-b border-na3ne3i h-6 outline-none mt-10' placeholder='Adresse' />
                  <input type="text" name="city" value={firstAddress.city} required onChange={e => handleFirstAddressChange(e)} className='w-full border-b border-na3ne3i h-6 outline-none mt-10' placeholder='Ville' />
                  <input type="text" name="country" value={firstAddress.country} required onChange={e => handleFirstAddressChange(e)} className='w-full border-b border-na3ne3i h-6 outline-none mt-10' placeholder='Pays' />
                  <input type="Number" name="zipCode" value={firstAddress.zipCode} required onChange={e => handleFirstAddressChange(e)} className='w-full border-b border-na3ne3i h-6 outline-none mt-10' placeholder='Code postal' />
                  </> : 
                  NullAddresses ?
                  <p className='my-10'>Auncune adresse insérée</p>
                  
                   : 
                   <>
                   <p className='w-full mt-5 text-ellipsis overflow-hidden'> <span className='text-na3ne3i font-medium'>Adresse:</span> {firstAddress.address}</p>
                   <p className='w-full mt-5 text-ellipsis overflow-hidden'> <span className='text-na3ne3i font-medium'>Ville:</span> {firstAddress.city}</p>
                   <p className='w-full mt-5 text-ellipsis overflow-hidden'> <span className='text-na3ne3i font-medium'>Pays:</span> {firstAddress.country}</p>
                   <p className='w-full mt-5 text-ellipsis overflow-hidden'> <span className='text-na3ne3i font-medium'>Code postal:</span> {firstAddress.zipCode}</p>
                   </>
                }
                
                <div className='absolute top-4 right-5  grid sm:flex flex-nowrap items-center'>
                    {editingFirstAddress ? 
                    <>
                    <button type='button' onClick={e => {
                    setEditingFirstAddress(false)
                      if(session.user.address.length >1 )
                      setFirstAddress({
                        address: session.user.address[0],
                        city: session.user.city[0],
                        country: session.user.country[0],
                        zipCode: session.user.zipCode[0]
                      })
                      if(session.user.address.length == 0){
                        setFirstAddress({
                          address: '',
                          city: '',
                          country: '',
                          zipCode: ''
                        })
                      }

                  }} className='mr-1 text-na3ne3i underline text-sm font-medium'>annuler</button>
                  <button type='submit' className='bg-pinky px-2 rounded text-white'>Enregistrer</button> 
                  </> :                  
                  <button type='button' onClick={e => {
                      setEditingFirstAddress(true)
                    }} className='bg-pinky px-1 rounded-md text-white'>{NullAddresses ? 'Ajouter' : 'Modifier'}</button> 
                }
            
                </div> 
              </form>






              <form onSubmit={e => {
                e.preventDefault()
                setOpen2(true)
                }} className='grid w-80 sm:w-96 h-fit relative rounded-md px-5 pt-4 pb-10 border border-na3ne3i'>
              <p className={editingSecondAddress ?  "w-fit h-fit font-medium after:content-[''] after:absolute after:top-[200%] after:left-0 after:bg-na3ne3i after:h-[1px] after:sm:w-[346px] after:w-[280px] relative " : "w-fit h-fit font-medium after:content-[''] after:absolute after:top-[111%] after:left-0 after:bg-na3ne3i after:h-[1px] after:sm:w-[346px] after:w-[280px] relative "}>Adresse de livraison</p>
              {
                  editingSecondAddress ? 
                  <>
                  <input type="text" name="address" value={secondAddress.address} required onChange={e => handleSecondAddressChange(e)} className='w-full border-b border-na3ne3i h-6 outline-none mt-10' placeholder='Adresse' />
                  <input type="text" name="city" value={secondAddress.city} required onChange={e => handleSecondAddressChange(e)} className='w-full border-b border-na3ne3i h-6 outline-none mt-10' placeholder='Ville' />
                  <input type="text" name="country" value={secondAddress.country} required onChange={e => handleSecondAddressChange(e)} className='w-full border-b border-na3ne3i h-6 outline-none mt-10' placeholder='Pays' />
                  <input type="Number" name="zipCode" value={secondAddress.zipCode} required onChange={e => handleSecondAddressChange(e)} className='w-full border-b border-na3ne3i h-6 outline-none mt-10' placeholder='Code postal' />
                  </>
                  :
                NullAddresses ? <p className='my-10'>Auncune adresse insérée</p>
                :
                   <>
                   <p className='w-full mt-5 text-ellipsis overflow-hidden'> <span className='text-na3ne3i font-medium'>Adresse:</span> {secondAddress.address}</p>
                   <p className='w-full mt-5 text-ellipsis overflow-hidden'> <span className='text-na3ne3i font-medium'>Ville:</span> {secondAddress.city}</p>
                   <p className='w-full mt-5 text-ellipsis overflow-hidden'> <span className='text-na3ne3i font-medium'>Pays:</span> {secondAddress.country}</p>
                   <p className='w-full mt-5 text-ellipsis overflow-hidden'> <span className='text-na3ne3i font-medium'>Code Postal:</span> {secondAddress.zipCode}</p>
                  </>
                }
                
                <div className='absolute top-4 right-5  grid sm:flex flex-nowrap items-center'>
                {editingSecondAddress ? <> <button type='button' onClick={e => {
                setEditingSecondAddress(false)
                if(session.user.address.length == 1){
                  setSecondAddress({
                    address: session.user.address[0],
                    city: session.user.city[0],
                    country: session.user.country[0],
                    zipCode: session.user.zipCode[0]
                  })
                }
                if(session.user.address.length == 2){
                  setSecondAddress({
                    address: session.user.address[1],
                    city: session.user.city[1],
                    country: session.user.country[1],
                    zipCode: session.user.zipCode[1]
                  })
                }
                if(session.user.address.length == 0){
                  setSecondAddress({
                    address: '',
                    city: '',
                    country: '',
                    zipCode: ''
                  })
                }
              }} className='mr-1 text-na3ne3i underline text-sm font-medium'>annuler</button>
              <button type="submit" className='bg-pinky px-2 text-white rounded '>Enregistrer</button> 
              </> : 
              <button type='button' onClick={e => {
                setEditingSecondAddress(true)
                }} className='bg-pinky px-1 rounded-md text-white'>{NullAddresses ? 'Ajouter' : 'Modifier'}</button> 
                }
                </div>
              </form>




            </div>
          </div>
        </div> 
        <Modal key='informations' show={show} onClose={() => setShow(false)} onConfirm={() => handleSubmit()} action={'add'} content={'Êtes-vous sûr de vouloir modifier vos informations?'} />
        <Modal key='adresse1' show={open} onClose={() => setOpen(false)} onConfirm={() => handleFirstAddressSubmit()} action={'add'} content={'Êtes-vous sûr de vouloir modifier votre adresse de facturation?'} />
        <Modal key='adresse2' show={open2} onClose={() => setOpen2(false)} onConfirm={() => handleSecondAddressSubmit()} action={'add'} content={'Êtes-vous sûr de vouloir modifier votre adresse de livraison?'} />
      </main>
      <Footer />
    </div>
  )
}

export async function getServerSideProps () {
  return { props: { hi: 'hi' } }
}
