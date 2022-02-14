import Image from "next/image"
import { useEffect, useState, useContext } from "react"
import { LoadingContext } from "../utils/LoadingContext"


export default function ViewOrders(props){

    const orders = 'pfe/orders_kkbnuv.png'
    const ordersselected = 'pfe/ordersselected_m3jukr.png'

    const [classes,setClasses] = useState("mt-9 w-full px-1 bg-transparent py-2 flex flex-nowrap justify-center md:justify-start items-center space-x-1 hover:cursor-pointer hover:bg-gray-600 rounded-lg")
    const [textClasses, setTextClasses] = useState("text-medium font-sm text-white whitespace-nowrap")
    const {loadingContext,setLoadingContext} = useContext(LoadingContext)

    useEffect(() => {
        if(props.selected == 3){
            setClasses("mt-9 w-full bg-white px-1 py-2 flex flex-nowrap items-center justify-center md:justify-start space-x-1 hover:cursor-pointer rounded-lg")
            setTextClasses("text-medium font-medium text-gray-700 whitespace-nowrap")
        } else {
            setClasses("mt-9 w-full bg-transparent px-1 py-2 flex flex-nowrap items-center justify-center md:justify-start space-x-1 hover:cursor-pointer hover:bg-gray-600 rounded-lg")
            setTextClasses("text-medium font-sm text-white whitespace-nowrap")
        }
    })

    return (
        <div className={classes} onClick={() => {if(!loadingContext) props.handleClick(3)}} >
            {props.selected == 3 ? <Image src={ordersselected} alt="plus" width={15} height={15} layout="fixed" /> : <Image src={orders} alt="plus" width={15} height={15} layout="fixed" />}
            <p className={textClasses}>Voir les commandes</p>
        </div>
    )
}