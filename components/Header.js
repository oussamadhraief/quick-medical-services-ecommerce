import Navbar from "./Navbar"
import NavigationSection from "./NavigationSection"

export default function Header(){


    return (
        <header className="relative space-y-24 bg-white mb-32">
            <Navbar />
            <NavigationSection />
        </header>
    )
}