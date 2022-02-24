import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { useEffect, useState } from "react"
import { ProductsContext } from "../../utils/ProductsContext"
import SrollableProduct from "../../components/ScrollableProduct"
import PagesNavigator from "../../components/PagesNavigator"
import { PageSelectionContext } from "../../utils/PageSelectionContext"
import { PagesContext } from "../../utils/PagesContext"
import CategoriesNavigator from "../../components/CategoriesNavigator"


export default function Products(){

    const [value,setValue] = useState([])
    const [pageSelection , setPageSelection] = useState(0)
    const [pages , setPages] = useState(1)
    const [renderedArray , setRenderedArray]=useState([])
    const [categoriesAndSubcategories,setCategoriesAndSubcategories] = useState([])


    useEffect(async () => {
        if(value.length < 1 ){
            const res = await fetch('api/products')
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
    },[value])

    useEffect(() => {
            let count = pageSelection * 9
            let arr = value.filter((item,index) => index >= count && index < count + 9)
            setRenderedArray(arr)
        },[pageSelection,value])

        useEffect(() => {
            document.getElementById('categoriesOrderer').style.height = document.getElementById('categoriesOrderer1').offsetHeight + 'px'
        })

    function orderedTable(item,data){
        return {
            category: item,
            subcategories: [...new Set(data.filter(element => element.category == item).map(elem => elem.subcategory))]
        }
    }

    return(
        <div>
            <Header />
            <ProductsContext.Provider value={{value,setValue}} >
                <div className="w-full h-fit flex justify-end">
                    <div className="w-3/12 h-full relative">
                        
                    <h1 className="mx-auto w-fit h-fit font-bold text-xl text-main mb-5">Catégories et sous-catégories arrow</h1>
                    </div>
                    <div className="w-9/12 h-10 ml-3 grid sm:flex justify-between px-5 items-center flex-nowrap">
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
                <div id="categoriesOrderer" className="w-3/12 bg-ciel border-none rounded-lg min-h-fit h-full py-5">
                    <CategoriesNavigator categoriesAndSubcategories={categoriesAndSubcategories} />
                </div>
                <div id="categoriesOrderer1" className="w-9/12 border-[1px] h-fit min-h-[1000px] flex flex-wrap gap-5 p-7 justify-evenly ml-3">
                    {renderedArray.map(item => <SrollableProduct product={item} />)}
                </div>
            </div>
            </ProductsContext.Provider>
            <Footer />
        </div>
    )
}