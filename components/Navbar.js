import Image from "next/image"

export default function Navbar(){

    const logo = 'pfe/logoqms2_vx7xaw.png'

    return(
        <div className="flex flex-nowrap justify-evenly w-full h-fit py-3 items-center z-10">
            <div className="w-fit h-fit flex flex-nowrap justify-center items-center hover:cursor-pointer">
                <Image src={logo} alt='Quick medical services logo' width={240} height={100} layout='fixed' objectFit="center" />
            </div>
            <ul className="w-3/6 h-fit hidden sm:flex flex-nowrap justify-end mr-8 gap-20 items-center">
                <li className="text-medium font-medium text-third relative hover:cursor-pointer underlineAnimatedLink">À propos</li>
                <li className="text-medium font-medium text-third relative hover:cursor-pointer underlineAnimatedLink">Contact</li>
                <li className="text-medium font-medium text-third relative hover:cursor-pointer underlineAnimatedLink">Termes et conditions</li>
                <li id="anotherPositioning" className="relative hover:cursor-pointer"></li>
            </ul>
        </div>
    )
}