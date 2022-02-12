import Image from "next/image"
import { useEffect, useState, useContext } from "react"
import { LoadingContext } from "../utils/LoadingContext"


export default function ArchivedOrders(props){

    const archivedselected = 'pfe/archivedselected_bodb8b.png'
    const archived = 'pfe/archived_ljkyaa.png'

    const [classes,setClasses] = useState("mt-9 w-full px-1 bg-transparent py-2 flex flex-nowrap items-center space-x-1 hover:cursor-pointer hover:bg-gray-600 rounded-lg")
    const [textClasses, setTextClasses] = useState("text-medium font-sm text-white whitespace-nowrap")
    const {loadingContext,setLoadingContext} = useContext(LoadingContext)


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
        <div className={classes} onClick={() => {if(!loadingContext) props.handleClick(4)}} >
            {props.selected == 4 ? <Image src={archivedselected} alt="plus" width={17} height={17} layout="fixed" /> : <Image src={archived} alt="plus" width={17} height={17} layout="fixed" />}
            <p className={textClasses}>Commandes archivées</p>
        </div>
    )
}