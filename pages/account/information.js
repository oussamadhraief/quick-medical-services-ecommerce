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

export default function Information () {
  const { data: session, status } = useSession()

  const router = useRouter()

  const [categoriesAndSubcategories, setCategoriesAndSubcategories] = useState(
    []
  )
  const [search, setSearch] = useState('')
  const [information,setInformation] = useState({name: '',phone: ''})
  const [firstAddress,setFirstAddress] = useState('')
  const [editingFirstAddress,setEditingFirstAddress] = useState(false)
  const [secondAddress,setSecondAddress] = useState('')
  const [editingSecondAddress,setEditingSecondAddress] = useState(false)

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
    setInformation({
      name: session.user.name,
      phone: session.user.phone,
    })
    setFirstAddress(session.user.address[0])
    if(session.user.address.length == 1){
      setSecondAddress(session.user.address[0])
    }else{
      setSecondAddress(session.user.address[1])
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

  const handleSubmit = (e) => {
    e.preventDefault()
    document.querySelector('.saveAccountDataButton').disabled = true
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
          <Header landingPage={false} cartPage={false} />
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
              
                <div className='text-zinc-400 font-medium w-full h-fit flex flex-nowrap justify-start items-center gap-4 border-y pl-[12px] pr-2 py-3 hover:cursor-pointer hover:text-black group' onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })} ><Image src={'pfe/icons8-logout-50_ouya9u.png'} alt='general informations' width={20} height={25} layout='fixed' className='contrast-0 group-hover:contrast-100' /> <p>Déconnexion</p></div>
  
          </div>
          <div className='w-full h-fit px-10'>
          <form onSubmit={e => handleSubmit(e)} className='max-w-[836px] w-full h-full py-5 grid gap-10'>
            <p className='font-medium text-3xl mx-auto'>Vos <span className='border-b border-orange'>informations personnelles</span> </p>
            <label className='font-medium w-11/12 flex flex-nowrap justify-between'>Nom et prénom:
                <input type="text" onChange={e => handleChange(e)} name="name" value={information.name} placeholder='Nom et prénom' className='outline-none border-b min-w-[300px] w-8/12'/>
            </label>
            <label className='font-medium w-11/12 flex flex-nowrap justify-between'>Num de téléphone:
                <input type="text" onChange={e => handleChange(e)} name="phone" value={information.phone} placeholder='Num. de téléphone' className='outline-none border-b min-w-[300px] w-8/12' />
            </label>

          <div className='grid w-fit mt-5 gap-5'>
            
                <p className='text-xl font-medium w-fit mx-auto'>Modifer <span className='border-b-2 border-orange'> vos adresses</span>: </p>
                <div className='flex flex-nowrap w-fit h-fit gap-16'>
              <div className='w-96 h-52 grid  relative  rounded-sm pl-5 pr-32 pt-4 gap-10 pb-10 border border-na3ne3i'>
                <p className="w-fit h-fit font-medium after:content-[''] after:absolute after:top-[111%] after:left-0 after:bg-na3ne3i after:h-[1px] after:w-[346px] relative ">Adresse de facturation</p>
                {editingFirstAddress ? <input type="text" name="firstAddress" value={firstAddress} onChange={e => setFirstAddress(e.target.value)} className='w-full border border-na3ne3i rounded-md h-8' /> : <p className='w-full'>{firstAddress}</p>}
                <div className='absolute top-4 right-5 flex flex-nowrap items-center'>
                {editingFirstAddress ? <button onClick={e => {
                setEditingFirstAddress(false)
                setFirstAddress(session.user.address[0])
                document.querySelector('.ModifyFirstAddressButton').innerText = 'Modifier'
              }} className='mr-1 text-na3ne3i underline text-sm font-medium'>annuler</button> : null }
                  <button className='ModifyFirstAddressButton bg-orange px-1 font-medium rounded-sm ' onClick={e => {
                    if(!editingFirstAddress){
                      setEditingFirstAddress(true)
                      e.target.innerText = 'Enregistrer'
                    }else{
                      setEditingFirstAddress(false)
                      e.target.innerText = 'Modifier'
                    }
                  }}>Modifier</button>
                </div>
              </div>
              <div className='grid w-96 h-52  relative  rounded-sm pl-5 pr-32 pt-4 gap-10 pb-10 border border-na3ne3i'>
              <p className="w-fit h-fit font-medium after:content-[''] after:absolute after:top-[111%] after:left-0 after:bg-na3ne3i after:h-[1px] after:w-[346px] relative ">Adresse de livraison</p>
              {editingSecondAddress ? <input type="text" name="secondAddress" value={secondAddress} onChange={e => setSecondAddress(e.target.value)} className='w-full border border-na3ne3i rounded-md h-8' /> : <p className='w-full'>{secondAddress}</p>}
              <div className='absolute top-4 right-5 flex flex-nowrap items-center'>
              {editingSecondAddress ? <button onClick={e => {
                if(session.user.address.length == 1){
                  setSecondAddress(session.user.address[0])
                }else{
                  setSecondAddress(session.user.address[1])
                }
                document.querySelector('.ModifySecondAddressButton').innerText = 'Modifier'
                setEditingSecondAddress(false)
              }} className='mr-1 text-na3ne3i underline text-sm font-medium'>annuler</button> : null }
              <button className='ModifySecondAddressButton bg-orange px-1 font-medium rounded-sm' onClick={e => {
                if(!editingSecondAddress){
                  setEditingSecondAddress(true)
                    e.target.innerText = 'Enregistrer'
                  }else{
                    e.target.innerText = 'Modifier'
                    setEditingSecondAddress(false)
                  }
                }}>Modifier</button>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" disabled={true} className='saveAccountDataButton w-fit h-fit bg-orange px-4 py-2 rounded-md shadow-form font-medium hover:scale-105 transition-all mx-auto disabled:bg-zinc-300 disabled:text-zinc-600 disabled:shadow-none disabled:hover:scale-100'>Enregistrer tous les <br></br> changements</button>
                </form>
            
          </div>
          
      </main>
      <Footer />
    </div>
  )
}

export async function getServerSideProps () {
  return { props: { hi: 'hi' } }
}
