import Image from "next/image"
import { useEffect, useState } from "react"
import Modify from '../assets/modify.png'
import Modifyselected from '../assets/modifyselected.png'

export default function ModifyProducts(props){

    const [classes,setClasses] = useState("mt-9 w-full px-1 bg-transparent py-2 flex flex-nowrap items-center space-x-1 hover:cursor-pointer hover:bg-gray-600 rounded-lg")
    const [textClasses, setTextClasses] = useState("text-medium font-sm text-white whitespace-nowrap")

    useEffect(() => {
        if(props.selected == 2){
            setClasses("mt-9 w-full bg-white px-1 py-2 flex flex-nowrap items-center space-x-1 hover:cursor-pointer rounded-lg")
            setTextClasses("text-medium font-medium text-gray-700 whitespace-nowrap")
        } else {
            setClasses("mt-9 w-full bg-transparent px-1 py-2 flex flex-nowrap items-center space-x-1 hover:cursor-pointer hover:bg-gray-600 rounded-lg")
            setTextClasses("text-medium font-sm text-white whitespace-nowrap")
        }
    })

    return (
        <div id="modifyProducts" className={classes} onClick={() => props.handleClick(2)} >
            {props.selected == 2 ? <Image src={Modifyselected} alt="plus" width={15} height={17} layout="fixed" /> : <Image src={Modify} alt="plus" width={15} height={17} layout="fixed" />}
            <p className={textClasses}>Modifier les produits</p>
        </div>
    )
}