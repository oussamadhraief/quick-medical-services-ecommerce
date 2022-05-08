import { useRouter } from "next/dist/client/router"
import { useEffect, useState } from "react"
import Header from "../../../components/Header"
import Footer from "../../../components/Footer"
import { ProductsContext } from "../../../utils/ProductsContext"
import SrollableProduct from "../../../components/ScrollableProduct"
import PagesNavigator from "../../../components/PagesNavigator"
import { PageSelectionContext } from "../../../utils/PageSelectionContext"
import CategoriesNavigator from "../../../components/CategoriesNavigator"
import { PagesContext } from "../../../utils/PagesContext"
import { ActivatedModalContext } from "../../../utils/ActivatedModalContext"
import { CategoriesContext } from "../../../utils/CategoriesContext"
import { SearchContext } from "../../../utils/SearchContext"
import Head from "next/head"

export default function Results(){

    const [value,setValue] = useState([])
    const [pageSelection , setPageSelection] = useState(0)
    const [pages , setPages] = useState(1)
    const [renderedArray , setRenderedArray]=useState([])
    const [categoriesAndSubcategories,setCategoriesAndSubcategories] = useState([])
    const [search,setSearch] = useState('')
    const [activatedModal,setActivatedModal] = useState(false)
    const router = useRouter()

    useEffect( () => {
        async function fetchData() {
        const id = router.query.id
        if(typeof(id) == 'string'){const res = await fetch('/api/search/'+id)
        const { data } = await res.json()
        setValue(data)
        setSearch(router.query.id)
    }}
    fetchData()
    },[router])

    useEffect(() => {
        const numberOfPages = Math.ceil(value.length /9)
        if(numberOfPages >= 1) {setPages(numberOfPages)} else {setPages(1)}
        setPageSelection(0)
    },[value])

    useEffect(() => {
        let count = pageSelection * 9
        let arr = value.filter((item,index) => index >= count && index < count + 9)
        setRenderedArray(arr)
    },[pageSelection,value])

    useEffect(() => {
        async function fetchData() {
        try {
            const res = await fetch('/api/categoriesandsubcategories')
            const { data } = await res.json()
            let categories = data.map(item => item.category)
            categories = [...new Set(categories)]
            const orderedStuff = categories.map(item => orderedTable(item,data))
            setCategoriesAndSubcategories(orderedStuff)
        } catch (error) {
            console.error(error)
        }
    }
    fetchData()
    },[])

    function orderedTable(item,data){
        return {
            category: item,
            subcategories: [...new Set(data.filter(element => element.category == item).map(elem => elem.subcategory))]
        }
    }


    function handleHideCategories() {
        const CategoriesNavigator = document.getElementById('categoriesOrderer')
        const ProductsHolder = document.getElementById('categoriesOrderer1')
        const FlipArrow = document.getElementById('flipArrow')
        if(CategoriesNavigator.offsetHeight > 10) {
            CategoriesNavigator.style.height = '0px'
            CategoriesNavigator.style.width = '0px'
            ProductsHolder.style.width = '100%'
            CategoriesNavigator.style.border = '0px'
            FlipArrow.style.transform = 'rotate(90deg)'
        }else{
            CategoriesNavigator.style.height = 'fit-content'
            CategoriesNavigator.style.width = '25%'
            ProductsHolder.style.width = '75%'
            CategoriesNavigator.style.border = '1px solid #e5e7eb'
            FlipArrow.style.transform = 'rotate(-90deg)'
        }
    }
    
    return(
        <div>
            <Head>
                <title>{router.query.id} - QUICK Medical Services</title>
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
            <CategoriesContext.Provider value={{categoriesAndSubcategories,setCategoriesAndSubcategories}} >
            <SearchContext.Provider value={{search,setSearch}} >
                <Header landingPage={false} cartPage={false} />
            </SearchContext.Provider>
            </CategoriesContext.Provider>
            <ProductsContext.Provider value={{value,setValue}} >
            <ActivatedModalContext.Provider value={{activatedModal,setActivatedModal}} >
                <div className="w-full h-fit flex justify-between items-center mt-32 px-10">
                    <div className="w-3/12 h-full relative flex flex-nowrap items-center justify-center py-0.5 bg-light hover:cursor-pointer hover:bg-cool" onClick={e => {
                        handleHideCategories()
                    }}>
                        <p className="h-fit w-fit font-medium text-lg text-white">Catégories et sous-catégories&nbsp;</p>
                        <p id="flipArrow" className="h-fit w-fit -rotate-90 text-white transition-all font-bold text-lg">&#11164;</p>
                    </div>
                    <div className="w-9/12 h-10 ml-3 grid sm:flex justify-between items-center flex-nowrap">
                        <select className="w-fit h-fit px-2 py-1 border-[1px] outline-none hover:cursor-pointer">
                            <option value="newest">du plus récent au plus ancien</option>
                            <option value="newest">du plus ancien au plus récent</option>
                            <option value="newest">du plus cher au moins cher</option>
                            <option value="newest">du moins cher au plus cher</option>
                        </select>
                        <PageSelectionContext.Provider value={{pageSelection,setPageSelection}}>
                        <PagesContext.Provider value={{pages,setPages}}>
                            <PagesNavigator relative={true} />
                        </PagesContext.Provider>
                        </PageSelectionContext.Provider>
                        
                    </div>
                </div>
            <div className="w-full relative h-fit flex flex-nowrap justify-center items-start px-10 my-0">
                <div id="categoriesOrderer" className="w-3/12 overflow-hidden transition-[height] duration-300 grid h-fit bg-white border min-h-fit">
                    <CategoriesNavigator categoriesAndSubcategories={categoriesAndSubcategories} />
                </div>
                <div id="categoriesOrderer1" className="w-9/12 border-[1px] h-fit min-h-[1000px] flex flex-wrap gap-5 p-7 justify-evenly ml-3">
                    {value.length > 0 ? <p className="w-full text-center font-medium text-third">Produits correspondants à votre recherche...</p> : <p className="w-full text-center font-medium text-third rounded-lg">Pas de produits correspondants à votre recherche &quot;{router.query.id}&quot; :&#40; ...</p>}
                    {renderedArray.map(item => <SrollableProduct key={item.name} product={item} />)}
                </div>
            </div>
            </ActivatedModalContext.Provider>
            </ProductsContext.Provider>
            <Footer />
        </div>
    )
}

export async function getServerSideProps () {
    return { props: { hi: 'hi' } }
  }