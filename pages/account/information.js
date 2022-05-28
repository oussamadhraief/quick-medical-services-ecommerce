import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { CategoriesContext } from '../../utils/CategoriesContext'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { SearchContext } from '../../utils/SearchContext'
import Link from 'next/link'
import { useSession, signOut, getSession } from "next-auth/react"
import Head from 'next/head'
import { useRouter } from 'next/router'
import { CartContext } from "../../utils/CartContext"


export default function Information () {
  const { data: session, status } = useSession()

  const router = useRouter()

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
  const [cartNumber,setCartNumber] = useState(0)


  const handleChange = e => {
    document.querySelector('.saveAccountDataButton').disabled = false
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
        let categories = data.map(item => item.category)
        categories = [...new Set(categories)]
        const orderedStuff = categories.map(item => orderedTable(item, data))
        setCategoriesAndSubcategories(orderedStuff)
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

  const handleSubmit = async (e) => {
    document.querySelector('.saveAccountDataButton').disabled = true
    const res = await fetch('/api/updatenameandphone',{
      method: 'PATCH',
      headers: {
        "Accept" : "application/json",
        "Content-type" : "application/json"
      },
      body: JSON.stringify(information)
    })
  }

  const handleFirstAddressChange = e => {
    setFirstAddress({
      ...firstAddress,
      [e.target.name]: e.target.value
    }
  )
  }

  const handleFirstAddressSubmit = async e => {
    // e.preventDefault()
    setEditingFirstAddress(false)
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
  }

  const handleSecondAddressChange = e => {
    setSecondAddress({
      ...secondAddress,
      [e.target.name]: e.target.value
    }
  )
  }

  const handleSecondAddressSubmit = async e => {
    // e.preventDefault()
    setEditingSecondAddress(false)
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
      <main className='w-full h-fit flex flex-nowrap justify-start items-start px-10 mt-20'>
          <div className='w-2/12 h-fit grid'>
                <Link href='/account/information'>
                    <a className='text-zinc-600 font-medium w-full h-fit flex flex-nowrap justify-start items-center gap-3 border-t px-2 py-3 bg-[#E7EDEE] whitespace-nowrap'><Image src={'pfe/icons8-security-pass-80_cr72so.png'} alt='general informations' width={30} height={25} layout='fixed' /><p>Informations personnelles</p></a>
                </Link>
                
                <Link href='/account/estimates'>
                    <a className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center gap-3 border-t pl-[13px] pr-2 py-3 hover:text-black group whitespace-nowrap'><Image src={'pfe/icons8-price-64_jp7edw.png'} alt='general informations' width={25} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100' /><p>Historique des devis</p></a>
                </Link>
                
                <Link href='/account/orders'>
                    <a className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center gap-3 border-t pl-[8px] pr-2 py-3 hover:text-black group whitespace-nowrap'><Image src={'pfe/icons8-order-history-50_jafgle.png'} alt='general informations' width={25} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100' /><p>Historiques des commandes</p></a>
                </Link>
                
                <Link href='/account/password'>
                    <a className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center gap-3 border-t pl-[12px] pr-2 py-3 hover:text-black group whitespace-nowrap'><Image src={'pfe/icons8-password-24_nrik4g.png'} alt='general informations' width={22} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100' /><p>Changer le mot de passe</p> </a>
                </Link>
              
                <div className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center gap-4 border-y pl-[12px] pr-2 py-3 hover:cursor-pointer hover:text-black group' onClick={() => signOut({ callbackUrl: window.location.origin+'/login' })} ><Image src={'pfe/icons8-logout-50_ouya9u.png'} alt='general informations' width={20} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100' /> <p>Déconnexion</p></div>
  
          </div>
          <div className='w-10/12 h-fit px-10'>
          <form onSubmit={e => handleSubmit(e)} className='w-[836px] h-fit grid gap-16 mb-10 px-10'>
              <p className='font-medium text-3xl mx-auto'>Vos <span className='border-b border-orange'>informations personnelles</span> </p>
              <label className='font-medium w-11/12 flex flex-nowrap justify-between'>Nom et prénom:
                  <input type="text" required minLength={4} onChange={e => handleChange(e)} name="name" value={information.name} placeholder='Nom et prénom' className='outline-none border-b min-w-[300px] w-8/12'/>
              </label>
              <label className='font-medium w-11/12 flex flex-nowrap justify-between'>Num de téléphone:
                  <input type="number" required minLength={8} onChange={e => handleChange(e)} name="phone" value={information.phone} placeholder='Num. de téléphone' className='outline-none border-b min-w-[300px] w-8/12' />
              </label>
              <button type="submit" disabled={true} className='saveAccountDataButton w-fit h-fit bg-orange px-5 py-2.5 rounded-md shadow-form font-medium hover:scale-105 transition-all mx-auto disabled:bg-zinc-300 disabled:text-zinc-600 disabled:shadow-none disabled:hover:scale-100'>Enregistrer</button>
          </form>

          <div className='grid w-fit gap-5'>
            
                <p className='text-xl font-medium w-fit mx-auto'>Modifer <span className='border-b-2 border-orange'> vos adresses</span>: </p>
                <div className='flex flex-nowrap w-fit h-fit gap-16'>
              <form onSubmit={e => handleFirstAddressSubmit(e)}  className='w-96 h-fit grid  relative  rounded-sm px-5 pt-4 pb-10 border border-na3ne3i'>
                <p className="w-fit h-fit font-medium after:content-[''] after:absolute after:top-[111%] after:left-0 after:bg-na3ne3i after:h-[1px] after:w-[346px] relative ">Adresse de facturation</p>
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
                   <p className='w-full mt-5 text-ellipsis overflow-hidden'>{firstAddress.address}</p>
                   <p className='w-full mt-5 text-ellipsis overflow-hidden'>{firstAddress.city}</p>
                   <p className='w-full mt-5 text-ellipsis overflow-hidden'>{firstAddress.country}</p>
                   <p className='w-full mt-5 text-ellipsis overflow-hidden'>{firstAddress.zipCode}</p>
                   </>
                }
                
                <div className='absolute top-4 right-5 flex flex-nowrap items-center'>
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
                  <button type='submit' className='bg-orange px-1 font-medium rounded-sm '>Enregistrer</button> 
                  </> :                  
                  <button type='button' onClick={e => {
                      setEditingFirstAddress(true)
                    }} className='bg-orange px-1 font-medium rounded-sm '>{NullAddresses ? 'Ajouter' : 'Modifier'}</button> 
                }
            
                </div> 
              </form>






              <form onSubmit={e => handleSecondAddressSubmit(e)} className='grid w-96 h-fit relative rounded-sm px-5 pt-4 pb-10 border border-na3ne3i'>
              <p className="w-fit h-fit font-medium after:content-[''] after:absolute after:top-[111%] after:left-0 after:bg-na3ne3i after:h-[1px] after:w-[346px] relative ">Adresse de livraison</p>
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
                   <p className='w-full mt-5 text-ellipsis overflow-hidden'>{secondAddress.address}</p>
                   <p className='w-full mt-5 text-ellipsis overflow-hidden'>{secondAddress.city}</p>
                   <p className='w-full mt-5 text-ellipsis overflow-hidden'>{secondAddress.country}</p>
                   <p className='w-full mt-5 text-ellipsis overflow-hidden'>{secondAddress.zipCode}</p>
                  </>
                }
                
                <div className='absolute top-4 right-5 flex flex-nowrap items-center'>
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
              <button type="submit" className='bg-orange px-1 font-medium rounded-sm '>Enregistrer</button> 
              </> : 
              <button type='button' onClick={e => {
                setEditingSecondAddress(true)
                }} className='bg-orange px-1 font-medium rounded-sm '>{NullAddresses ? 'Ajouter' : 'Modifier'}</button> 
                }
                </div>
              </form>




            </div>
          </div>
        </div> 
          
      </main>
      <Footer />
    </div>
  )
}

export async function getServerSideProps () {
  return { props: { hi: 'hi' } }
}
