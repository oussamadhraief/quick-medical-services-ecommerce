import SearchAndNavigation from "./SearchAndNavigation"

export default function NavigationSection(){

    return(
        <nav  className="w-full relative grid md:flex flex-nowrap justify-center z-10 items-center py-3">
            <SearchAndNavigation />
            
        </nav>
    )
}