import SearchAndNavigation from "./SearchAndNavigation"
import 'animate.css'

export default function NavigationSection(props){

    return(
        <nav  className={`w-full relative grid md:flex flex-nowrap justify-center z-10 items-center py-3 animate__animated ${props.landingPage ? 'animate__delay-3s' : 'animate__delay-1s'} animate__bounceInLeft`}>
            <SearchAndNavigation />
        </nav>
    )
}