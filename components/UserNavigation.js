import Link from 'next/link'
import { useSession } from "next-auth/react"
import Image from 'next/image'
import { useState } from 'react'
import { signOut } from 'next-auth/react'

const UserNavigation = () => {

    const { data: session } = useSession()
    
    const [open,setOpen] = useState(false)

    return (
    <div className="flex w-fit h-fit flex-nowrap justify-center items-center relative">
        
        <button className={open ? "text-white font-[400] ml-2 hover:cursor-pointer flex items-center bg-[#105f61cc] px-2 py-1 rounded-md" : "text-white font-[400] ml-2 hover:cursor-pointer flex items-center px-2 py-1"} onClick={e => setOpen(prev => !prev)}><Image src={'pfe/user-6781_dtonfu.png'} alt='account' width={15} height={15} layout='fixed' className="hover:cursor-pointer" /> &nbsp;{session.user.name}</button>

        <div className={open ? "grid transition-[visibility] absolute top-[120%] rounded-md left-1 place-content-center place-items-center w-full h-fit bg-white py-1 px-2 shadow-stylish" : "hidden"}>
        
            <Link href='/account/information'>
                <a className="hover:text-pinky w-full group-hover:block h-fit text-center  font-medium border-b pb-1 z-10">Mon compte</a>
            </Link>
        
            <Link href='/account/orders'>
                    <a className="hover:text-pinky w-full group-hover:block h-fit text-center  font-medium border-b pb-1 z-10">Mes commandes</a>
            </Link>
            <button className="font-medium hover:text-pinky w-full group-hover:block h-fit text-center  pb-1 z-10" onClick={() => signOut({ callbackUrl: 'http://localhost:3000/login' })} >Déconnexion</button>
            
        </div>
    </div> )
}

export default UserNavigation;