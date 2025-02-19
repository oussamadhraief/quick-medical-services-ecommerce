import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import { SearchContext } from '../utils/SearchContext'

export default function SearchAndNavigation(props){

    const {search,setSearch} = useContext(SearchContext)

    return (
        <div className={!props.landingPage ? "flex relative flex-nowrap pl-1 sm:pl-0 pr-3 bg-transparent border-b-[3px] border-pinky h-fit w-11/12 mx-auto md:w-10/12 mb-10 mt-5 sm:my-10" :  "flex relative flex-nowrap pl-1 sm:pl-0 pr-3 bg-transparent border-b-[3px] border-white h-fit w-11/12 mx-auto md:w-10/12 mb-10 mt-5 sm:my-10"}>
            {/* <CategoriesMenu /> */}
            <div className="w-full flex flex-nowrap justify-center items-center">
            <input type="text" name="search" value={search} onChange={e => setSearch(e.target.value)} className={!props.landingPage ? "pt-0 h-12 text-white placeholder:text-white outline-none text-lg px-4 w-full bg-transparent" : "pt-0 h-12 text-white placeholder:text-white outline-none text-lg px-4 w-full bg-transparent"} placeholder="Chercher un produit..."/>
            <Link href={`/products/search/${search}`}>
                <a className="w-fit h-full flex items-center hover:cursor-pointer"><Image src={props.landingPage ? 'pfe/searchIcon_ooxkbe_uesd9w' : 'pfe/searchIcon_ooxkbe_yryf9e'} alt='design' width={25} height={25} layout="intrinsic" /></a>
            </Link>
            </div>
        </div>
    )
}

