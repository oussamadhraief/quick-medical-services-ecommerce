import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import AdminSearchField from './AdminSearchField'
import { useRouter } from "next/router"

export default function AdminNavbar(props){
    const router = useRouter()

    const menuIcon = 'pfe/menu_jfmx7a.png'
    const returnIcon = 'pfe/return_cpjn4d.png'
    const closeMenu = 'pfe/closeMenu_bpepwc.png' 
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
    
    const [menu,setMenu] = useState(true)
    const [open,setOpen] = useState(false)

    useEffect(() => {
        const mql = window.matchMedia('(max-width: 767px)')
        if(mql.matches){ 
            setMenu(false)
            setOpen(true)

        }
    },[])

    useEffect(() => {
        window.addEventListener('resize',() => {
            let mql = window.matchMedia('(max-width: 767px)')
            if(mql.matches){ 
                setMenu(false)
            }
        })
        return () => {
            window.removeEventListener('resize',() => {
            let mql = window.matchMedia('(max-width: 767px)')
            if(mql.matches){ 
                setMenu(false)
            }
        })
        }
    })

    const handleClick = () => {
        setMenu(prevMenu => !prevMenu)
        if(menu){
            setOpen(true)
        }
        else{
            setOpen(false)
        }
    }

    return (
        <nav id='nav' className={open ? "bg-na3ne3i h-12 md:h-full absolute md:relative duration-150 space-y-4 pl-1 z-40 w-full md:w-10 pt-2 pr-2 md:pr-1 md:pt-5" : "bg-na3ne3i h-screen md:h-full absolute md:relative duration-150 space-y-4 pl-1 z-40 w-full pr-2 md:pr-1 md:w-72 pt-5"}>
            <div className='py-2 px-1 w-7 h-9 top-1 right-1 absolute'>
                <Image src={open ? menuIcon : closeMenu} id='navbutton' alt="arrow" width={20} height={20} layout='fixed' className='hover:cursor-pointer transition'  onClick={e => handleClick(e)} />
            </div>
            {menu ? 
            <>
            <AdminSearchField selected={props.selected} />
            <Link href='/admin/products/add'>
            <div className={props.selected == 1 ? "mt-9 w-full bg-white px-1 py-2 flex flex-nowrap justify-center md:justify-start items-center space-x-1 hover:cursor-pointer rounded-lg" : "mt-9 w-full bg-transparent px-1 py-2 flex flex-nowrap justify-center md:justify-start items-center space-x-1 hover:cursor-pointer hover:bg-pinky rounded-lg"}>
            {props.selected == 1 ? <Image src={addselected} alt="plus" width={15} height={15} layout="fixed" id='addIcon' /> : <Image src={add} alt="plus" width={15} height={15} layout="fixed" id='addIcon' />}
            <a className={props.selected == 1 ? "font-medium text-na3ne3i whitespace-nowrap" : "font-medium text-white whitespace-nowrap"}>Ajouter des produits</a>
            </div>
            </Link>
            
            

            <Link href='/admin/products/modify?page=0'>
            <div id="modifyProducts" className={props.selected == 2 ? "mt-9 w-full bg-white px-1 py-2 flex flex-nowrap justify-center md:justify-start items-center space-x-1 hover:cursor-pointer rounded-lg" : "mt-9 w-full bg-transparent px-1 py-2 flex flex-nowrap justify-center md:justify-start items-center space-x-1 hover:cursor-pointer hover:bg-pinky rounded-lg"}>
            {props.selected == 2 ? <Image src={Modifyselected} alt="plus" width={15} height={17} layout="fixed" /> : <Image src={Modify} alt="plus" width={15} height={17} layout="fixed" />}
            <p className={props.selected == 2 ? "font-medium text-na3ne3i whitespace-nowrap" : "font-medium text-white whitespace-nowrap"}>Modifier les produits</p>
        </div>
            </Link>

            <Link href='/admin/products/archived?page=0'>
            <div id="archivedProducts" className={props.selected == 3 ? "mt-9 w-full bg-white px-1 py-2 flex flex-nowrap justify-center md:justify-start items-center space-x-1 hover:cursor-pointer rounded-lg" : "mt-9 w-full bg-transparent px-1 py-2 flex flex-nowrap justify-center md:justify-start items-center space-x-1 hover:cursor-pointer hover:bg-pinky rounded-lg"}>
            {props.selected == 3 ? <Image src={deletedselected} alt="plus" width={15} height={17} layout="fixed" /> : <Image src={deleted} alt="plus" width={15} height={17} layout="fixed" />}
            <p className={props.selected == 3 ? "font-medium text-na3ne3i whitespace-nowrap" : "font-medium text-white whitespace-nowrap"}>Produits archivés</p>
        </div>
            </Link>




            <br></br>

            <Link href='/admin/orders/manage'>
            <div
            className={props.selected === 4 ? 'mt-9 w-full bg-white px-1 py-2 flex flex-nowrap items-center justify-center md:justify-start space-x-1 hover:cursor-pointer rounded-lg' : 'mt-9 w-full bg-transparent px-1 py-2 flex flex-nowrap items-center justify-center md:justify-start space-x-1 hover:cursor-pointer hover:bg-pinky rounded-lg'}
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
            <p className={props.selected === 4 ? ' font-medium text-na3ne3i whitespace-nowrap' : ' font-medium text-white whitespace-nowrap'}>Voir les commandes</p>
            </div>
            </Link>

            <Link href='/admin/orders/archived'>
                <div className={props.selected == 5 ? "mt-9 w-full bg-white px-1 py-2 flex flex-nowrap items-center justify-center md:justify-start space-x-1 hover:cursor-pointer rounded-lg" : "mt-9 w-full bg-transparent px-1 py-2 flex flex-nowrap items-center justify-center md:justify-start space-x-1 hover:cursor-pointer hover:bg-pinky rounded-lg"}>
                {props.selected == 5 ? <Image src={archivedselected} alt="plus" width={17} height={17} layout="fixed" /> : <Image src={archived} alt="plus" width={17} height={17} layout="fixed" />}
                <p className={props.selected === 5 ? ' font-medium text-na3ne3i whitespace-nowrap' : ' font-medium text-white whitespace-nowrap'}>Commandes archivées</p>
                </div>
            </Link>

            <Link href='/'>
                <div className="mt-9 w-fit pr-1 pl-0.5 flex flex-nowrap items-center hover:cursor-pointer group absolute bottom-3 group">
                    <p className=" font-sm text-white whitespace-nowrap text-2xl group-hover:text-orange">&#x2190; </p><span className=' text-white whitespace-nowrap font-medium mt-0.5 group-hover:text-orange'>Retour à la page d&apos;acceuil</span>
                </div>
            </Link>
            </> : null}
        </nav>
    )
}