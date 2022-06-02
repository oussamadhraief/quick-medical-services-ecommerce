import Link from 'next/link'
import { useSession } from "next-auth/react"
import Image from 'next/image'
import { useState,useEffect } from 'react'
import { signOut } from 'next-auth/react'

const UserNavigation = (props) => {

    const { data: session } = useSession()
    
    const [isMobile,setIsMobile] = useState(false)
    const [open,setOpen] = useState(false)

    useEffect(() => {
        const mql = window.matchMedia('(max-width: 1023px)')
        if(mql.matches){
            setIsMobile(true)
        }
    },[])

    if(isMobile && !props.panel)

    return (
        <div className={session.user?.isAdmin ? "flex w-48 h-fit flex-nowrap justify-center items-center relative" : "flex w-fit h-fit flex-nowrap justify-center items-center relative"}>
            
            <button className={open ? "text-white font-[400] ml-2 hover:cursor-pointer flex items-center bg-[#105f61cc] px-2 py-1 rounded-md" : "text-white font-[400] ml-2 hover:cursor-pointer flex items-center px-2 py-1"} onClick={e => setOpen(prev => !prev)}><Image src={'pfe/user-6781_dtonfu.png'} alt='account' width={15} height={15} layout='fixed' className="hover:cursor-pointer" /> &nbsp;{session.user.name} &nbsp;<Image src={'pfe/icons8-chevron-up-96_l5fczz_mtaqrc'} alt='account' width={13} height={7} layout='fixed' className={open ? "hover:cursor-pointer rotate-0 transition-all" : "hover:cursor-pointer rotate-180 transition-all"} /></button>
    
            <div className={open ? "grid transition-[visibility] absolute top-[120%] rounded-md left-1 place-content-center place-items-center w-full h-fit py-1 px-2" : "hidden"}>
            
                {session.user?.isAdmin && !props.panel ?
                <Link href='/admin/products/add'>
                        <a className="hover:text-pinky w-full group-hover:block h-fit text-center text-white  font-medium py-5 z-10 whitespace-nowrap">Panneau d&apos;administration</a>
                </Link> :
                <Link href='/'>
                        <a className="hover:text-pinky w-full group-hover:block h-fit text-center text-white  font-medium py-5 z-10">Acceuil</a>
                </Link> }
                <Link href='/account/information'>
                    <a className="hover:text-pinky w-full group-hover:block h-fit text-center text-white  font-medium py-5 z-10">Mon compte</a>
                </Link>
            
                <Link href='/account/orders'>
                        <a className="hover:text-pinky w-full group-hover:block h-fit text-center text-white  font-medium py-5 z-10">Mes commandes</a>
                </Link>
    
    
                <button className="font-medium hover:text-pinky w-full group-hover:block h-fit text-center text-white py-5 z-10" onClick={() => signOut({ callbackUrl: window.location.origin+'/login' })} >Déconnexion</button>
                
            </div>
        </div> )


    
    return (
    <div className={session.user?.isAdmin ? "flex w-48 h-fit flex-nowrap justify-center items-center relative" : "flex w-fit h-fit flex-nowrap justify-center items-center relative"}>
        
        <button className={open ? "text-white font-[400] ml-2 hover:cursor-pointer flex items-center bg-[#105f61cc] px-2 py-1 rounded-md" : "text-white font-[400] ml-2 hover:cursor-pointer flex items-center px-2 py-1"} onClick={e => setOpen(prev => !prev)}><Image src={'pfe/user-6781_dtonfu.png'} alt='account' width={15} height={15} layout='fixed' className="hover:cursor-pointer" /> &nbsp;{session.user.name} &nbsp;<Image src={'pfe/icons8-chevron-up-96_l5fczz_mtaqrc'} alt='account' width={13} height={7} layout='fixed' className={open ? "hover:cursor-pointer rotate-0 transition-all" : "hover:cursor-pointer rotate-180 transition-all"} /></button>

        <div className={open ? "grid transition-[visibility] absolute top-[120%] rounded-md left-1 place-content-center place-items-center w-full h-fit bg-white py-1 px-2 shadow-stylish" : "hidden"}>
        
            {session.user?.isAdmin && !props.panel ?
            <Link href='/admin/products/add'>
                    <a className="hover:text-pinky w-full group-hover:block h-fit text-center  font-medium border-b pb-1 z-10 whitespace-nowrap">Panneau d&apos;administration</a>
            </Link> :
            <Link href='/'>
                    <a className="hover:text-pinky w-full group-hover:block h-fit text-center  font-medium border-b pb-1 z-10">Acceuil</a>
            </Link> }
            <Link href='/account/information'>
                <a className="hover:text-pinky w-full group-hover:block h-fit text-center  font-medium border-b pb-1 z-10">Mon compte</a>
            </Link>
        
            <Link href='/account/orders'>
                    <a className="hover:text-pinky w-full group-hover:block h-fit text-center  font-medium border-b pb-1 z-10">Mes commandes</a>
            </Link>


            <button className="font-medium hover:text-pinky w-full group-hover:block h-fit text-center  pb-1 z-10" onClick={() => signOut({ callbackUrl: window.location.origin+'/login' })} >Déconnexion</button>
            
        </div>
    </div> )
}

export default UserNavigation