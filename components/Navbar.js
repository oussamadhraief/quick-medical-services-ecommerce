import Image from "next/image"
import 'animate.css'
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Navbar({ scrolled }){

    const [isMobile,setIsMobile]= useState(false)
    const [dropDown , setDropDown] = useState(false)
    const logo = 'pfe/22BF79_v9wauf.png'

    useEffect(()=>{
        const mql= window.matchMedia('(max-width: 1023px)')
        if(mql.matches){
            setIsMobile(true)
        }else{
            setIsMobile(false)
        }
    },[])

    const handleDropDownClick = (event) =>{
        
        let firstElem = document.getElementById('first')
        let secondElem = document.getElementById('second')
        let thirdElem = document.getElementById('third')
        
            if(!dropDown){
                firstElem.style.transform = 'rotate(-45deg)'
                firstElem.style.top = '8px'
                secondElem.style.visibility = 'hidden'
                thirdElem.style.transform = 'rotate(45deg)'
                thirdElem.style.bottom = '10px'
                document.body.style.height= "100vh"
                document.body.style.overflow= "hidden"
                document.getElementById('cart').style.display= "none"
                document.getElementById('clickableMenu').style.position= "fixed"
                document.getElementById('clickableMenu').style.top= "5px"
                document.getElementById('clickableMenu').style.right= "10px"
                
            }
            else{
                firstElem.style.transform = 'rotate(0deg)'
                firstElem.style.top = '0px'
                secondElem.style.visibility = 'visible'
                thirdElem.style.transform = 'rotate(0deg)'
                thirdElem.style.bottom = '0px'
                document.body.style.height= "fit-content"
                document.body.style.overflow= "auto"
                document.getElementById('cart').style.display= "block"
                document.getElementById('clickableMenu').style.position= "relative"


            }
            setDropDown(!dropDown)
         
    }
    
    return(
        <div id="nav" className={scrolled ? "flex flex-nowrap justify-between lg:justify-around  w-full transition-all duration-500 h-fit py-3 items-center z-[99] bg-white shadow-3xl fixed" : "flex transition-all duration-500 flex-nowrap justify-between lg:justify-around  w-11/12 h-fit py-3 items-center z-[99] bg-white  rounded-3xl fixed"}>
            <Link href='/'>
                <a className="relative ml-4 w-32 lg:m-0 h-12 md:w-40 md:h-16 flex flex-nowrap justify-center items-center hover:cursor-pointer"><Image src={logo} alt='Quick medical services logo' width={230} height={90} layout='fill' objectFit="center" /></a>
            </Link>
            
            <ul id="navDropdown" className={dropDown? "fixed flex flex-col items-center pt-14 gap-10 flex-nowrap w-screen h-screen bg-beige -top-5":"lg:w-3/6 h-fit  hidden lg:flex  justify-end mr-8 gap-20 items-center"}>
                
                <li className="md:block font-medium text-third relative hover:cursor-pointer underlineAnimatedLink"><Link href='/'>
                    <a>Accueil</a>
                    </Link></li>
                <li className="md:block font-medium text-third relative hover:cursor-pointer underlineAnimatedLink"><Link href='/products'>
                    <a>Produits</a>
                    </Link></li>
                <li className="md:block font-medium text-third relative hover:cursor-pointer underlineAnimatedLink"><Link href='/contact'>
                    <a>Contact</a>
                    </Link></li>
                <li className="whitespace-nowrap md:block font-medium text-third relative hover:cursor-pointer underlineAnimatedLink">À propos</li>
                {isMobile? null: <li id="anotherPositioning" className="relative w-10 h-10 hover:cursor-pointer"></li>}
            </ul>
            {isMobile?<div className="w-fit h-fit flex flex-nowrap items-center justify-center gap-3 mr-4">
                <div id="anotherPositioning" className="relative w-10 h-10 hover:cursor-pointer"></div>
                <div id="clickableMenu" className="relative w-fit h-fit grid gap-1 " onClick={()=>handleDropDownClick()}>
                    <div id="first" className="relative h-[4px] w-5 bg-third transition-all "></div>
                    <div id="second" className="h-[4px] w-5 bg-third   "></div>
                    <div id="third" className="relative h-[4px] w-5 bg-third transition-all "></div>
                </div>
                </div>:null}
            
            
        </div>
    )
}



