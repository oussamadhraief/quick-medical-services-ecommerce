import CategoriesMenu from "./CategoriesMenu"
import Image from "next/image"

export default function SearchAndNavigation(){

    
    const syringe = 'pfe/syringe_blue_xqxweo.png'

    return (
        <div className="flex relative flex-wrap px-3 mx-5 py-3 bg-white border-[1px] h-fit sm:h-20 rounded-lg w-11/12 md:w-4/6 xl:w-3/6">
            <CategoriesMenu />
            <input type="text" name="search" value="" className="sm:rounded-r-lg pt-3 sm:pt-0 border-t-[1px] sm:border-none outline-none text-lg px-4 w-full" placeholder="Chercher un produit..."/>
            <div className="w-10 sm:w-20 absolute -bottom-2 sm:-top-2 right-0 z-0 h-16 sm:h-28 bg-transparent">
                <Image src={syringe} alt='design' layout="fill" />
            </div>
        </div>
    )
}

