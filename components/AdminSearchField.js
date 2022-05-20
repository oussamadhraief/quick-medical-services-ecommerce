import { useContext, useEffect, useState } from "react"
import Image from "next/image"
import { ProductsContext } from "../utils/ProductsContext"
import { LoadingContext } from "../utils/LoadingContext"
import { SearchContext } from "../utils/SearchContext"


export default function AdminSearchField(props){

    const searchIcon = 'pfe/searchIcon_ooxkbe_ry2vz0.png'

    const [search,setSearch] = useState('')
    const {value,setValue} = useContext(ProductsContext)
    const {loadingContext,setLoadingContext} = useContext(LoadingContext)
    const {searchContext,setSearchContext} = useContext(SearchContext)
 
    useEffect(() => {
        if(props.selected != 2) {
            setSearch('')
            setSearchContext({searching: false, value: []})
        }
    },[props.selected])

    function handleChange(e){
        setSearch(e.target.value)
        if(e.target.value == '') {
        setSearchContext({searching: false, value: []})
        document.getElementById('modifyProducts').click()
    }
    }

    function handleClick(){
        document.getElementById('modifyProducts').click()
        const newValue = value.filter(item => item.reference.includes(search) || item.name.toLowerCase().includes(search.toLowerCase()))
        setSearchContext({searching: true, value: newValue})
        const mql = window.matchMedia('(max-width: 767px)');
        if(mql.matches) document.getElementById('navbutton').click()
    }

    return (
        <div className="w-full flex flex-nowrap h-fit bg-transparent border-b border-pinky justify-between items-center p-1">
            <input type="text" name="adminSearch" id="adminSearch" value={search} onChange={e => handleChange(e)} placeholder="Chercher un produit..." className="p-1 h-[28px] bg-transparent placeholder:text-white w-full mt-[1px] outline-none"/>
            <Image src={searchIcon} alt='search icon' width={18} height={18} layout='fixed'  className="hover:cursor-pointer" onClick={e => 
                {if(!loadingContext) handleClick()}
                }/>
        </div>
    )
}