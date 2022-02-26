import CategoriesMenu from "./CategoriesMenu"
import Image from "next/image"

export default function SearchAndNavigation(){

    
    const syringe = 'pfe/searchIcon_ooxkbe.png'

    return (
        <div className="flex relative flex-wrap sm:flex-nowrap px-3 mx-5 py-3 bg-white border-[1px] h-fit sm:h-20 rounded-lg w-11/12 md:w-4/6 xl:w-3/6">
            <CategoriesMenu />
            <input type="text" name="search" value="" className="sm:rounded-r-lg pt-3 sm:pt-0 border-t-[1px] sm:border-none h-14 outline-none text-lg px-4 w-full" placeholder="Chercher un produit..."/>
            <div className="w-fit h-full flex items-center hover:cursor-pointer">
                <Image src={syringe} alt='design' width={30} height={30} layout="fixed" />
            </div>
        </div>
    )
}

