import Navbar from "./Navbar"
import NavigationSection from "./NavigationSection"
import { useState, useEffect } from "react"
import Image from "next/image"
import 'animate.css'
import Link from 'next/link'

export default function Header(props){

    const slogan = 'pfe/LES_MEILLEURS_1_typedq.png'
    const [scrolled,setscrolled] = useState(false)
    const [isMobile,setIsMobile] = useState(false)


    useEffect(() => {
        const mq1 = window.matchMedia("(max-width: 1023px)")
            if(mq1.matches){
                setIsMobile(true)
            }else {
                document.getElementById('cart').style.top = document.getElementById('anotherPositioning').getBoundingClientRect().top + 3 +'px'
                document.getElementById('cart').style.left = document.getElementById('anotherPositioning').getBoundingClientRect().left +'px'
            }
            const cartTimeout = setTimeout(() => {
                document.getElementById('cart').style.transitionProperty = 'all'
                document.getElementById('cart').style.transitionDuration = '1s'
            }, 1000);
            return clearTimeout(cartTimeout)
    },[])

    useEffect(() => {
        document.getElementById('header').style.marginTop = document.getElementById('nav').offsetHeight + 20 + 'px'
    },[])

    useEffect(() => {
        window.addEventListener("scroll", () => {
            handleAnimation()
          }
    )
        window.addEventListener("resize", () => {
            
            const mq1 = window.matchMedia("(max-width: 1023px)")
            if(mq1.matches){
                setIsMobile(true)
            }else {
                setIsMobile(false)
            }
            handleAnimation()
            document.getElementById('header').style.marginTop = document.getElementById('nav').offsetHeight + 20 + 'px'
          }
    )
})

    const handleAnimation = () => {
        if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
            setscrolled(true)
            document.getElementById('cart').style.left = document.getElementById('positioning').getBoundingClientRect().left +'px'
            document.getElementById('cart').style.top = document.getElementById('positioning').getBoundingClientRect().top +'px'
        } else {
            setscrolled(false)
            if(isMobile){
                document.getElementById('cart').style.top = document.getElementById('anotherPositioning').getBoundingClientRect().top - 3 +'px'
                document.getElementById('cart').style.left = document.getElementById('anotherPositioning').getBoundingClientRect().left - 50 +'px'
            }else {
                document.getElementById('cart').style.top = document.getElementById('anotherPositioning').getBoundingClientRect().top + 3 +'px'
                document.getElementById('cart').style.left = document.getElementById('anotherPositioning').getBoundingClientRect().left - 40 +'px'
            }
        }
    }

    return (
        <header id="headerr" className={`${scrolled ? 'pt-0' : 'pt-5'} pb-5 h-fit flex flex-col w-full items-center relative bg-na3ne3i`}>
            <Navbar scrolled={scrolled} />
            {props.landingPage ? 
            <>
            <div id="header" className="w-full h-full gap-0 grid lg:flex lg:flex-nowrap lg:items-center lg:justify-start pl-0 lg:pl-10 mb-5 lg:py-6 xl:py-20 2xl:py-36 3xl:py-52">
                <div className="w-11/12 sm:w-10/12 md:w-7/12 mx-auto lg:w-8/12 z-0 lg:h-full relative lg:absolute lg:top-0 lg:right-0">
                    {isMobile ? <Image src={'pfe/Untitled_design_2_cfpmtb.png'} alt='surgeon' width={1000} height={1000} quality={100} layout='responsive' /> : <Image src={'pfe/Copy_of_Copy_of_Unnamed_Design_5_vdtssl.png'} alt='surgeon' width={1000} height={700} quality={100} layout='fill' /> }
                </div>
                <div className="grid place-items-start w-full px-5 md:px-0 mx-auto lg:mx-0 md:w-11/12 order-2 md:order-1 lg:w-[40%] z-[1]">
                    <div className="w-full h-fit relative">
                        <Image src={slogan} alt='slogan' width={550} height={50} layout="responsive" />
                    </div>
                <p className="break-words text-orange font-medium text-sm sm:text-base md:text-lg xl:text-xl pl-1">Import & distribution du matériel chirurgical et dentaire sur toute la Tunisie</p>
                <div className="mt-10 mb-16 w-[200px] sm:w-fit mx-auto h-fit flex flex-wrap sm:flex-nowrap">
                <Link href='/products'>
                    <a className="sm:mr-3 text-black text-sm sm:text-base font-medium bg-orange w-[170px] sm:w-[200px] py-3 rounded-lg whitespace-nowrap text-center hover:scale-105 transition-all min-w-fit">Explorer les produits &#x2192;</a>
                </Link>
                <Link href='/contact'>
                    <a className="mt-3 sm:mt-0 sm:ml-3 text-orange text-sm sm:text-base font-medium bg-transparent w-[170px] sm:w-[200px] py-3 border-2 rounded-lg border-orange h-fit whitespace-nowrap text-center hover:bg-orange hover:text-black hover:scale-105 transition-all">Contactez-nous !</a>
                </Link>
                </div>
                
                <NavigationSection />

                </div>
                <div id="banner" className="relative w-1/2 order-1 md:order-2  md:w-5/12 sm:ml-[9%]">
                    {/* <Image src={banner} alt='surgeon' width={700} height={700} layout='fill' /> */}
                </div>
            </div>
            <div id="cart" className={scrolled ? ` text-medium font-medium bg-transparent rounded-full text-third fixed hover:cursor-pointer h-fit w-fit pt-2 pb-0 px-1.5 z-[9999] group` : `group text-medium font-medium text-third fixed h-fit w-fit hover:cursor-pointer z-[9999]`}>
                <div className={scrolled ? "absolute w-fit h-fit hidden group-hover:block  right-[90%] top-4 bg-na3ne3i text-white font-[400] rounded-md px-2 py-0.5" :  "absolute w-fit h-fit hidden group-hover:block  right-[105%] top-1.5 bg-white rounded-md px-2 py-0.5"}>
                    panier
                </div>
                <Link href='/cart'>
                <a><Image src={scrolled ? `pfe/icons8-cart-128_6_adkuqt.png` : `pfe/icons8-cart-128_5_njo2lu.png`} alt='cart icon' width={47} height={42} layout='fixed' objectFit="contain" objectPosition='center' /></a>
                </Link>
                <p className={scrolled ? "absolute bg-pinky rounded-full w-fit h-fit top-1.5 right-4 text-black font-medium text-xs px-1.5 text-center" : 'absolute bg-pinky rounded-full w-fit h-fit top-0 right-2.5 text-black font-medium text-[10px] px-1.5 text-center'}>2</p>
            </div>
            <div id="positioning" className="fixed bottom-0.5 right-3 w-14 h-14">
                
            </div>
            </> 
            : 
            <>
            <div id="header" className="w-11/12 md:w-full h-fit px-0 md:px-10 gap-0 md:gap-10 grid md:flex md:flex-nowrap md:items-center md:justify-evenly mb-5">
                <div className="w-11/12 sm:w-10/12 md:w-4/6 lg:w-3/6 h-fit mt-12 mb-8 mx-auto">
                    
                <NavigationSection landingPage={props.landingPage} />
                </div>
            </div>
            <div id="cart" className={scrolled ? ` text-medium font-medium bg-transparent rounded-full text-third fixed hover:cursor-pointer h-fit w-fit pt-2 pb-0 px-1.5 z-[9999] group` : `group text-medium font-medium text-third fixed h-fit w-fit hover:cursor-pointer z-[9999]`}>
                <div className={scrolled ? "absolute w-fit h-fit hidden group-hover:block  right-[90%] top-4 bg-na3ne3i text-white font-[400] rounded-md px-2 py-0.5" :  "absolute w-fit h-fit hidden group-hover:block  right-[105%] top-1.5 bg-white rounded-md px-2 py-0.5"}>
                    panier
                </div>
                <Link href='/cart'>
                <a><Image src={scrolled ? `pfe/icons8-cart-128_6_adkuqt.png` : `pfe/icons8-cart-128_5_njo2lu.png`} alt='cart icon' width={47} height={42} layout='fixed' objectFit="contain" objectPosition='center' /></a>
                </Link>
                <p className={scrolled ? "absolute bg-pinky rounded-full w-fit h-fit top-1.5 right-4 text-black font-medium text-xs px-1.5 text-center" : 'absolute bg-pinky rounded-full w-fit h-fit top-0 right-2.5 text-black font-medium text-[10px] px-1.5 text-center'}>2</p>
            </div>
            <div id="positioning" className="fixed bottom-0.5 right-3 w-14 h-14">
                
            </div>
            </> }
        </header>
    )
}