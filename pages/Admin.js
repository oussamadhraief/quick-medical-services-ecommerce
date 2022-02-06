import PageView from "../components/PageView"
import AdminNavbar from "../components/AdminNavbar"
import { useEffect, useState } from "react"
import { ProductsContext } from "../utils/ProductsContext"


export default function Admin(){

    const [value,setValue] = useState('gga')
    const [selection,setSelection] = useState(1)

    function handleClick(id){
        setSelection(id)
    }

    return(
        <div className="bg-white h-screen w-screen flex flex-nowrap">
            <ProductsContext.Provider value={{ value,setValue }}>
                <AdminNavbar selected={selection} handleClick={handleClick} />
                <PageView selected={selection} />
            </ProductsContext.Provider>
        </div>
    )
}