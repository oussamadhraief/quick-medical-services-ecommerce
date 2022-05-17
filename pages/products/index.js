import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { useEffect, useState } from "react"
import { ProductsContext } from "../../utils/ProductsContext"
import SrollableProduct from "../../components/ScrollableProduct"
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




export default function Products(){
  const { data: session, status } = useSession()


    const [value,setValue] = useState([])
    const [pageSelection , setPageSelection] = useState(0)
    const [cartNumber , setCartNumber] = useState(0)
    const [pages , setPages] = useState(1)
    const [renderedArray , setRenderedArray]=useState([])
    const [search,setSearch] = useState('')
    const [categoriesAndSubcategories,setCategoriesAndSubcategories] = useState([])
    const [activatedModal,setActivatedModal] = useState(false)


    useEffect(() => {
        async function fetchData() {
        if(value.length < 1 ){
            const res = await fetch('/api/products')
            const { data } = await res.json()
            setValue(data)
            let categories = data.map(item => item.category)
            categories = [...new Set(categories)]
            const orderedStuff = categories.map(item => orderedTable(item,data))
            setCategoriesAndSubcategories(orderedStuff)
        }else{
            const numberOfPages = Math.ceil(value.length /9)
            if(numberOfPages >= 1) {setPages(numberOfPages)} else {setPages(1)}
            setPageSelection(0)
        }
    }
    fetchData()
    },[value])

    
    useEffect(() => {
        if(session)setCartNumber(session.user.cart.length)
    },[session])

    useEffect(() => {
            let count = pageSelection * 9
            let arr = value.filter((item,index) => index >= count && index < count + 9)
            setRenderedArray(arr)
        },[pageSelection,value])

    function orderedTable(item,data){
        return {
            category: item,
            subcategories: [...new Set(data.filter(element => element.category == item).map(elem => elem.subcategory))]
        }
    }

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
                <div  className="w-3/12 overflow-hidden transition-[height] duration-300 grid h-fit bg-[#E7EDEE] border-zinc-200 border min-h-fit shadow">
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
                <div id="categoriesOrderer1" className="w-9/12 border-[1px] h-fit min-h-[1000px] flex flex-wrap gap-5 p-7 justify-evenly ml-3">
                    {renderedArray.map(item => <SrollableProduct key={item.name} product={item} />)}
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