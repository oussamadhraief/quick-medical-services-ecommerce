import SearchAndNavigation from "./SearchAndNavigation"
import 'animate.css'

export default function NavigationSection(props){

    return(
        <div  className={`w-full relative flex flex-nowrap justify-start z-10 items-center ${props.landingPage ? 'py-3' : 'py-0'}`}>
            <SearchAndNavigation />
        </div>
    )
}