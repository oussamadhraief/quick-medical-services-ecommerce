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

export default function Details(){

    const [value,setValue] = useState([])
    const [pageSelection , setPageSelection] = useState(0)
    const [pages , setPages] = useState(1)
    const [renderedArray , setRenderedArray]=useState([])
    const [categoriesAndSubcategories,setCategoriesAndSubcategories] = useState([])
    const [activatedModal,setActivatedModal] = useState(false)
    const router = useRouter()

    useEffect(async () => {
        const id = router.query.id
        const subcategoryId = router.query.subcategoryId
        if(typeof(id) == 'string'){
            const res = await fetch(`/api/category/${id}/${subcategoryId}`)
            const {data} = await res.json()
            setValue(data)
            console.log(data);
        }
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

    useEffect(async () => {
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
            <CategoriesContext.Provider value={{categoriesAndSubcategories,setCategoriesAndSubcategories}} >
            <Header landingPage={false} />
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
                    {renderedArray.map(item => <SrollableProduct key={item.name} product={item} />)}
                </div>
            </div>
            </ActivatedModalContext.Provider>
            </ProductsContext.Provider>
            <Footer />
        </div>
    )
}