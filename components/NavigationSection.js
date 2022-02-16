import Image from "next/image"
import SearchAndNavigation from "./SearchAndNavigation"
import Link from "next/link"

export default function NavigationSection(){
    return(
        <nav className="w-full grid md:flex flex-nowrap justify-center items-center py-3">
            <SearchAndNavigation />
        </nav>
    )
}