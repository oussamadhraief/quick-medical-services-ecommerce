import Image from "next/image"
import 'animate.css'
import Link from "next/link"

export default function Navba({ scrolled }){

    const logo = 'pfe/22BF79_v9wauf.png'

    return(
        <div id="nav" className={scrolled ? "flex flex-nowrap justify-around  w-full transition-all duration-500 h-fit py-3 items-center z-[99] bg-white shadow-3xl fixed" : "flex transition-all duration-500 flex-nowrap justify-around  w-11/12 h-fit py-3 items-center z-[99] bg-white  rounded-[50px] fixed"}>
            <Link href='/'>
                <a className="w-fit h-fit flex flex-nowrap justify-center items-center hover:cursor-pointer"><Image src={logo} alt='Quick medical services logo' width={230} height={90} layout='fixed' objectFit="center" /></a>
            </Link>
            <ul className="md:w-3/6 h-fit grid md:flex flex-nowrap justify-end mr-8 gap-20 items-center">
                <li className="text-medium hidden md:block font-medium text-third relative hover:cursor-pointer underlineAnimatedLink"><Link href='/'>
                    <a>Accueil</a>
                    </Link></li>
                <li className="text-medium hidden md:block font-medium text-third relative hover:cursor-pointer underlineAnimatedLink"><Link href='/products'>
                    <a>Produits</a>
                    </Link></li>
                <li className="text-medium hidden md:block font-medium text-third relative hover:cursor-pointer underlineAnimatedLink"><Link href='/contact'>
                    <a>Contact</a>
                    </Link></li>
                <li className="text-medium hidden md:block font-medium text-third relative hover:cursor-pointer underlineAnimatedLink">À propos</li>
                <li id="anotherPositioning" className="relative w-10 h-10 hover:cursor-pointer"></li>
            </ul>
        </div>
    )
}