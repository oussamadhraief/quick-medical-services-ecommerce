import Image from "next/image"
import 'animate.css'
import Link from "next/link"
import { useEffect, useState } from "react"
import { useSession, signOut, signIn } from "next-auth/react"


export default function Navbar({ scrolled }){
    const { data: session, status } = useSession()
    const [isMobile,setIsMobile]= useState(false)
    const [dropDown , setDropDown] = useState(false)
    const logo = 'pfe/Quick_medical_services_3_dwzzzz.png'
    const isAuthenticated = (status === "authenticated")

    useEffect(()=>{
        const mql= window.matchMedia('(max-width: 1023px)')
        if(mql.matches){
            setIsMobile(true)
            window.scroll(0,1)
        }else{
            setIsMobile(false)
        }
    },[])

    
    const handleDropDownClick = (event) =>{
        
        let firstElem = document.getElementById('first')
        let secondElem = document.getElementById('second')
        let thirdElem = document.getElementById('third')
        
            if(!dropDown){
                firstElem.style.transform = 'rotate(45deg)'
                firstElem.style.width = '24px'
                thirdElem.style.width = '24px'
                thirdElem.style.top = '0px'
                secondElem.style.visibility = 'hidden'
                thirdElem.style.transform = 'rotate(-45deg)'
                document.body.style.height= "100vh"
                document.body.style.overflow= "hidden"
                document.getElementById('cart').style.display= "none"
                document.getElementById('clickableMenu').style.position= "fixed"
                document.getElementById('clickableMenu').style.top= "15px"
                document.getElementById('clickableMenu').style.right= "10px"
                
            }
            else{
                document.getElementById('clickableMenu').style.position= "relative"
                document.getElementById('clickableMenu').style.top= "0px"
                document.getElementById('clickableMenu').style.right= "0px"
                firstElem.style.transform = 'rotate(0deg)'
                firstElem.style.width = '20px'
                thirdElem.style.width = '20px'
                thirdElem.style.top = '16px'
                firstElem.style.top = '0px'
                secondElem.style.visibility = 'visible'
                thirdElem.style.transform = 'rotate(0deg)'
                thirdElem.style.bottom = '0px'
                document.body.style.height= "fit-content"
                document.body.style.overflow= "auto"
                document.getElementById('cart').style.display= "block"


            }
            setDropDown(!dropDown)
         
    }
    
    
    return(
        <div id="nav" className={scrolled ? "flex flex-nowrap justify-between lg:justify-around bg-na3ne3i  w-full transition-all duration-500 h-fit py-3 items-center z-[99] shadow-3xl fixed" : "flex transition-all duration-500 flex-nowrap justify-between lg:justify-around w-full sm:px-10 lg:px-0 lg:w-11/12 h-fit py-3 items-center z-[99]  rounded-3xl fixed"}>
            <Link href='/'>
                <a className="relative ml-4 w-44 lg:m-0 h-12 md:w-60 md:h-16 flex flex-nowrap justify-center items-center hover:cursor-pointer"><Image src={logo} alt='Quick medical services logo' quality={100}  layout='fill' objectFit="center" /></a>
            </Link>
            
            <ul id="navDropdown" className={dropDown? "fixed grid place-content-center pb-[150vh] gap-14 w-screen h-[200vh] bg-na3ne3i top-0 left-0":"lg:w-3/6 h-fit hidden lg:flex  justify-end mr-8 gap-20 items-center"}>
                
                <li className={`lg:block ${ dropDown? 'font-medium mx-auto' : 'font-[400]'} text-white relative hover:cursor-pointer underlineAnimatedLink hover:text-pinky`}><Link href='/'>
                    <a>Accueil</a>
                    </Link></li>
                <li className={`lg:block ${ dropDown? 'font-medium mx-auto' : 'font-[400]'} text-white relative hover:cursor-pointer underlineAnimatedLink hover:text-pinky`}><Link href='/products'>
                    <a>Produits</a>
                    </Link></li>
                <li className={`lg:block ${ dropDown? 'font-medium mx-auto' : 'font-[400]'} text-white relative hover:cursor-pointer underlineAnimatedLink hover:text-pinky`}><Link href='/contact'>
                    <a>Contact</a>
                    </Link></li>
                <li className={`whitespace-nowrap lg:block ${ dropDown? 'font-medium' : 'font-[400]'} text-white relative hover:cursor-pointer underlineAnimatedLink hover:text-pinky`}>À propos</li>
                {isAuthenticated? <li><p>Signed in as {session.user.email}</p></li> : 
                <>  
                    <li><Link href='/login'><a className="whitespace-nowrap text-white font-[400] underlineAnimatedLink relative">Se connecter</a></Link></li>
                    <li className=" hover:scale-105 transition-all"><Link href='/register'><a className="bg-pinky w-fit h-fit px-4 py-2 rounded-lg text-white font-medium">S&apos;inscrire</a></Link></li>
                </>}
                {isMobile? null: <li id="anotherPositioning" className="relative w-10 h-10 hover:cursor-pointer"></li>}
                {isAuthenticated? <button className="bg-red-500" onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })} >Log out</button> : null}
            </ul>
            {isMobile?<div className="w-fit h-fit flex flex-nowrap items-center justify-center gap-3 mr-4">
                <div id="anotherPositioning" className="relative w-10 h-10 hover:cursor-pointer"></div>
                <div id="clickableMenu" className="relative w-6 h-6 grid gap-1 hover:cursor-pointer" onClick={()=>handleDropDownClick()}>
                    <div id="first" className="absolute h-[4px] w-5 bg-white rounded-sm transition-all top-0 left-0"></div>
                    <div id="second" className="absolute h-[4px] w-5 bg-white rounded-sm   top-2 left-0"></div>
                    <div id="third" className="absolute h-[4px] w-5 bg-white rounded-sm transition-all top-4 left-0"></div>
                </div>
                </div>
                :
                null}
            
            
        </div>
    )
}



