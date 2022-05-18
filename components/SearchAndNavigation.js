import CategoriesMenu from "./CategoriesMenu"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import { SearchContext } from '../utils/SearchContext'

export default function SearchAndNavigation(){

    const {search,setSearch} = useContext(SearchContext)
    
    const syringe = 'pfe/searchIcon_ooxkbe_tg1uir.png'

    return (
        <div className="grid sm:flex relative flex-nowrap pl-3 sm:pl-0 pr-3 bg-white border-[1px] h-fit sm:h-14 rounded-lg w-11/12 mx-auto md:w-10/12 mb-10 mt-5 sm:my-10">
            <CategoriesMenu />
            <div className="w-full flex flex-nowrap justify-center items-center">
            <input type="text" name="search" value={search} onChange={e => setSearch(e.target.value)} className="sm:rounded-r-lg pt-0 border-l-0 sm:border-l h-12 outline-none text-lg px-4 w-full" placeholder="Chercher un produit..."/>
            <Link href={`/products/search/${search}`}>
                <a className="w-fit h-full flex items-center hover:cursor-pointer"><Image src={syringe} alt='design' width={30} height={30} layout="intrinsic" /></a>
            </Link>
            </div>
        </div>
    )
}

