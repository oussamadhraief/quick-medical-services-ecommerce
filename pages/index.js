import Head from 'next/head'
import MainContent from '../components/MainContent'
import Footer from '../components/Footer'
import { useSession } from "next-auth/react"
import { useEffect,useState } from 'react'
import LoadingAnimation from '../components/LoadingAnimation'
import { ProductsContext } from '../utils/ProductsContext'
import Header from "../components/Header"
import { ActivatedModalContext } from '../utils/ActivatedModalContext'
import { CategoriesContext } from '../utils/CategoriesContext'
import { SearchContext } from '../utils/SearchContext'
import { useRouter } from 'next/router'
import { CartContext } from "../utils/CartContext"


export default function Home (props) {
  const { data: session, status } = useSession()

  const router = useRouter()


  const [activatedModal,setActivatedModal] = useState(false)
  const [loading,setLoading] = useState(true)
  const [value,setValue] = useState([])
  const [categoriesAndSubcategories,setCategoriesAndSubcategories] = useState([])
  const [search,setSearch] = useState('')
  const [cartNumber,setCartNumber] = useState(0)

  
  useEffect(() => {
    async function fetchData() {
    if(value.length < 1){
        const res = await fetch('api/products')
        const {data} = await res.json()
        setValue(data)
        setLoading(false)
        let categories = data.map(item => item.category)
        categories = [...new Set(categories)]
        const orderedStuff = categories.map(item => orderedTable(item,data))
        setCategoriesAndSubcategories(orderedStuff)
        }
    }
fetchData()
},[value])

useEffect(() => {
  if(session)setCartNumber(session.user.cart.length)
},[session])

function orderedTable(item,data){
  return {
      category: item,
      subcategories: [...new Set(data.filter(element => element.category == item).map(elem => elem.subcategory))]
  }
}
  
  useEffect(() => {
    if(status == 'authenticated' && (session.user.phone == null || session.user.address == null)) router.push('/login')
  })

  if (status === 'loading' || loading) {
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
      <ProductsContext.Provider value={{value,setValue}}>
        <ActivatedModalContext.Provider value={{activatedModal,setActivatedModal}}>
        <CartContext.Provider value={{cartNumber,setCartNumber}} >
        <CategoriesContext.Provider value={{categoriesAndSubcategories,setCategoriesAndSubcategories}}>
        <SearchContext.Provider value={{search,setSearch}}>
            <Header landingPage={true}  />
        </SearchContext.Provider>
        </CategoriesContext.Provider>
          <MainContent />
        </CartContext.Provider>
        </ActivatedModalContext.Provider>
        </ProductsContext.Provider>
      <Footer />
    </div>
  )
}

export async function getServerSideProps () {
  return { props: { hi: 'hi' } }
}
