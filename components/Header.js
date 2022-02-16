import Navbar from "./Navbar"
import NavigationSection from "./NavigationSection"
import Image from "next/image"

export default function Header(){

    const design = 'pfe/download2_qlvdfr'

    return (
        <header className="space-y-20 bg-beige">
            <Navbar />
            <NavigationSection />
            <div className="w-full h-20 bg-beige relative rotate-180">
                <Image src={design} alt='design' layout="fill" />
            </div>
        </header>
    )
}