import Image from "next/image"

export default function Navbar(){

    const logo = 'pfe/qmslogo_fggyn9.png'

    return(
        <div className="flex flex-nowrap justify-around w-full h-fit py-3 items-center">
            <div className="w-fit h-fit">
                <Image src={logo} alt='Quick medical services logo' width={220} height={80} layout='fixed' objectFit="center" />
            </div>
            <ul className="w-3/6 h-fit flex flex-nowrap justify-end gap-20 items-center">
                <li className="text-medium font-medium text-third relative hover:cursor-pointer underlineAnimatedLink">À propos</li>
                <li className="text-medium font-medium text-third relative hover:cursor-pointer underlineAnimatedLink">Contact</li>
                <li className="text-medium font-medium text-third relative hover:cursor-pointer underlineAnimatedLink">Termes et conditions</li>
            </ul>
        </div>
    )
}