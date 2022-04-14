import Navbar from "./Navbar"
import NavigationSection from "./NavigationSection"
import { useState, useEffect } from "react"
import Image from "next/image"
import 'animate.css'
import Link from 'next/link'

export default function Header(props){


    const [scrolled,setscrolled] = useState(false)

    useEffect(() => {
        document.getElementById('cart').style.top = document.getElementById('anotherPositioning').getBoundingClientRect().top + 3 +'px'
        document.getElementById('cart').style.left = document.getElementById('anotherPositioning').getBoundingClientRect().left +'px'
        document.getElementById('cart').classList.add('animate__animated')
        document.getElementById('cart').classList.add('animate__fadeInDown')
        document.getElementById('nav').classList.add('animate__animated')
        document.getElementById('nav').classList.add('animate__fadeInDown')
        document.getElementById('header').style.marginTop = document.getElementById('nav').offsetHeight + 20 + 'px'
    },[])

    useEffect(() => {
        window.addEventListener("scroll", () => {
            handleAnimation()
          }
    )
        window.addEventListener("resize", () => {
            handleAnimation()
            document.getElementById('header').style.marginTop = document.getElementById('nav').offsetHeight + 20 + 'px'
          }
    )})

    const handleAnimation = () => {
        if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
            setscrolled(true)
            document.getElementById('cart').style.left = document.getElementById('positioning').getBoundingClientRect().left +'px'
            document.getElementById('cart').style.top = document.getElementById('positioning').getBoundingClientRect().top +'px'
            // document.getElementById('anotherPositioning').style.display = 'none'
        } else {
            setscrolled(false)
            document.getElementById('cart').style.top = document.getElementById('anotherPositioning').getBoundingClientRect().top + 3 +'px'
            document.getElementById('cart').style.left = document.getElementById('anotherPositioning').getBoundingClientRect().left - 40 +'px'
            // document.getElementById('anotherPositioning').style.display = 'block'
        }
    }

    return (
        <header id="headerr" className={`${scrolled ? 'pt-0' : 'pt-5'}  min-h-screen flex flex-col w-full h-fit items-center`}>
            <Navbar scrolled={scrolled} />
            {props.landingPage ? 
            <>
            <div id="header" className="md:w-[95%] lg:w-full h-fit px-0 lg:px-10 gap-0 md:gap-10 grid md:flex md:flex-nowrap md:items-center md:justify-evenly mb-5">
                <div className="grid place-items-start w-full order-2 md:order-1 md:w-[45%]">
                <h1 className="flex flex-nowrap gap-5 text-3xl md:text-5xl lg:text-[70px] font-extrabold justify-center items-center text-white animate__animated animate__backInLeft">
                    LES MEILLEURS 
                    <div className="grid w-fit h-fit mt-1">
                    <h6 className="text-xl font-extrabold mb-[1px]">PRIX</h6>
                    <h6 className="text-xl font-extrabold">PRODUITS</h6>
                    </div>
                </h1>
                <p className="break-words text-orange font-medium text-base md:text-xl pl-1 animate__animated animate__delay-1s animate__bounceInLeft">Import & distribution du matériel chirurgical et dentaire sur toute la Tunisie</p>
                <div className="my-10 w-full h-fit flex flex-wrap md:flex-nowrap justify-center  animate__animated animate__delay-2s animate__bounceInLeft">
                <Link href='/products'>
                    <a className="mr-3 text-black font-medium bg-orange px-4 py-3 w-fit rounded-lg whitespace-nowrap text-center hover:scale-105 transition-all">Explorer les produits &#x2192;</a>
                </Link>
                <Link href='/contact'>
                    <a className="ml-3 text-orange font-medium bg-transparent border-2 rounded-lg border-orange px-1 py-3 w-fit h-fit whitespace-nowrap text-center hover:bg-orange hover:text-black hover:scale-105 transition-all">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Contactez-nous !&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                </Link>
                </div>
                
                <NavigationSection landingPage={props.landingPage} />

                </div>
                <div id="banner" className="relative w-1/2 h-screen order-1 md:order-2  md:w-5/12 sm:ml-[9%]">
                    {/* <Image src={banner} alt='surgeon' width={700} height={700} layout='fill' /> */}
                </div>
                <div>
                    
                </div>
            </div>
            <div id="cart" className={scrolled ? `text-medium font-medium bg-transparent rounded-full right-5 text-third fixed hover:cursor-pointer h-fit w-fit pt-2 pb-0 px-1.5 z-[9999] group` : `group text-medium font-medium text-third fixed h-fit w-fit hover:cursor-pointer z-[9999]`}>
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
                <div className="w-11/12 sm:w-10/12 md:w-4/6 lg:w-3/6 h-fit mt-52 mb-28 mx-auto">
                    
                <NavigationSection landingPage={props.landingPage} />
                </div>
            </div>
            <div id="cart" className={scrolled ? `text-medium font-medium bg-transparent rounded-full right-5 text-third fixed hover:cursor-pointer h-fit w-fit pt-2 pb-0 px-1.5 z-[9999] group` : `group text-medium font-medium text-third fixed h-fit w-fit hover:cursor-pointer z-[9999]`}>
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