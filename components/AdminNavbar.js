import arrow from '../assets/arrow.png'
import Image from 'next/image'
import { useState } from 'react'
import AddProduct from './AddProduct'
import ModifyProducts from './ModifyProducts'
import ViewOrders from './ViewOrders'
import ArchivedOrders from './ArchivedOrders'
import ArchivedProducts from './ArchivedProducts'
import Return from './Return'

export default function AdminNavbar(props){

    const [menu,setMenu] = useState(true)
    const [classes,setClasses] = useState("bg-zinc-700 h-full relative duration-150 space-y-4 px-1 w-56 pt-1")

    const handleClick = (event) => {
        setMenu(!menu)
        if(menu){
            event.target.style.transform = 'rotateY(180deg)'
            setClasses("bg-zinc-700 h-full relative duration-150 space-y-4 px-1 w-10 pt-1")
        }
        else{
            event.target.style.transform = 'rotateY(0deg)'
            setClasses("bg-zinc-700 h-full relative duration-150 space-y-4 px-1 w-56 pt-1")
        }
    }

    return (
        <nav className={classes}>
            <div className='float-right p-2 w-fit h-fit'>
                <Image src={arrow} alt="arrow" width={20} height={20} layout='fixed' className='hover:cursor-pointer transition'  onClick={e => handleClick(e)} />
            </div>
            {menu ? <AddProduct selected={props.selected} handleClick={props.handleClick} /> : null}
            {menu ? <ModifyProducts selected={props.selected} handleClick={props.handleClick} /> : null}
            {menu ? <ArchivedProducts selected={props.selected} handleClick={props.handleClick} /> : null}
            <br></br>
            {menu ? <ViewOrders selected={props.selected} handleClick={props.handleClick} /> : null}
            {menu ? <ArchivedOrders selected={props.selected} handleClick={props.handleClick} /> : null}
            {menu ? <Return /> : null}
        </nav>
    )
}