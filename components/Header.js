import Navbar from "./Navbar"
import NavigationSection from "./NavigationSection"
import Link from "next/link"

export default function Header(){
    return (
        <header>
            <Navbar />
            <NavigationSection />
            <Link href="/Admin">
            <a className="text-5xl">Admin</a>
            </Link>
        </header>
    )
}