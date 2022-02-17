import Navbar from "./Navbar"
import NavigationSection from "./NavigationSection"
import Image from "next/image"

export default function Header(){
    const design = 'pfe/download2_qlvdfr.png'

    return (
        <header className="relative space-y-24 bg-white">
            <Navbar />
            <NavigationSection />
            <div className="w-full h-16 bg-ciel relative">
                <Image src={design} alt='design' layout="fill" />
            </div>
        </header>
    )
}