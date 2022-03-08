import Navbar from "./Navbar"
import NavigationSection from "./NavigationSection"
import { useState, useEffect } from "react"
import Image from "next/image"
import 'animate.css'
import Link from 'next/link'

export default function Header(props){

    const cart = 'pfe/cart_ygq4xr.png'
    const banner = 'pfe/taxi-485_scg8nz.png'
    const design = 'pfe/download_libhgv.png'

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
        <header className={`${props.landingPage ? 'bg-gradient-to-br from-light to-na3ne3i' : 'backgroundShiny'} ${scrolled ? 'pt-0' : 'pt-5'} flex flex-col w-full h-fit items-center`}>
            <Navbar scrolled={scrolled} />
            {props.landingPage ? 
            <>
            <div id="header" className="w-11/12 md:w-full h-fit px-0 md:px-10 gap-0 md:gap-10 grid md:flex md:flex-nowrap md:items-center md:justify-evenly mb-5">
                <div className="grid place-items-start w-full order-2 md:order-1 md:w-[45%]">
                <h1 className="flex flex-nowrap gap-5 text-xl sm:text-3xl md:text-5xl lg:text-[70px] font-extrabold justify-center items-center text-white animate__animated animate__backInLeft">
                    LES MEILLEURS 
                    <div className="grid w-fit h-fit mt-1">
                    <h6 className="text-xl font-extrabold mb-[1px]">PRIX</h6>
                    <h6 className="text-xl font-extrabold">PRODUITS</h6>
                    </div>
                </h1>
                <p className="text-secondary font-medium text-xl pl-1 animate__animated animate__delay-1s animate__bounceInLeft">Import & distribution du matériel chirurgical et dentaire sur toute la Tunisie</p>
                <div className="my-10 w-full h-fit flex flex-nowrap justify-evenly animate__animated animate__delay-2s animate__bounceInLeft">
                <Link href='/products'>
                    <a className="text-white bg-gradient-to-r from-ciel to-[#0689c5] px-4 py-3 w-1/3 whitespace-nowrap text-center hover:from-cool hover:to-cool hover:scale-105 transition-all">Explorer les produits &#x2192;</a>
                </Link>
                <Link href='/contact'>
                    <a className="text-white bg-gradient-to-r from-ciel to-[#0689c5] px-4 py-3 w-1/3 whitespace-nowrap text-center hover:from-cool hover:to-cool hover:scale-105 transition-all">Contactez-nous !</a>
                </Link>
                </div>
                <NavigationSection landingPage={props.landingPage} />

                </div>
                <div id="banner" className="relative order-1 md:order-2 w-full md:w-5/12 h-full">
                    <Image src={banner} alt='surgeon' width={700} height={700} layout='responsive' />
                </div>
            </div>
            <div id="cart" className={scrolled ? `text-medium font-medium bg-white rounded-full shadow-stylish right-5 text-third fixed hover:cursor-pointer h-fit w-fit pt-2 pb-0 px-1.5 z-[9999]` : `text-medium font-medium text-third fixed h-fit w-fit hover:cursor-pointer z-[9999]`}>
                <Link href='/cart'>
                <a><Image src={cart} alt='cart icon' width={37} height={32} layout='fixed' objectFit="contain" objectPosition='center' /></a>
                </Link>
                <p className={scrolled ? "absolute bg-third border shadow-stylish rounded-full w-fit h-fit top-0 -right-2.5 text-white font-medium text-sm px-1.5 text-center" : 'absolute bg-third border shadow-stylish rounded-full w-fit h-fit -top-1 -right-3 text-white font-medium text-xs px-1.5 text-center'}>2</p>
            </div>
            <div id="positioning" className="fixed bottom-0.5 right-1.5 w-14 h-14">
                
            </div>
            <div className="w-full h-20 relative">
                <Image src={design} alt='design' layout="fill" />
            </div>
            </> 
            : 
            <>
            <div id="header" className="w-11/12 md:w-full h-fit px-0 md:px-10 gap-0 md:gap-10 grid md:flex md:flex-nowrap md:items-center md:justify-evenly mb-5">
                <div className="w-11/12 sm:w-10/12 md:w-4/6 lg:w-3/6 h-fit mt-52 mb-28 mx-auto">
                    
                <NavigationSection landingPage={props.landingPage} />
                </div>
            </div>
            <div id="cart" className={scrolled ? `text-medium font-medium bg-white rounded-full shadow-stylish right-5 text-third fixed hover:cursor-pointer h-fit w-fit pt-2 pb-0 px-1.5 z-[9999]` : `text-medium font-medium text-third fixed h-fit w-fit hover:cursor-pointer z-[9999]`}>
                <Link href='/cart'>
                <a><Image src={cart} alt='cart icon' width={37} height={32} layout='fixed' objectFit="contain" objectPosition='center' /></a>
                </Link>
                <p className={scrolled ? "absolute bg-third border shadow-stylish rounded-full w-fit h-fit top-0 -right-2.5 text-white font-medium text-sm px-1.5 text-center" : 'absolute bg-third border shadow-stylish rounded-full w-fit h-fit -top-1 -right-3 text-white font-medium text-xs px-1.5 text-center'}>2</p>
            </div>
            <div id="positioning" className="fixed bottom-0.5 right-1.5 w-14 h-14">
                
            </div>
            <div className="w-full h-20 relative">
                <Image src={design} alt='design' layout="fill" />
            </div>
            </> }
        </header>
    )
}