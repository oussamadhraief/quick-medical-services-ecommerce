import Image from "next/image"
import { useEffect, useState } from "react"
import add from '../assets/add.png'
import addselected from '../assets/plusselected.png'
//test
export default function AddProduct(props){

    const [classes,setClasses] = useState("mt-9 w-full px-1 bg-transparent py-2 flex flex-nowrap items-center space-x-1 hover:cursor-pointer hover:bg-gray-600 rounded-lg")
    const [textClasses, setTextClasses] = useState("text-medium font-sm text-white whitespace-nowrap")

    useEffect(() => {
        if(props.selected == 1){
            setClasses("mt-9 w-full bg-white px-1 py-2 flex flex-nowrap items-center space-x-1 hover:cursor-pointer rounded-lg")
            setTextClasses("text-medium font-medium text-gray-700 whitespace-nowrap")
        } else {
            setClasses("mt-9 w-full bg-transparent px-1 py-2 flex flex-nowrap items-center space-x-1 hover:cursor-pointer hover:bg-gray-600 rounded-lg")
            setTextClasses("text-medium font-sm text-white whitespace-nowrap")
        }
    })

    return (
        <div className={classes} onClick={() => props.handleClick(1)} >
            {props.selected == 1 ? <Image src={addselected} alt="plus" width={15} height={15} layout="fixed" id='addIcon' /> : <Image src={add} alt="plus" width={15} height={15} layout="fixed" id='addIcon' />}
            <p className={textClasses}>Ajouter des produits</p>
        </div>
    )
}