import Image from 'next/image'
import { useEffect, useState } from 'react'
import AddProduct from './AddProduct'
import ModifyProducts from './ModifyProducts'
import ViewOrders from './ViewOrders'
import ArchivedOrders from './ArchivedOrders'
import Return from './Return'
import AdminSearchField from './AdminSearchField'

export default function AdminNavbar(props){

    const arrow = 'pfe/arrow_vbhjlp.png'
    const menuIcon = 'pfe/menu_jfmx7a.png'
    const closeMenu = 'pfe/closeMenu_bpepwc.png'

    const [navIcon,setNavIcon] = useState(false)
    const [menu,setMenu] = useState(true)
    const [classes,setClasses] = useState("bg-main h-12 md:h-full absolute md:relative duration-150 space-y-4 pl-1 z-40 w-full md:w-72 pt-2 pr-2 md:pr-1 md:pt-1")
    const [matches,setMatches] = useState(true)
    const [open,setOpen] = useState(true)

    useEffect(() => {
        const mql = window.matchMedia('(max-width: 767px)');
        setMatches(mql.matches)
        if(mql.matches){ 
            setNavIcon(true)
            setMenu(false)
        }else{
            setNavIcon(false)
        }
    },[])
    //
    //
    //
    //  MAKE DISPLAY NONE ON MENU CHANGE !!!!! also flex gap
    //
    //
    //

    const handleClick = (event) => {
        setMenu(!menu)
        if(menu){
            if(matches){
                setOpen(true)
            }else{event.target.style.transform = 'rotateY(180deg)'}
            setClasses("bg-main h-12 md:h-full absolute md:relative duration-150 space-y-4 pl-1 z-40 w-full md:w-10 pt-2 pr-2 md:pr-1 md:pt-1")
        }
        else{
            if(matches){
                setOpen(false)
            }else{event.target.style.transform = 'rotateY(0deg)'}
            setClasses("bg-main h-screen md:h-full absolute md:relative duration-150 space-y-4 pl-1 z-40 w-full pr-2 md:pr-1 md:w-72 pt-1")
        }
    }

    return (
        <nav id='nav' className={classes}>
            <div className='float-right p-2 w-fit h-fit'>
                <Image src={navIcon ? open ? menuIcon : closeMenu : arrow} id='navbutton' alt="arrow" width={20} height={20} layout='fixed' className='hover:cursor-pointer transition'  onClick={e => handleClick(e)} />
            </div>
            <AdminSearchField show={menu} />
            <AddProduct selected={props.selected} handleClick={props.handleClick} show={menu} />
            <ModifyProducts selected={props.selected} handleClick={props.handleClick} show={menu} />
            <br></br>
            <ViewOrders selected={props.selected} handleClick={props.handleClick} show={menu} />
            <ArchivedOrders selected={props.selected} handleClick={props.handleClick} show={menu} />
            <Return show={menu} />
        </nav>
    )
}