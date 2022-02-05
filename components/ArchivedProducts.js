import Image from "next/image"
import { useEffect, useState } from "react"
import deleted from '../assets/delete.png'
import deletedselected from '../assets/deleteselected.png'


export default function ArchivedProducts(props){

    const [classes,setClasses] = useState("mt-9 w-full px-1 bg-transparent py-2 flex flex-nowrap items-center space-x-1 hover:cursor-pointer hover:bg-zinc-600 rounded-lg")
    const [textClasses, setTextClasses] = useState("text-medium font-sm text-white whitespace-nowrap")

    useEffect(() => {
        if(props.selected == 3){
            setClasses("mt-9 w-full bg-white px-1 py-2 flex flex-nowrap items-center space-x-1 hover:cursor-pointer rounded-lg")
            setTextClasses("text-medium font-medium text-zinc-700 whitespace-nowrap")
        } else {
            setClasses("mt-9 w-full bg-transparent px-1 py-2 flex flex-nowrap items-center space-x-1 hover:cursor-pointer hover:bg-zinc-600 rounded-lg")
            setTextClasses("text-medium font-sm text-white whitespace-nowrap")
        }
    })

    return (
        <div className={classes} onClick={() => props.handleClick(3)} >
            {props.selected == 3 ? <Image src={deletedselected} alt="plus" width={17} height={17} layout="fixed" /> : <Image src={deleted} alt="plus" width={17} height={17} layout="fixed" />}
            <p className={textClasses}>Produits supprimés</p>
        </div>
    )
}