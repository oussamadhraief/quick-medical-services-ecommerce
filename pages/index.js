import Head from 'next/head'
import MainContent from '../components/MainContent'
import Footer from '../components/Footer'
import { useSession } from "next-auth/react"
import { useEffect,useState } from 'react'
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
        Promise.all([
        fetch('/api/products/availability?page='+0,{
          method: 'POST',
          headers: {
              "Accept": "application/json",
              "Content-type": "application/json"
          } ,
          body: JSON.stringify({availability: 'available'})
        }).then(res =>  res.json()),
        fetch('/api/products/availability?page='+0,{
          method: 'POST',
         headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
         } ,
          body: JSON.stringify({availability: 'unavailable'})
        }).then(res =>  res.json())]).then((res) => {
          const newValue = res[0].data.concat(res[1].data)
          setValue(newValue)
          setLoading(false)
        })
        }
    }
    async function fetchCategories() {
      const res = await fetch('/api/categoriesandsubcategories')
      const { data } = await res.json()
      setCategoriesAndSubcategories(data)
   }
      fetchCategories()
      fetchData()

},[])

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
        <SearchContext.Provider value={{search,setSearch}}>
        <CategoriesContext.Provider value={{categoriesAndSubcategories,setCategoriesAndSubcategories}}>
            <Header landingPage={true}  />
        </CategoriesContext.Provider>
          <MainContent />
        </SearchContext.Provider>
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
