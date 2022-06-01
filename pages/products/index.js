import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { useEffect, useState } from "react"
import { ProductsContext } from "../../utils/ProductsContext"
import SrollableProduct from "../../components/ScrollableProduct"
import LoadingAnimation from "../../components/LoadingAnimation"
import PagesNavigator from "../../components/PagesNavigator"
import { PageSelectionContext } from "../../utils/PageSelectionContext"
import CategoriesNavigator from "../../components/CategoriesNavigator"
import { PagesContext } from "../../utils/PagesContext"
import { ActivatedModalContext } from "../../utils/ActivatedModalContext"
import { CategoriesContext } from "../../utils/CategoriesContext"
import { SearchContext } from "../../utils/SearchContext"
import { CartContext } from "../../utils/CartContext"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"




export default function Products(){
  const { data: session, status } = useSession()
  const router = useRouter()


    const [value,setValue] = useState([])
    const [pageSelection , setPageSelection] = useState(0)
    const [cartNumber , setCartNumber] = useState(0)
    const [pages , setPages] = useState(1)
    const [search,setSearch] = useState('')
    const [categoriesAndSubcategories,setCategoriesAndSubcategories] = useState([])
    const [activatedModal,setActivatedModal] = useState(false)
    const [loadingContext,setLoadingContext] = useState(true)

    useEffect(() => {
        async function fetchCategories() {
           const res = await fetch('/api/categoriesandsubcategories')
           const { data } = await res.json()
           setCategoriesAndSubcategories(data)
        }
            fetchCategories()
    },[])
    
    useEffect(() => {
        fetchData()
    },[router.query.page])
    
    async function fetchData() {
        setLoadingContext(true)
        let querypage 
        if(typeof(router.query.page) == 'undefined') {
            router.push({
                pathname: router.pathname,
                query: { page: 0 }
                }, 
                undefined, { shallow: true }
                )
                querypage = 0
            }else{
                querypage = router.query.page
            }
        const res = await fetch('/api/products?page='+querypage)
        const { data,number,index } = await res.json()
        let numberOfPages
            if(number> 0){
             numberOfPages = Math.ceil(number /10)
            }else{
                numberOfPages= 1
            }
        if(querypage != index) {
            router.push({
                pathname: router.pathname,
                query: { page: index }
                }, 
                undefined, { shallow: true }
                )
        }
        setValue(data)
        setPageSelection(index)
        setLoadingContext(false)
        setPages(numberOfPages)
}

    
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
    

    function handleHideCategories() {
        const CategoriesNavigator = document.getElementById('categoriesOrderer')
        const FlipArrow = document.getElementById('flipArrow')
        if(CategoriesNavigator.offsetHeight > 10) {
            CategoriesNavigator.style.height = '0px'
            FlipArrow.style.transform = 'rotate(90deg)'
        }else{
            CategoriesNavigator.style.height = 'fit-content'
            FlipArrow.style.transform = 'rotate(-90deg)'
        }
    }

    if (status === 'loading') {
        return (
          <div className='bg-white h-screen w-screen overflow-hidden flex items-center absolute z-[9999] left-0 top-0'>
            <div id="contact-loading" className="w-fit h-fit bg-white/70 z-[9999] mx-auto ">
              <div className="reverse-spinner "></div>
            </div>
          </div>
         )
        }

    return(
        <div>
            <Head>
        <title>Nos Produits - QUICK Medical Services</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Medical Supply Store"/>
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/logo.png"></link>
        <meta name="googlebot" content="index, follow"/>
        <meta name="keywords" content="" />
        <meta name='image' content="" />
        <meta itemProp="name" content="QUICK Medical Services"/>
        <meta itemProp="description" content="Medical Supply Store"/>
        <meta property="og:title" content="QUICK Medical Services"/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content=""/>
        <meta property="og:image" content=""/>
        <meta property="og:description" content="Medical Supply Store"/>
        <meta itemProp='name' content="QUICK Medical Services"/>
        <meta itemProp='description' content="Medical Supply Store"/>
        <meta itemProp='image' content=""/>
        <meta name="twitter:card" value="summary_large_image"/>
        <meta name="twitter:title" value="QUICK Medical Services"/>
        <meta name="twitter:description" value="Medical Supply Store"/>
        <meta name="twitter:image" value=""/>
      </Head>
            <CategoriesContext.Provider value={{ categoriesAndSubcategories,setCategoriesAndSubcategories }} >
            <SearchContext.Provider value={{search,setSearch}} >
            <CartContext.Provider value={{cartNumber,setCartNumber}} >
                <Header landingPage={false}  />
            </CartContext.Provider>
            </SearchContext.Provider>
            </CategoriesContext.Provider>
            <ProductsContext.Provider value={{value,setValue}} >
            <ActivatedModalContext.Provider value={{activatedModal,setActivatedModal}} >
            <CartContext.Provider value={{cartNumber,setCartNumber}} >

                <div className="w-full h-fit flex justify-end items-center mt-32 px-10">
                    
                        <PageSelectionContext.Provider value={{pageSelection,setPageSelection}}>
                        <PagesContext.Provider value={{pages,setPages}}>
                            <PagesNavigator relative={true} />
                        </PagesContext.Provider>
                        </PageSelectionContext.Provider>

                </div>
            <div className="w-full relative h-fit flex flex-nowrap justify-center items-start px-10 my-0">
                <div  className="w-3/12 overflow-hidden transition-[height] duration-300 grid h-fit bg-harvey border-zinc-200 border min-h-fit shadow">
                    <div>
                        <div>
                            <p className="bg-light text-white w-full h-fit py-3 text-center font-medium shadow-stylish">Paramètres d&apos;affichage</p>
                        </div>
                        <div className="w-full h-fit grid space-y-1 mt-2 mb-5 px-1">
                            <p className="mb-3 font-[400]">Trier par:</p>
                        <select className="w-fit h-fit px-2 py-1 mx-auto border outline-none hover:cursor-pointer rounded-sm">
                            <option value="newest">du plus récent au plus ancien</option>
                            <option value="newest">du plus ancien au plus récent</option>
                            <option value="newest">du plus cher au moins cher</option>
                            <option value="newest">du moins cher au plus cher</option>
                        </select>
                        </div>
                        <div className="w-full h-fit border-t-2 pb-3 border-zinc-200 grid px-1">
                            <p className="mt-3 mb-1 font-[400]">Afficher les produit:</p>
                            <label htmlFor="all" className="ml-3 mt-1 font-[400]">
                            <input type="radio" id="all" name="availability" value="all" className="mr-1 "/>Tous
                            </label>
                            <label htmlFor="available" className="ml-3 mt-1 font-[400]">
                            <input type="radio" id="available" name="availability" value="available" className="mr-1 "/>Disponibles à tout moment
                            </label>
                            <label htmlFor="unavailable" className="ml-3 mt-1 font-[400]">
                            <input type="radio" id="unavailable" name="availability" value="unavailable" className="mr-1 "/>Disponibles sur commande
                            </label>
                        </div>
                    </div>
                    <div className="w-full h-fit relative flex flex-nowrap items-center justify-center py-3 shadow-2xl text-white bg-light hover:cursor-pointer hover:bg-pinky hover:text-black" onClick={e => {
                        handleHideCategories()
                    }}>
                        <p className="h-fit w-fit font-medium whitespace-nowrap">Catégories et sous-catégories&nbsp;</p>
                        <p id="flipArrow" className="h-fit w-fit -rotate-90 transition-all">&#11164;</p>
                    </div>
                    <CategoriesNavigator categoriesAndSubcategories={categoriesAndSubcategories} />
                </div>
                <div id="categoriesOrderer1" className="w-9/12 border-[1px] h-fit min-h-[1000px] flex flex-wrap gap-5 p-7 justify-evenly ml-3 relative">
                    {loadingContext ? <LoadingAnimation key='delete' bgOpacity={false} /> : null}

                    {value.map(item => <SrollableProduct key={item.name} product={item} />)}
                </div>
            </div>
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