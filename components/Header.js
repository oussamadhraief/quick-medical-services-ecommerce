import Navbar from "./Navbar"
import NavigationSection from "./NavigationSection"
import { useState, useEffect } from "react"
import Image from "next/image"
import 'animate.css'

export default function Header(){

    const cart = 'pfe/cart_ygq4xr.png'
    const banner = 'pfe/taxi-485_scg8nz.png'
    const design = 'pfe/download_libhgv.png'

    const [scrolled,setscrolled] = useState(false)

    useEffect(() => {
        document.getElementById('cart').style.top = (document.querySelectorAll('.underlineAnimatedLink')[0].getBoundingClientRect().top) +'px'
        document.getElementById('cart').style.left = document.getElementById('anotherPositioning').getBoundingClientRect().left +'px'
    },[])

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
                setscrolled(true)
                document.getElementById('cart').style.left = document.getElementById('positioning').getBoundingClientRect().left +'px'
                document.getElementById('cart').style.top = document.getElementById('positioning').getBoundingClientRect().top +'px'
                document.getElementById('nav').classList.add('glass')
                document.getElementById('anotherPositioning').style.display = 'none'
            } else {
                setscrolled(false)
                document.getElementById('cart').style.top = (document.querySelectorAll('.underlineAnimatedLink')[0].getBoundingClientRect().top) +'px'
                document.getElementById('cart').style.left = document.getElementById('anotherPositioning').getBoundingClientRect().left +'px'
                document.getElementById('anotherPositioning').style.display = 'block'
                document.getElementById('nav').classList.remove('glass')
            }
          }
    )})

    return (
        <header className="bg-gradient-to-br from-light to-na3ne3i pt-5 flex flex-col items-center">
            <Navbar />
            <div className="w-full h-fit flex flex-nowrap items-center justify-evenly mt-24">
                <div className="grid place-items-start">
                <h1 className="flex flex-nowrap gap-5 text-[70px] font-extrabold justify-center items-center text-white animate__animated animate__backInLeft">
                    LES MEILLEURS 
                    <div className="grid w-fit h-fit mt-1">
                    <h6 className="text-xl font-extrabold mb-[1px]">PRIX</h6>
                    <h6 className="text-xl font-extrabold">PRODUITS</h6>
                    </div>
                </h1>
                <p className="text-secondary font-medium text-xl pl-1 animate__animated animate__delay-1s animate__bounceInLeft">Import & distribution du matériel chirurgical et dentaire sur toute la Tunisie</p>
                <div className="my-10 w-full h-fit flex flex-nowrap justify-evenly animate__animated animate__delay-2s animate__bounceInLeft">
                <button className="text-white bg-gradient-to-r from-ciel to-[#0689c5] px-4 py-3 w-1/3">Explorer les produits &#x2192;</button>
                <button className="text-white bg-gradient-to-r from-[#0689c5] to-ciel px-4 py-3 ml-1 w-1/3">Contactez-nous !</button>
                </div>
                <NavigationSection />

                </div>
                <div id="banner" className="relative w-[700px] h-[700px]">
                    <Image src={banner} alt='surgeon' layout='fill' />
                </div>
            </div>
            <div id="cart" className={scrolled ? `text-medium font-medium bg-white rounded-full shadow-stylish right-5 text-third fixed hover:cursor-pointer h-fit w-fit pt-2 pb-0 px-1.5 z-[9999]` : `text-medium font-medium text-third fixed h-fit w-fit hover:cursor-pointer z-[9999]`}>
                <Image src={cart} alt='cart icon' width={37} height={32} layout='fixed' objectFit="contain" objectPosition='center' />
                <p className={scrolled ? "absolute bg-third border shadow-stylish rounded-full w-fit h-fit top-0 -right-2.5 text-white font-medium text-sm px-1.5 text-center" : 'absolute bg-third border shadow-stylish rounded-full w-fit h-fit -top-1 -right-3 text-white font-medium text-xs px-1.5 text-center'}>2</p>
            </div>
            <div id="positioning" className="fixed bottom-0.5 right-1.5 w-14 h-14">
                
            </div>
            <div className="w-full h-20 relative">
                <Image src={design} alt='design' layout="fill" />
            </div>
        </header>
    )
}