import PageView from "../components/PageView"
import AdminNavbar from "../components/AdminNavbar"
import { useEffect, useState } from "react"


export default function Admin(){

    
    const [selection,setSelection] = useState(1)

    function handleClick(id){
        setSelection(id)
    }

    return(
        <div className="bg-white h-screen w-screen flex flex-nowrap">
            <AdminNavbar selected={selection} handleClick={handleClick} />
            <PageView selected={selection} />
        </div>
    )
}