import Navbar from "./Navbar"
import NavigationSection from "./NavigationSection"
import { useState, useEffect, useRef, useContext } from "react"
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

    const slogan = 'pfe/LES_MEILLEURS_1_typedq.png'
    const [scrolled,setscrolled] = useState(false)
    const [isMobile,setIsMobile] = useState(false)
    const {cartNumber,setCartNumber} = useContext(CartContext)

    

    useEffect(() => {
        const root = document.querySelector(':root')
        const mq1 = window.matchMedia("(max-width: 1023px)")
            if(mq1.matches){
                setIsMobile(true)
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

        const handleAnimation = () => {

            const root = document.querySelector(':root')
            if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
                setscrolled(true)
                const top = positioningRef.current.getBoundingClientRect().top
                const left = positioningRef.current.getBoundingClientRect().left
                root.style.setProperty('--calculatedTop', top+'px')        
                root.style.setProperty('--calculatedLeft', left+'px') 
            } else {
                setscrolled(false)
                const top = anotherPositioning.current.getBoundingClientRect().top
                const left = anotherPositioning.current.getBoundingClientRect().left -50
                root.style.setProperty('--calculatedTop', top+'px')        
                root.style.setProperty('--calculatedLeft', left+'px') 
            }
        
    }

    const handleResize = () => {
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
    }

        window.addEventListener('scroll', handleAnimation)
        
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('scroll', handleAnimation)
        
             window.removeEventListener('resize', handleResize)
        }

    })

   

   

    return (
        <header className={`${scrolled ? 'pt-0' : 'pt-5'} pb-5 h-fit flex flex-col w-full items-center relative bg-na3ne3i`}>
            <Navbar scrolled={scrolled} anotherPositioning={anotherPositioning} navbarRef={navbarRef} />
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
            <div id="cart" className='transition-all duration-1000  font-medium bg-transparent text-third fixed hover:cursor-pointer h-fit w-fit  z-[9998] group'>
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