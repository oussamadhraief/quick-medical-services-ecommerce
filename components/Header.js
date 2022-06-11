import UserNavigation from "./UserNavigation"
import NavigationSection from "./NavigationSection"
import { useState, useEffect, useRef, useContext, useCallback } from "react"
import Image from "next/image"
import Link from 'next/link'
import { useSession } from "next-auth/react"
import { CartContext } from "../utils/CartContext"

export default function Header(props){

    const { data: session,status} = useSession()

    const headerRef = useRef()
    const anotherPositioning = useRef()
    const navbarRef = useRef()
    const positioningRef = useRef()
    const logo = 'pfe/Quick_medical_services_j8u9c6'
    const isAuthenticated = (status === "authenticated")

    const slogan = 'pfe/LES_MEILLEURS_1_typedq.png'
    const [scrolled,setscrolled] = useState(false)
    const [isMobile,setIsMobile] = useState(false)
    const [dropDown , setDropDown] = useState(false)
    const {cartNumber,setCartNumber} = useContext(CartContext)

    

    useEffect(() => {
        const root = document.querySelector(':root')
        const mq1 = window.matchMedia("(max-width: 1023px)")
            if(mq1.matches){
                setIsMobile(true)
                window.scroll(0,1)
                if(props.landingPage){

                    headerRef.current.style.marginTop = window.innerWidth + 20 + 'px'
                }else{
                headerRef.current.style.marginTop = navbarRef.current.offsetHeight + 20 + 'px'
                    
                }
            }else {
                headerRef.current.style.marginTop = navbarRef.current.offsetHeight + 20 + 'px'
            }
        const top = anotherPositioning.current.getBoundingClientRect().top
        const left = anotherPositioning.current.getBoundingClientRect().left

        root.style.setProperty('--calculatedTop', top+'px')        
        root.style.setProperty('--calculatedLeft', left+'px')
    },[])   
    

    useEffect(() => {

        

        window.addEventListener('scroll', handleAnimation)
        
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('scroll', handleAnimation)
        
            window.removeEventListener('resize', handleResize)
        }

    },[])


    const handleAnimation = useCallback(() => {

        const root = document.querySelector(':root')
        if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
            setscrolled(true)
            const top = positioningRef?.current?.getBoundingClientRect().top
            const left = positioningRef?.current?.getBoundingClientRect().left
            root.style.setProperty('--calculatedTop', top+'px')        
            root.style.setProperty('--calculatedLeft', left+'px') 
        } else {
            setscrolled(false)
            const top = anotherPositioning?.current?.getBoundingClientRect().top
            const left = anotherPositioning?.current?.getBoundingClientRect().left -50
            root.style.setProperty('--calculatedTop', top+'px')        
            root.style.setProperty('--calculatedLeft', left+'px') 
        }
    
    })

