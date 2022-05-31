import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from "next/router"

export default function AdminMenu(props){
    const router = useRouter()

    const add = 'pfe/add_ufxdwy.png'
    const addselected = 'pfe/plusselected_xpokri_lz0tlc.png'
    const Modify = 'pfe/modify_p9iu6t.png'
    const Modifyselected = 'pfe/modifyselected_ncujpy_fdlkhp.png'
    const deleted = 'pfe/trash-can-10416_k4kv2q.png'
    const deletedselected = 'pfe/trash-can-10416_1_mfx2mv.png'
    const orders = 'pfe/orders_kkbnuv.png'
    const ordersselected = 'pfe/ordersselected_m3jukr_io8hiq.png'
    const archived = 'pfe/archived_ljkyaa.png'
    const archivedselected = 'pfe/archivedselected_bodb8b_pbgvvx.png'
    const quote = 'pfe/conversation-11887_ne8x9x.png'
    const quoteselected = 'pfe/conversation-11887_1_fgclep.png'
    const old = 'pfe/icons8-sand-timer-64_o4oyss'
    const oldselected = 'pfe/icons8-sand-timer-64_1_dbl2x9'
    const messages = 'pfe/icons8-mail-50_wmjivn'
    const messagesselected = 'pfe/icons8-mail-50_1_jyuobr'

    useEffect(() => {
        const mql = window.matchMedia('(max-width: 767px)')
        if(mql.matches){ 
            props.setOpen(false)

        }
    },[])

    useEffect(() => {
        window.addEventListener('resize',() => {
            let mql = window.matchMedia('(max-width: 767px)')
            if(mql.matches){ 
                props.setOpen(false)
            }
        })
        return () => {
            window.removeEventListener('resize',() => {
            let mql = window.matchMedia('(max-width: 767px)')
            if(mql.matches){ 
                props.setOpen(false)
            }
        })
        }
    })


    return (
        <aside id='nav' className={props.open ? "bg-na3ne3i h-screen md:h-full absolute md:relative duration-150 space-y-4 pl-1 z-40 w-full pr-2 md:pr-1 md:w-72 pt-1" : "bg-na3ne3i border-t border-pinky h-12 md:h-full absolute md:relative duration-150 space-y-4 pl-1 md:pl-0 z-40 w-full md:w-0 pt-2 pr-2 md:pr-0 md:pt-1"}>
            
            {props.open ? 
            <>
            <Link href='/admin/products/add'>
            <div className={props.selected == 1 ? "mt-4 w-full bg-white px-1 py-2 flex flex-nowrap justify-center md:justify-start items-center space-x-1 hover:cursor-pointer rounded-md" : "mt-4 w-full bg-transparent px-1 py-2 flex flex-nowrap justify-center md:justify-start items-center space-x-1 hover:cursor-pointer hover:bg-pinky rounded-md"}>
            {props.selected == 1 ? <Image src={addselected} alt="plus" width={15} height={15} layout="fixed" id='addIcon' /> : <Image src={add} alt="plus" width={15} height={15} layout="fixed" id='addIcon' />}
            <a className={props.selected == 1 ? "font-medium text-[15px] text-na3ne3i whitespace-nowrap" : "font-medium text-[15px] text-white whitespace-nowrap"}>Ajouter des produits</a>
            </div>
            </Link>
            
            

            <Link href='/admin/products/manage?page=0'>
            <div id="modifyProducts" className={props.selected == 2 ? "mt-9 w-full bg-white px-1 py-2 flex flex-nowrap justify-center md:justify-start items-center space-x-1 hover:cursor-pointer rounded-md" : "mt-9 w-full bg-transparent px-1 py-2 flex flex-nowrap justify-center md:justify-start items-center space-x-1 hover:cursor-pointer hover:bg-pinky rounded-md"}>
            {props.selected == 2 ? <Image src={Modifyselected} alt="plus" width={15} height={17} layout="fixed" /> : <Image src={Modify} alt="plus" width={15} height={17} layout="fixed" />}
            <p className={props.selected == 2 ? "font-medium text-[15px] text-na3ne3i whitespace-nowrap" : "font-medium text-[15px] text-white whitespace-nowrap"}>Modifier les produits</p>
        </div>
            </Link>

            <Link href='/admin/products/archived?page=0'>
            <div id="archivedProducts" className={props.selected == 3 ? "mt-9 w-full bg-white px-1 py-2 flex flex-nowrap justify-center md:justify-start items-center space-x-1 hover:cursor-pointer rounded-md" : "mt-9 w-full bg-transparent px-1 py-2 flex flex-nowrap justify-center md:justify-start items-center space-x-1 hover:cursor-pointer hover:bg-pinky rounded-md"}>
            {props.selected == 3 ? <Image src={deletedselected} alt="plus" width={15} height={17} layout="fixed" /> : <Image src={deleted} alt="plus" width={15} height={17} layout="fixed" />}
            <p className={props.selected == 3 ? "font-medium text-[15px] text-na3ne3i whitespace-nowrap" : "font-medium text-[15px] text-white whitespace-nowrap"}>Produits archivés</p>
        </div>
            </Link>

            <Link href='/admin/orders/manage'>
            <div
            className={props.selected === 4 ? 'mt-9 w-full bg-white px-1 py-2 flex flex-nowrap items-center justify-center md:justify-start space-x-1 hover:cursor-pointer rounded-md' : 'mt-9 w-full bg-transparent px-1 py-2 flex flex-nowrap items-center justify-center md:justify-start space-x-1 hover:cursor-pointer hover:bg-pinky rounded-md'}
            >
            {props.selected === 4 ? (
                <Image
                src={ordersselected}
                alt='plus'
                width={15}
                height={15}
                layout='fixed'
                />
            ) : (
                <Image src={orders} alt='plus' width={15} height={15} layout='fixed' />
            )}
            <p className={props.selected === 4 ? ' font-medium text-[15px] text-na3ne3i whitespace-nowrap' : ' font-medium text-[15px] text-white whitespace-nowrap'}>Voir les commandes</p>
            </div>
            </Link>

            <Link href='/admin/orders/archived'>
                <div className={props.selected == 5 ? "mt-9 w-full bg-white px-1 py-2 flex flex-nowrap items-center justify-center md:justify-start space-x-1 hover:cursor-pointer rounded-md" : "mt-9 w-full bg-transparent px-1 py-2 flex flex-nowrap items-center justify-center md:justify-start space-x-1 hover:cursor-pointer hover:bg-pinky rounded-md"}>
                {props.selected == 5 ? <Image src={archivedselected} alt="plus" width={17} height={17} layout="fixed" /> : <Image src={archived} alt="plus" width={17} height={17} layout="fixed" />}
                <p className={props.selected === 5 ? ' font-medium text-[15px] text-na3ne3i whitespace-nowrap' : ' font-medium text-[15px] text-white whitespace-nowrap'}>Commandes archivées</p>
                </div>
            </Link>

            <Link href='/admin/quoterequests/manage'>
                <div className={props.selected == 6 ? "mt-9 w-full bg-white px-1 py-2 flex flex-nowrap items-center justify-center md:justify-start space-x-1 hover:cursor-pointer rounded-md" : "mt-9 w-full bg-transparent px-1 py-2 flex flex-nowrap items-center justify-center md:justify-start space-x-1 hover:cursor-pointer hover:bg-pinky rounded-md"}>
                {props.selected == 6 ? <Image src={quoteselected} alt="plus" width={17} height={17} layout="fixed" /> : <Image src={quote} alt="plus" width={17} height={17} layout="fixed" />}
                <p className={props.selected == 6 ? ' font-medium text-[15px] text-na3ne3i whitespace-nowrap' : ' font-medium text-[15px] text-white whitespace-nowrap'}>Voir les demandes de devis</p>
                </div>
            </Link>

            <Link href='/admin/quoterequests/archived'>
                <div className={props.selected == 7 ? "mt-9 w-full bg-white px-1 py-2 flex flex-nowrap items-center justify-center md:justify-start space-x-1 hover:cursor-pointer rounded-md" : "mt-9 w-full bg-transparent px-1 py-2 flex flex-nowrap items-center justify-center md:justify-start space-x-1 hover:cursor-pointer hover:bg-pinky rounded-md"}>
                {props.selected == 7 ? <Image src={oldselected} alt="plus" width={13} height={15} layout="fixed" /> : <Image src={old} alt="plus" width={13} height={15} layout="fixed" />}
                <p className={props.selected == 7 ? ' font-medium text-[15px] text-na3ne3i whitespace-nowrap' : ' font-medium text-[15px] text-white whitespace-nowrap'}>Demandes de devis archivées</p>
                </div>
            </Link>

            <Link href='/admin/messages'>
                <div className={props.selected == 8 ? "mt-9 w-full bg-white px-1 py-2 flex flex-nowrap items-center justify-center md:justify-start space-x-1 hover:cursor-pointer rounded-md" : "mt-9 w-full bg-transparent px-1 py-2 flex flex-nowrap items-center justify-center md:justify-start space-x-1 hover:cursor-pointer hover:bg-pinky rounded-md"}>
                {props.selected == 8 ? <Image src={messagesselected} alt="plus" width={15} height={15} layout="fixed" /> : <Image src={messages} alt="plus" width={15} height={15} layout="fixed" />}
                <p className={props.selected == 8 ? ' font-medium text-[15px] text-na3ne3i whitespace-nowrap' : ' font-medium text-[15px] text-white whitespace-nowrap'}>Messages reçus</p>
                </div>
            </Link>

            <div className={props.selected == 9 ? "mt-9 w-full bg-white px-1 py-2 flex flex-nowrap items-center justify-center md:justify-start space-x-1 hover:cursor-pointer rounded-md" : "hidden"}>
            <Image src={'pfe/searchIcon_ooxkbe_tg1uir'} alt="plus" width={15} height={15} layout="fixed" />
            <p className='font-medium text-[15px] text-na3ne3i whitespace-nowrap'>Résultats de le recherche</p>
            </div>


            <Link href='/'>
                <div className="mt-9 w-fit pr-1 pl-0.5 flex flex-nowrap items-center hover:cursor-pointer group absolute bottom-3 group">
                    <p className=" font-sm text-white whitespace-nowrap text-2xl group-hover:text-pinky">&#x2190; </p><span className=' text-white whitespace-nowrap font-medium text-[15px] mt-0.5 group-hover:text-pinky'>Retour à la page d&apos;acceuil</span>
                </div>
            </Link>
            </> : null}
        </aside>
    )
}