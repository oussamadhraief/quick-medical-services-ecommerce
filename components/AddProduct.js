import Image from "next/image"
import { useEffect, useState, useContext } from "react"
import { LoadingContext } from "../utils/LoadingContext"

export default function AddProduct(props){

    const [classes,setClasses] = useState("mt-9 w-full px-1 bg-transparent py-2 flex flex-nowrap justify-center md:justify-start items-center space-x-1 hover:cursor-pointer hover:bg-orange rounded-lg")
    const [textClasses, setTextClasses] = useState("font-medium text-white whitespace-nowrap")
    const {loadingContext,setLoadingContext} = useContext(LoadingContext)

    useEffect(() => {
        if(props.selected == 1){
            setClasses("mt-9 w-full bg-white px-1 py-2 flex flex-nowrap justify-center md:justify-start items-center space-x-1 hover:cursor-pointer rounded-lg")
            setTextClasses("font-medium text-na3ne3i whitespace-nowrap")
        } else {
            setClasses("mt-9 w-full bg-transparent px-1 py-2 flex flex-nowrap justify-center md:justify-start items-center space-x-1 hover:cursor-pointer hover:bg-orange rounded-lg")
            setTextClasses("font-medium text-white whitespace-nowrap")
        }
    },[props.selected])

    const add = 'pfe/add_ufxdwy.png'
    const addselected = 'pfe/plusselected_xpokri_lz0tlc.png'

    return (
        <div className={props.show ? classes : 'hidden'} onClick={() => {if(!loadingContext) props.handleClick(1)}} >
            {props.selected == 1 ? <Image src={addselected} alt="plus" width={15} height={15} layout="fixed" id='addIcon' /> : <Image src={add} alt="plus" width={15} height={15} layout="fixed" id='addIcon' />}
            <p className={textClasses}>Ajouter des produits</p>
        </div>
    )
}