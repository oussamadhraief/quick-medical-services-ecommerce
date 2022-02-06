import Image from "next/image"
import archived from '../assets/archived.png'
import { useEffect, useState } from "react"
import archivedselected from '../assets/archivedselected.png'

export default function ArchivedOrders(props){

    const [classes,setClasses] = useState("mt-9 w-full px-1 bg-transparent py-2 flex flex-nowrap items-center space-x-1 hover:cursor-pointer hover:bg-gray-600 rounded-lg")
    const [textClasses, setTextClasses] = useState("text-medium font-sm text-white whitespace-nowrap")

    useEffect(() => {
        if(props.selected == 4){
            setClasses("mt-9 w-full bg-white px-1 py-2 flex flex-nowrap items-center space-x-1 hover:cursor-pointer rounded-lg")
            setTextClasses("text-medium font-medium text-gray-700 whitespace-nowrap")
        } else {
            setClasses("mt-9 w-full bg-transparent px-1 py-2 flex flex-nowrap items-center space-x-1 hover:cursor-pointer hover:bg-gray-600 rounded-lg")
            setTextClasses("text-medium font-sm text-white whitespace-nowrap")
        }
    })

    return (
        <div className={classes} onClick={() => props.handleClick(4)} >
            {props.selected == 4 ? <Image src={archivedselected} alt="plus" width={17} height={17} layout="fixed" /> : <Image src={archived} alt="plus" width={17} height={17} layout="fixed" />}
            <p className={textClasses}>Commandes archivées</p>
        </div>
    )
}