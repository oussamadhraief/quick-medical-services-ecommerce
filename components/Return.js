import Image from "next/image"
import returnIcon from '../assets/return.png'
import { useContext } from "react"
import { LoadingContext } from "../utils/LoadingContext"

export default function ArchivedProducts(){

    const {loadingContext,setLoadingContext} = useContext(LoadingContext)

    return (
        <div className="mt-9 w-fit pr-1 pl-0.5 flex flex-nowrap items-center space-x-1 hover:cursor-pointer group absolute bottom-3" onClick={() => {if(!loadingContext) window.location="/"}}>
            <Image src={returnIcon} alt="plus" width={20} height={22} layout="fixed" />
            <p className="text-medium font-sm text-white whitespace-nowrap group-hover:border-b-[1px] border-white">Retour à la page client</p>
        </div>
    )
}