const handleResize = useCallback(() => {
    const mq1 = window.matchMedia("(max-width: 1023px)")
    if(mq1.matches){
        setIsMobile(true)
        if(props.landingPage){

            headerRef.current.style.marginTop = window.innerWidth + 20 + 'px'
        }else{
        headerRef.current.style.marginTop = navbarRef.current.offsetHeight + 20 + 'px'
            
        }
    }else {
        setIsMobile(false)
        headerRef.current.style.marginTop = navbarRef.current.offsetHeight + 20 + 'px'
    }
    handleAnimation()
})

   

   

    return (
        <header className={`${scrolled ? 'pt-0' : 'pt-5'} pb-5 h-fit flex flex-col w-full items-center relative bg-na3ne3i`}>
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
            {props.landingPage ? 
            <>
            <div ref={headerRef} className="w-full h-fit gap-0 grid lg:flex lg:flex-nowrap lg:items-center lg:justify-start pl-0 lg:pl-10 mb-5 lg:py-6 xl:py-20 2xl:py-36 3xl:py-52">
                {isMobile ? 
                <div className="headerbanner w-full aspect-square bg-light pt-8 sm:pt-0 mx-auto z-0 absolute top-0 right-0">
                     <Image src={'pfe/Untitled_design_6_gcpmn0.png'} alt='surgeon' width={1000} height={1000} quality={100} layout='responsive' /> 
                     </div>:
                     
                    <div className="headerbanner aspect-[13/10] h-full z-0 relative lg:absolute lg:top-0 lg:right-0">
                     <Image src={'pfe/Copy_of_Copy_of_Unnamed_Design_5_vdtssl.png'} alt='surgeon' width={1000} height={700} quality={100} layout='fill' /> 
                     </div>}
                <div className="grid place-items-start w-full px-5 md:px-0 mx-auto lg:mx-0 md:w-11/12 order-2 md:order-1 lg:w-[40%] z-[1]">
                    <div className="w-full h-fit relative">
                        <Image src={slogan} alt='slogan' width={550} height={50} layout="responsive" />
                    </div>
                <p className="break-words text-orange font-medium text-sm sm:text-base md:text-lg xl:text-xl pl-1">Import & distribution du matériel chirurgical et dentaire sur toute la Tunisie</p>
                <div className="mt-10 mb-16 w-[200px] sm:w-fit mx-auto h-fit flex flex-wrap sm:flex-nowrap">
                <Link href={{pathname: '/products',query: {page: 0}}}>
                    <a className="sm:mr-3 text-black text-sm sm:text-base font-medium bg-orange w-[170px] sm:w-[200px] py-3 rounded-lg whitespace-nowrap text-center hover:scale-105 transition-all min-w-fit">Explorer les produits &#x2192;</a>
                </Link>
                <Link href='/contact'>
                    <a className="mt-3 sm:mt-0 sm:ml-3 text-orange text-sm sm:text-base font-medium bg-transparent w-[170px] sm:w-[200px] py-3 border-2 rounded-lg border-orange h-fit whitespace-nowrap text-center hover:bg-orange hover:text-black hover:scale-105 transition-all">Contactez-nous !</a>
                </Link>
                </div>
                
                <NavigationSection landingPage={props.landingPage} />

                </div>
                <div id="banner" className="relative w-1/2 order-1 md:order-2  md:w-5/12 sm:ml-[9%]">
                    
                </div>
            </div>
            
            </> 
            : 
            <>
            <div ref={headerRef} className="w-11/12 md:w-full h-fit px-0 md:px-10 grid md:flex md:flex-nowrap md:items-center md:justify-evenly mb-5">
                <div className="w-11/12 sm:w-10/12 md:w-4/6 lg:w-3/6 h-fit mx-auto">
                    
                <NavigationSection landingPage={props.landingPage} />
                </div>
            </div>
            </> }
            <Link href='/cart'>
            <div id="cart" className={dropDown ? 'transition-all duration-1000  font-medium bg-transparent text-third fixed hover:cursor-pointer h-0 w-0 overflow-hidden  z-[9998] group' : 'transition-all duration-1000  font-medium bg-transparent text-third fixed hover:cursor-pointer h-fit w-fit  z-[9998] group'}>
                <div className={scrolled ? "absolute w-fit h-fit hidden group-hover:block  right-[100%] top-1.5 bg-na3ne3i text-white font-[400] rounded-md px-2 py-0.5" :  "absolute w-fit h-fit hidden group-hover:block right-[105%] top-1.5 bg-white rounded-md px-2 py-0.5"}>
                    panier
                </div>
                <a><Image src={scrolled ? `pfe/icons8-cart-128_6_adkuqt.png` : `pfe/icons8-cart-128_5_njo2lu.png`} alt='cart icon' width={42} height={37} layout='fixed' objectFit="contain" objectPosition='center' /></a>
                <p className={scrolled ? "absolute min-h-fit bg-pinky rounded-full min-w-fit w-fit h-fit top-0.5 right-2.5 text-black font-medium text-xs px-1 text-center" : 'absolute bg-pinky min-h-fit rounded-full min-w-fit w-fit h-fit top-0 right-2.5 text-black font-medium text-[10px] px-1 text-center'}>{cartNumber}</p>
            </div>
            </Link>
            <div ref={positioningRef} className="fixed bottom-0.5 right-3 w-14 h-14">
                
            </div>
        </header>
    )
}