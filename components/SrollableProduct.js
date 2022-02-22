import Image from "next/image"
import SizeSelection from './SizeSelection'
import { useState } from "react"
import ContentfulModal from './ContentfulModal'

export default function SrollableProduct({product}){

    const eye = 'pfe/view_ng7ypc.png'
    
    const [show,setShow] = useState(false)

    return (
        <div className="w-80 min-w-min p-3 md:p-0 md:min-w-[320px] h-96 border-[1px] border-zinc-300 rounded-lg grid place-items-center mb-5 overflow-hidden">
            <div className="mx-auto w-[95%] h-fit flex justify-center items-center relative group hover:cursor-pointer">
            <div className="absolute top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.3)] z-10 hidden group-hover:flex group-hover:justify-center group-hover:items-center">
                <div className="bg-white h-fit w-fit rounded-full shadow-3xl px-2 flex justify-center items-center">
                    <Image src={eye} alt='view product' width={30} height={30} layout='fixed' onClick={() => setShow(true)} />
                </div>
            </div>
                <Image src={product.image} alt="product image" height={220} width={220} layout='fixed'  objectFit="contain" objectPosition="center" />
            </div>
            
            <div className="h-fit w-fit max-w-full overflow-hidden mx-auto px-1">
                <p className="font-medium text-xl whitespace-nowrap text-ellipsis overflow-clip">{product.name}</p>
            </div>
                <div className="w-full h-10 overflow-clip flex justify-center">
                <SizeSelection sizes={product.sizes} />
                </div>
                    
                <button className="bg-ciel rounded-lg text-white text-base font-medium px-3 py-2 my-1 h-fit w-fit whitespace-nowrap">Ajouter au panier</button>
                <ContentfulModal show={show} content={product} onClose={() => setShow(false)} />
        </div>
    )
}