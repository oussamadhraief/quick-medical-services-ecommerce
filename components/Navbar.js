import Image from "next/image"
import SearchAndNavigation from "./SearchAndNavigation"
import Link from "next/link"

export default function Navbar(){

    const logo = "logo_bev03r.png"

    return(
        <nav className="w-full grid md:flex flex-nowrap justify-center items-center py-3 bg-cyan-500">
            <Image src="/logo.png" alt="QMS Logo" width={100} height={60} layout="responsive" />
            <SearchAndNavigation />
            
        </nav>
    )
}