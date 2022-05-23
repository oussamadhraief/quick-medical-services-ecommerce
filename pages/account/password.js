import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { CategoriesContext } from '../../utils/CategoriesContext'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { SearchContext } from '../../utils/SearchContext'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"
import Head from 'next/head'
import { useRouter } from 'next/router'
import { CartContext } from "../../utils/CartContext"



export default function Password() {
  const { data: session,status } = useSession()

  const router = useRouter()

  const [categoriesAndSubcategories, setCategoriesAndSubcategories] = useState(
    []
  )
  const [search, setSearch] = useState('')
  const [passwordData , setPasswordData] = useState({
    oldPassword : '' ,
    newPassword : '',
    newPassword2 : ''
  })
  const [cartNumber,setCartNumber] = useState(0)


  useEffect(() => {
    const AbortController = window.AbortController;
    const abortController = new AbortController()
    async function fetchData () {
      try {
        const res = await fetch('/api/categoriesandsubcategories',{ signal: abortController.signal })
        const { data } = await res.json()
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
    }
  },[status])


  const handleChange = (e) => {
    
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    }
    )
    
  }


  const handleSubmit = async e => {
    e.preventDefault()
      try {
        const res = await fetch('/api/user/changepassword', {
          method: 'PATCH',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
          body: JSON.stringify(passwordData)
        })
        const { result } = await res.json()
        console.log(result);
      } catch (error) {
        console.error(error)
      }
    
  }


  if(status == 'loading') {return  (
    <div className='bg-white h-screen w-screen overflow-hidden flex items-center absolute z-[9999] left-0 top-0'>
      <div id="contact-loading" className="w-fit h-fit bg-white/70 z-[9999] mx-auto ">
        <div className="reverse-spinner "></div>
      </div>
    </div>
   )}
   
   if(status == 'unauthenticated') {
    router.push('/login')  
    return null
   }

  return (
<div>
      <Head>
        <title>Sécurité - QUICK Medical Services</title>
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
                    <a className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center gap-3 border-t pl-[13px] pr-2 py-3 hover:text-black group'><Image src={'pfe/icons8-price-64_jp7edw.png'} alt='general informations' width={25} height={25} layout='fixed'  /><p>Historique des devis</p></a>
                </Link>
                
                <Link href='/account/orders'>
                    <a className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center gap-3 border-t pl-[8px] pr-2 py-3 hover:text-black group whitespace-nowrap'><Image src={'pfe/icons8-order-history-50_jafgle.png'} alt='general informations' width={25} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100' /><p>Historiques des commandes</p></a>
                </Link>
                
                <Link href='/account/password'>
                    <a className='text-zinc-600 font-medium w-full h-fit flex flex-nowrap justify-start items-center gap-3 border-t px-2 py-3 bg-[#E7EDEE] whitespace-nowrap'><Image src={'pfe/icons8-password-24_nrik4g.png'} alt='general informations' width={22} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100' /><p>Changer le mot de passe</p> </a>
                </Link>
              
                <div className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center gap-4 border-y pl-[11px] pr-2 py-3 hover:cursor-pointer hover:text-black group' onClick={() => signOut({ callbackUrl: 'http://localhost:3000/login' })} ><Image src={'pfe/icons8-logout-50_ouya9u.png'} alt='general informations' width={20} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100' /> <p>Déconnexion</p></div>
  
          </div>
      <form onSubmit={handleSubmit} className='w-10/12 h-full px-10 py-5 grid gap-14'>
          
            <input
              type='password'
              value= {passwordData.oldPassword}
              onChange={e=>handleChange(e)}
              name='oldPassword'
              className='outline-none border-b min-w-[300px] w-1/3'
              placeholder='Mot de passe actuel'
            />
            
          
            <input
              type='password'
              value= {passwordData.newPassword}
              onChange={e=> handleChange(e)}
              name='newPassword'
              className='outline-none border-b min-w-[300px] w-1/3 '
              placeholder='Nouveau mot de passe'
            />

          
            <input
              type='password'
              value= {passwordData.newPassword2}
              onChange={e=> handleChange(e)}
              name='newPassword2'
              className='outline-none border-b min-w-[300px] w-1/3 '
              placeholder='Confirmer le nouveau mot de passe'
            />
          

        <button type="submit" className='w-fit h-fit bg-orange px-4 py-2 rounded-md shadow-form font-medium hover:scale-105 transition-all'>Enregistrer</button>
      </form>
      </main>
      <Footer />
    </div>
  )
}
