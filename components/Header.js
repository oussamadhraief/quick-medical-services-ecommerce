import Navbar from "./Navbar"
import NavigationSection from "./NavigationSection"
import CartObject from "./CartObject"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from 'next/link'

export default function Header(props){

    const slogan = 'pfe/LES_MEILLEURS_1_typedq.png'
    const [scrolled,setscrolled] = useState(false)
    const [isMobile,setIsMobile] = useState(false)


    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
                setscrolled(true)
            } else {
                setscrolled(false)
            }
        }
    )
        const mq1 = window.matchMedia("(max-width: 1023px)")
            if(mq1.matches){
                setIsMobile(true)
                document.getElementById('header').style.marginTop = window.innerWidth + 20 + 'px'
            }else {
                document.getElementById('header').style.marginTop = document.getElementById('nav').offsetHeight + 20 + 'px'
            }
    
                window.addEventListener("resize", () => {
                    
                    const mq1 = window.matchMedia("(max-width: 1023px)")
                    if(mq1.matches){
                        setIsMobile(true)
                        document.getElementById('header').style.marginTop = window.innerWidth + 20 + 'px'
                    }else {
                        setIsMobile(false)
                        document.getElementById('header').style.marginTop = document.getElementById('nav').offsetHeight + 20 + 'px'
                    }
                }
            )
    },[])

   

    return (
        <header id="headerr" className={`${scrolled ? 'pt-0' : 'pt-5'} pb-5 h-fit flex flex-col w-full items-center relative bg-na3ne3i`}>
            <Navbar scrolled={scrolled} />
            {props.landingPage ? 
            <>
            <div id="header" className="w-full h-fit gap-0 grid lg:flex lg:flex-nowrap lg:items-center lg:justify-start pl-0 lg:pl-10 mb-5 lg:py-6 xl:py-20 2xl:py-36 3xl:py-52">
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
                    
                </div>
            </div>
                <CartObject scrolled={scrolled} isMobile={isMobile}  />
            </> 
            : 
            <>
            <div id="header" className="w-11/12 md:w-full h-fit px-0 md:px-10 grid md:flex md:flex-nowrap md:items-center md:justify-evenly mb-5">
                <div className="w-11/12 sm:w-10/12 md:w-4/6 lg:w-3/6 h-fit mx-auto">
                    
                <NavigationSection landingPage={props.landingPage} />
                </div>
            </div>
                    <CartObject scrolled={scrolled} isMobile={isMobile} />
            </> }
        </header>
    )
}