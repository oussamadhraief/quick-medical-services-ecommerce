import Image from "next/image"
import { useEffect, useState, useContext } from "react"
import { LoadingContext } from "../utils/LoadingContext"


export default function ArchivedOrders(props){

    const archivedselected = 'pfe/archivedselected_bodb8b_pbgvvx.png'
    const archived = 'pfe/archived_ljkyaa.png'

    const [classes,setClasses] = useState("mt-9 w-full px-1 bg-transparent py-2 flex flex-nowrap items-center justify-center md:justify-start space-x-1 hover:cursor-pointer hover:bg-orange rounded-lg")
    const [textClasses, setTextClasses] = useState(" font-medium text-white whitespace-nowrap")
    const {loadingContext,setLoadingContext} = useContext(LoadingContext)


    useEffect(() => {
        if(props.selected == 4){
            setClasses("mt-9 w-full bg-white px-1 py-2 flex flex-nowrap items-center justify-center md:justify-start space-x-1 hover:cursor-pointer rounded-lg")
            setTextClasses(" font-medium text-na3ne3i whitespace-nowrap")
        } else {
            setClasses("mt-9 w-full bg-transparent px-1 py-2 flex flex-nowrap items-center justify-center md:justify-start space-x-1 hover:cursor-pointer hover:bg-orange rounded-lg")
            setTextClasses(" font-medium text-white whitespace-nowrap")
        }
    })

    return (
        <div className={props.show ? classes : 'hidden'} onClick={() => {if(!loadingContext) props.handleClick(4)}} >
            {props.selected == 4 ? <Image src={archivedselected} alt="plus" width={17} height={17} layout="fixed" /> : <Image src={archived} alt="plus" width={17} height={17} layout="fixed" />}
            <p className={textClasses}>Commandes archivées</p>
        </div>
    )
}