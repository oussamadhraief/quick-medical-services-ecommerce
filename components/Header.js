import Navbar from "./Navbar"
import NavigationSection from "./NavigationSection"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function Header(){

    const cart = 'pfe/cart_ygq4xr.png'

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
            } else {
                setscrolled(false)
                document.getElementById('cart').style.top = (document.querySelectorAll('.underlineAnimatedLink')[0].getBoundingClientRect().top) +'px'
                document.getElementById('cart').style.left = document.getElementById('anotherPositioning').getBoundingClientRect().left +'px'
            }
          }
    )})

    return (
        <header className="bg-white mb-32">
            <Navbar />
            <NavigationSection />
            <div id="cart" className={scrolled ? `text-medium font-medium bg-white rounded-full shadow-stylish right-5 text-third fixed hover:cursor-pointer h-fit w-fit pt-1.5 pb-0.5 px-1.5 z-[9999]` : `text-medium font-medium text-third fixed h-fit w-fit hover:cursor-pointer z-[9999]`}><Image src={cart} alt='cart icon' width={37} height={32} layout='fixed' objectFit="contain" objectPosition='center' /></div>
            <div id="positioning" className="fixed bottom-0.5 right-1 w-14 h-14">
                
            </div>
        </header>
    )
}