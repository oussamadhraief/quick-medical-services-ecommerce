import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { useEffect, useState } from "react"
import { ProductsContext } from "../../utils/ProductsContext"
import SrollableProduct from "../../components/ScrollableProduct"


export default function Products(){

    const [value,setValue] = useState([])

    useEffect(async () => {
        if(value.length < 1 ){
            const res = await fetch('api/products')
            const { data } = await res.json()
            setValue(data)
        }else{
            
        }
    },[value])

    return(
        <div>
            <Header />
            <ProductsContext.Provider value={{value,setValue}} >
                <div className="w-full h-fit border-2 my-0 flex justify-end">
                    <div className="w-9/12 h-10 ml-3">
                        
                    </div>
                </div>
            <div className="w-full relative h-fit flex flex-nowrap justify-center items-center p-10 my-0">
                <div className="w-3/12 border-2 h-full min-h-full">
                    
                </div>
                <div className="w-9/12 border-2 h-fit flex flex-wrap gap-5 p-7 justify-evenly ml-3">
                    {value.map(item => <SrollableProduct product={item} />)}
                </div>
            </div>
            </ProductsContext.Provider>
            <Footer />
        </div>
    )
}