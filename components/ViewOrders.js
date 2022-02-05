import Image from "next/image"
import orders from '../assets/orders.png'
import { useEffect, useState } from "react"
import ordersselected from '../assets/ordersselected.png'

export default function ViewOrders(props){

    const [classes,setClasses] = useState("mt-9 w-full px-1 bg-transparent py-2 flex flex-nowrap items-center space-x-1 hover:cursor-pointer hover:bg-zinc-600 rounded-lg")
    const [textClasses, setTextClasses] = useState("text-medium font-sm text-white whitespace-nowrap")

    useEffect(() => {
        if(props.selected == 4){
            setClasses("mt-9 w-full bg-white px-1 py-2 flex flex-nowrap items-center space-x-1 hover:cursor-pointer rounded-lg")
            setTextClasses("text-medium font-medium text-zinc-700 whitespace-nowrap")
        } else {
            setClasses("mt-9 w-full bg-transparent px-1 py-2 flex flex-nowrap items-center space-x-1 hover:cursor-pointer hover:bg-zinc-600 rounded-lg")
            setTextClasses("text-medium font-sm text-white whitespace-nowrap")
        }
    })

    return (
        <div className={classes} onClick={() => props.handleClick(4)} >
            {props.selected == 4 ? <Image src={ordersselected} alt="plus" width={15} height={15} layout="fixed" /> : <Image src={orders} alt="plus" width={15} height={15} layout="fixed" />}
            <p className={textClasses}>Voir les commandes</p>
        </div>
    )
}