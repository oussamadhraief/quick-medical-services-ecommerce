import Image from "next/image"
import SizeSelection from './SizeSelection'
import { SizeSelectionContext } from "../utils/SizeSelectionContext"
import { useState } from "react"

export default function ProductPreview(props){

    const [selectedSize,setSelectedSize] = useState(0)

    return(
        <div className="w-11/12 xl:w-6/12 max-w-[800px] h-fit flex flex-wrap md:flex-nowrap justify-start sm:justify-evenly shadow-2xl mb-5 px-3 py-10 rounded-lg animate__animated animate__slideInRight">
        <div className="border-[1px] border-na3ne3i w-60 mx-auto md:mx-0 flex justify-center h-fit">
            <Image src={props.productImage} alt="product image" height={220} width={240} layout='fixed'  objectFit="contain"  />
        </div>
            <div className="w-4/6 h-fit pl-1 grid">
            <p className="font-medium text-zinc-600 text-md">Nom:&nbsp;</p>
                <p className="font-bold text-2xl text-na3ne3i">{props.name}</p>
                <p className="font-medium text-zinc-600 text-md">Référence:&nbsp;</p>
                <p className="font-bold text-xl text-na3ne3i">17.0.1.{props.sizes[selectedSize]} <span className="text-xs text-zinc-400 font-normal">(exemple)</span></p>
                <p className="font-medium text-zinc-600 text-md">Tailles:&nbsp;</p>
                <SizeSelectionContext.Provider value={{ selectedSize,setSelectedSize}} >
                    <SizeSelection sizes={props.sizes} />
                </SizeSelectionContext.Provider>
                <p className="font-medium text-zinc-600 text-md">Description:&nbsp;</p>
                <p>{props.description}</p>
                <p className="font-medium text-zinc-600 mt-2 text-md">Disponibilité:&nbsp;</p>
                {props.availability == 'available' ? <p className="font-bold text-md text-green-600">Disponible</p> : <p className="font-bold text-md text-red-500">Sur commande</p>}
                <input type="number" name="quantity" value="1" min={1} className='border-2 border-main rounded-lg mx-auto h-fit w-20 text-center mt-5' />
                <button className="mt-5 bg-na3ne3i w-fit h-fit px-3 py-3 rounded-lg mx-auto text-white text-sm md: xl:text-lg font-medium hover:bg-orange"> Ajouter au panier</button>
            </div>
        </div>
    )
}