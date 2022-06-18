import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Notification from '../../components/Notification'
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



export default function Password() {
  const { data: session,status } = useSession()

  const router = useRouter()
  const dashboardScroller = useRef()


  const [categoriesAndSubcategories, setCategoriesAndSubcategories] = useState(
    []
  )
  const [search, setSearch] = useState('')
  const [showNotification,setShowNotification] = useState(false)
  const [message,setMessage] = useState('')
  const [passwordData , setPasswordData] = useState({
    oldPassword : '' ,
    newPassword : '',
    newPassword2 : ''
  })
  const [cartNumber,setCartNumber] = useState(0)
  const [passwordError,setPasswordError] = useState(false)
  const [oldNewPasswordSimilarError,setOldNewPasswordSimilarError] = useState(false)
  const [oldPasswordInvalidError,setOldPasswordInvalidError] = useState(false)
  const [show,setShow] = useState(false)
  const [loading,setLoading] = useState(false)


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
    }
  },[status])


  const handleChange = (e) => {
    setPasswordError(false)
    setOldNewPasswordSimilarError(false)
    setOldPasswordInvalidError(false)
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    }
    )
    
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    setShow(true)  
  }

  const handleChangePasswordSubmit = async () => {
    if(passwordData.newPassword != passwordData.newPassword2) {
      setPasswordError(true)
    }else{
      setLoading(true)
      try {
        const res = await fetch('/api/user/changepassword', {
          method: 'PATCH',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
          body: JSON.stringify(passwordData)
        })
        if(res.status == 200){
          setPasswordData({
            oldPassword : '' ,
            newPassword : '',
            newPassword2 : ''
          })
          setShowNotification(false)
            setMessage('Votre mot de passe a été bien modifié')
            setShowNotification(true)
        }

        if(res.status == 403){
          setOldPasswordInvalidError(true)
        }

        if(res.status == 401){
          setOldNewPasswordSimilarError(true)
        }
        
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    }
  }

  const scrollLeft = () => {
    dashboardScroller.current.scroll(dashboardScroller.current.scrollLeft - 150,0)
  }

  const scrollRight = () => {
    dashboardScroller.current.scroll(dashboardScroller.current.scrollLeft + 150,0)
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
      <main className='w-full h-fit grid place-content-center place-items-center overflow-hidden lg:flex flex-nowrap justify-center items-start px-2 mt-20'>
          <div className='w-screen lg:w-80  h-fit flex justify-start items-center'>
            <button className='relative bg-white w-7 h-full z-[90] font-bold text-2xl block lg:hidden' onClick={e => scrollLeft()}><Image src={'pfe/arrow-right-3098_-_Copy_hsxwaz'} alt='arrow' width={20} height={20} layout='fixed' className='hover:scale-x-125' /></button>
            <div ref={dashboardScroller} className='noScrollBar w-full h-fit lg:grid overflow-x-auto flex'>
                <Link href='/account/information'>
                      <a className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center pr-5 gap-3 border-t pl-[13px] py-3 hover:text-black group whitespace-nowrap'><Image src={'pfe/icons8-security-pass-80_cr72so.png'} alt='general informations' width={30} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100' /><p>Informations personnelles</p></a>
                  </Link>
                  
                  <Link href='/account/quoterequests'>
                      <a className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center pr-5 gap-3 border-t pl-[13px] py-3 hover:text-black group whitespace-nowrap'><Image src={'pfe/icons8-price-64_jp7edw.png'} alt='historique' width={25} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100'  /><p>Historique des devis</p></a>
                  </Link>
                  
                  <Link href='/account/orders'>
                      <a className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center pr-5 gap-3 border-t pl-[10px] py-3 hover:text-black group whitespace-nowrap'><Image src={'pfe/icons8-order-history-50_jafgle.png'} alt='historique' width={25} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100' /><p>Historiques des commandes</p></a>
                  </Link>
                  
                  <Link href='/account/password'>
                      <a className='text-zinc-600 font-medium w-full h-fit flex flex-nowrap justify-start items-center pr-5 gap-3 border-t pl-3 py-3 bg-harvey whitespace-nowrap'><Image src={'pfe/icons8-password-24_nrik4g.png'} alt='mot de passe' width={22} height={25} layout='fixed' /><p>Changer le mot de passe</p> </a>
                  </Link>
                
                  <button className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center pr-5 gap-4 border-y pl-[11px] py-3 hover:cursor-pointer hover:text-black group' onClick={() => signOut({ callbackUrl: window.location.origin+'/login' })} ><Image src={'pfe/icons8-logout-50_ouya9u.png'} alt='Déconnexion' width={20} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100' /> Déconnexion</button>
            </div>
              <button className='relative  bg-white w-7 h-full z-[90] font-bold text-2xl block lg:hidden' onClick={e => scrollRight()}><Image src={'pfe/arrow-right-3098_eujgfr'} alt='arrow' width={20} height={20} layout='fixed' className='hover:scale-x-125' /></button>
                
  
          </div>
      <form onSubmit={handleSubmit} className='w-full lg:w-full mx-auto h-fit px-2 py-10 overflow-auto relative grid place-items-center lg:place-items-start lg:p-10'>
          
          {loading ? <div
                id='contact-loading'
                className=' absolute inset-0 w-full h-full bg-white/70 z-[9] '
              >
                <div className='reverse-spinner '></div>
              </div> :null }



            <div className=' w-fit h-fit mb-10'>
              <input
                type='password'
                value= {passwordData.oldPassword}
                onChange={e=>handleChange(e)}
                name='oldPassword'
                required
                minLength={6}
                className={oldPasswordInvalidError || oldNewPasswordSimilarError ? 'outline-none border-b border-red-500 placeholder:text-red-500 text-red-500 min-w-[300px] w-1/3' : 'outline-none border-b min-w-[300px] w-1/3'}
                placeholder='Mot de passe actuel'
              />
              
              {oldPasswordInvalidError ? <p className='text-red-500 w-full text-left'>Votre mot de passe actuel n&apos;est pas valide</p> : null}
            </div>
            <input
              type='password'
              value= {passwordData.newPassword}
              onChange={e=> handleChange(e)}
              name='newPassword'
              required
              minLength={6}
              className={passwordError || oldNewPasswordSimilarError ? 'outline-none border-b border-red-500 placeholder:text-red-500 text-red-500 min-w-[300px] w-1/3 mb-10' : 'outline-none border-b min-w-[300px] w-1/3 mb-10'}
              placeholder='Nouveau mot de passe'
            />

          
            <input
              type='password'
              value= {passwordData.newPassword2}
              onChange={e=> handleChange(e)}
              name='newPassword2'
              required
              minLength={6}
              className={passwordError || oldNewPasswordSimilarError ? 'outline-none border-b border-red-500 placeholder:text-red-500 text-red-500 min-w-[300px] w-1/3 ' : 'outline-none border-b min-w-[300px] w-1/3 '}
              placeholder='Confirmer le nouveau mot de passe'
            />

        {passwordError ? <p className='text-red-500 w-full text-left'>Les mots de passe ne sont pas identiques</p> : null}
        {oldNewPasswordSimilarError ? <p className='text-red-500 w-full text-left'>Nouveau mot de passe doit être different de l&apos;ancien</p> : null}

          

        <button type="submit" className='w-fit h-fit bg-pinky text-white px-4 py-2 rounded-md shadow-[0px_3px_15px_rgba(247,177,162,0.8)] hover:scale-105 transition-all mt-10'>Enregistrer</button>
        <Modal show={show} onClose={() => setShow(false)} onConfirm={() => handleChangePasswordSubmit()} action={'add'} content={'Êtes-vous sûr de vouloir modifier vos informations?'} />
        <Notification show={showNotification} setShow={setShowNotification} message={message} />
      </form>
      </main>
      <Footer />
    </div>
  )
}


export async function getServerSideProps () {
  return { props: { hi: 'hi' } }
}