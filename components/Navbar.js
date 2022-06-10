import Image from "next/image"
import 'animate.css'
import Link from "next/link"
import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import UserNavigation from "./UserNavigation"


export default function Navbar({ scrolled, anotherPositioning, navbarRef, dropDown,setDropDown }){
    const { data: session, status } = useSession()
    const [isMobile,setIsMobile]= useState(false)
   
    const logo = 'pfe/Quick_medical_services_j8u9c6'
    const isAuthenticated = (status === "authenticated")

    useEffect(()=>{
        const mql= window.matchMedia('(max-width: 1023px)')
        if(mql.matches){
            setIsMobile(true)
            window.scroll(0,1)
        }else{
            setIsMobile(false)
        }
    },[])
    
    
    return(
        <nav ref={navbarRef} className={scrolled ? "flex flex-nowrap justify-between px-1 sm:px-10 bg-na3ne3i  w-full transition-all duration-500 h-fit py-3 items-center z-[9999] shadow-[0px_8px_25px_rgba(14,80,82,0.8)] fixed" : "flex transition-all duration-500 flex-nowrap justify-between lg:justify-between w-full sm:px-10 lg:px-0 lg:w-11/12 h-fit py-3 items-center z-[9997]  rounded-3xl fixed"}>
            <Link href='/'>
                <a className="relative ml-4 w-44 lg:m-0 md:w-56 aspect-[4/1] hover:cursor-pointer"><Image src={logo} alt='Quick medical services logo' quality={100} layout='fill' objectFit="center" /></a>
            </Link>
            <div className="w-fit h-fit gap-5 flex flex-nowrap items-center justify-center pr-3">
                
            <ul id="navDropdown" className={dropDown? "fixed grid place-content-center place-items-center pb-[150vh] gap-14 w-screen h-[200vh] bg-na3ne3i top-0 left-0":"lg:w-3/6 h-fit hidden lg:flex  justify-end mr-8 gap-10 xl:gap-16 items-center"}>
                
                <li className={`lg:block ${ dropDown? 'font-medium mx-auto' : 'font-[400]'} whitespace-nowrap text-white relative hover:cursor-pointer underlineAnimatedLink hover:text-pinky`}><Link href={{pathname: '/products',query: {page: 0}}}>
                    <a>Nos Produits</a>
                    </Link></li>
                <li className={`lg:block ${ dropDown? 'font-medium mx-auto' : 'font-[400]'} text-white relative hover:cursor-pointer underlineAnimatedLink hover:text-pinky`}><Link href='/contact'>
                    <a>Contact</a>
                    </Link></li>
                {isAuthenticated? <li>
                    <UserNavigation panel={false} />
                </li> : 
                <>  
                    <li><Link href='/login'><a className="whitespace-nowrap text-white text-center font-medium lg:font-[400] ml-3 underlineAnimatedLink relative">Se connecter</a></Link></li>
                    <li className=" hover:scale-105 transition-all"><Link href='/register'><a className="bg-pinky shadow-[0px_3px_10px_rgba(247,177,162,0.5)] w-fit h-fit ml-3 px-4 py-2 rounded-lg text-white">S&apos;inscrire</a></Link></li>
                </>}
                {/* {isMobile? null: <li ref={anotherPositioning} className="relative w-10 h-10"></li>} */}
            </ul>
                <div ref={anotherPositioning} className="relative w-10 h-10"></div>
            {isMobile?
                <div id="clickableMenu" className={dropDown ?  "w-6 h-6 grid gap-1 hover:cursor-pointer fixed top-[15px] right-[10px]" : "w-6 h-6 grid gap-1 hover:cursor-pointer relative top-0 right-0"} onClick={()=>  setDropDown(prevDropDown => !prevDropDown)}>
                    <div id="first" className={dropDown ? "absolute h-[4px] w-6 rotate-45 bg-white rounded-sm transition-all bottom-5 left-0" : "absolute h-[4px] w-5 bg-white rounded-sm transition-all top-0 left-0 rotate-0"}></div>
                    <div id="second" className={dropDown ? "hidden" : "absolute h-[4px] w-5 bg-white rounded-sm  top-2 left-0"}></div>
                    <div id="third" className={dropDown ? "absolute h-[4px] w-6 bg-white rounded-sm transition-all top-0 left-0 -rotate-45"  : "absolute h-[4px] w-5 bg-white rounded-sm transition-all top-4 left-0 rotate-0"}></div>
                </div>
                :
                null}
            </div>
            
            
        </nav>
    )
}



