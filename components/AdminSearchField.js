import { useContext, useState } from "react"
import searchIcon from '../assets/searchIcon.png'
import Image from "next/image"
import { ProductsContext } from "../utils/ProductsContext"


export default function AdminSearchField(){

    const [search,setSearch] = useState('')
    // const {value,setValue} = useContext(ProductsContext)
 
    function handleChange(e){
        setSearch(e.target.value)
    }

    function handleClick(){
        document.getElementById('modifyProducts').click()
        

        setSearch('')
    }

    return (
        <div className="w-full flex flex-nowrap h-fit bg-white items-center rounded-md p-1">
            <input type="text" name="adminSearch" value={search} onChange={e => handleChange(e)} placeholder="Chercher un produit..." className="p-1 h-[28px] mt-[1px] outline-none"/>
            <Image src={searchIcon} alt='search icon' width={20} height={20} layout='fixed'  className="hover:cursor-pointer" onClick={e => handleClick()}/>
        </div>
    )
}