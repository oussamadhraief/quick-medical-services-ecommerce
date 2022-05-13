import Image from "next/image"
import Link from 'next/link'
import { useState, useEffect } from "react"

export default function CartObject({ scrolled, isMobile }){

    useEffect(() => {
        const mq1 = window.matchMedia("(max-width: 1023px)")
            if(!mq1.matches){
                document.getElementById('cart').style.top = document.getElementById('anotherPositioning').getBoundingClientRect().top + 3 +'px'
                document.getElementById('cart').style.left = document.getElementById('anotherPositioning').getBoundingClientRect().left +'px'
            }

            
            
            const cartTimeout = setTimeout(() => {
                document.getElementById('cart').style.transitionProperty = 'all'
                document.getElementById('cart').style.transitionDuration = '1s'
            }, 1000);

                window.addEventListener("scroll", () => {
                    handleAnimation()
                }
            )
                window.addEventListener("resize", () => {
                    handleAnimation()
                }
            )

            globalThis.handleAnimation = () => {
                if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
                    document.getElementById('cart').style.left = document.getElementById('positioning').getBoundingClientRect().left +'px'
                    document.getElementById('cart').style.top = document.getElementById('positioning').getBoundingClientRect().top +'px'
                } else {
                    if(isMobile){
                        document.getElementById('cart').style.top = document.getElementById('anotherPositioning').getBoundingClientRect().top - 3 +'px'
                        document.getElementById('cart').style.left = document.getElementById('anotherPositioning').getBoundingClientRect().left - 50 +'px'
                    }else {
                        document.getElementById('cart').style.top = document.getElementById('anotherPositioning').getBoundingClientRect().top + 3 +'px'
                        document.getElementById('cart').style.left = document.getElementById('anotherPositioning').getBoundingClientRect().left - 40 +'px'
                    }
                }
           
        }
            
            return () => {
                clearTimeout(cartTimeout)
               
                    window.removeEventListener('scroll',  () => {
                        handleAnimation()
                    });
                    window.removeEventListener("resize", () => {
                        handleAnimation()
                    });
   
            }
    },[])

   

    

    return(
        <>
        <div id="cart" className={scrolled ? `transition-all duration-1000 text-medium font-medium bg-transparent rounded-full text-third fixed hover:cursor-pointer h-fit w-fit pt-2 pb-0 px-1.5 z-[9999] group` : `group text-medium font-medium text-third fixed h-fit w-fit hover:cursor-pointer z-[9999] transition-all duration-1000`}>
                <div className={scrolled ? "absolute w-fit h-fit hidden group-hover:block  right-[90%] top-4 bg-na3ne3i text-white font-[400] rounded-md px-2 py-0.5" :  "absolute w-fit h-fit hidden group-hover:block  right-[105%] top-1.5 bg-white rounded-md px-2 py-0.5"}>
                    panier
                </div>
                <Link href='/cart'>
                <a><Image src={scrolled ? `pfe/icons8-cart-128_6_adkuqt.png` : `pfe/icons8-cart-128_5_njo2lu.png`} alt='cart icon' width={42} height={37} layout='fixed' objectFit="contain" objectPosition='center' /></a>
                </Link>
                <p className={scrolled ? "absolute bg-pinky rounded-full w-fit h-fit top-1.5 right-4 text-black font-medium text-xs px-1.5 text-center" : 'absolute bg-pinky rounded-full w-fit h-fit top-0 right-2.5 text-black font-medium text-[10px] px-1.5 text-center'}>2</p>
            </div>
            <div id="positioning" className="fixed bottom-0.5 right-3 w-14 h-14">
                
            </div>
        </>
    )
}