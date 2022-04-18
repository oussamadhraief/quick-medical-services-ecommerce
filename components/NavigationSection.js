import SearchAndNavigation from "./SearchAndNavigation"
import 'animate.css'

export default function NavigationSection(){

    return(
        <nav  className={`w-full relative flex flex-nowrap justify-start z-10 items-center py-3`}>
            <SearchAndNavigation />
        </nav>
    )
}