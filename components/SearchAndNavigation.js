import CategoriesMenu from "./CategoriesMenu"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import { SearchContext } from '../utils/SearchContext'

export default function SearchAndNavigation(){

    const {search,setSearch} = useContext(SearchContext)
    
    const syringe = 'pfe/searchIcon_ooxkbe.png'

    return (
        <div className="flex relative flex-wrap sm:flex-nowrap pr-3 bg-white border-[1px] h-fit sm:h-20 rounded-lg w-full">
            <CategoriesMenu />
            <div className="w-full h-fit flex flex-nowrap justify-center items-center pt-3">
            <input type="text" name="search" value={search} onChange={e => setSearch(e.target.value)} className="sm:rounded-r-lg pt-3 sm:pt-0 border-l-0 sm:border-l border-t-[1px] sm:border-t-0 h-14 outline-none text-lg px-4 w-full" placeholder="Chercher un produit..."/>
            <Link href={`/products/search/${search}`}>
                <a className="w-fit h-full flex items-center hover:cursor-pointer"><Image src={syringe} alt='design' width={30} height={30} layout="fixed" /></a>
            </Link>
            </div>
        </div>
    )
}

