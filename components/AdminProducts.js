import Image from "next/image"
import product from '../assets/product.jpg'

export default function AdminProducts(){
    return (
        <div className="w-60 h-[300px] grid justify-center border-[1px] mx-auto lg:mx-0 border-gray-700 shadow-xl rounded-lg">
                <Image src={product} alt='product image' height={220} layout='fixed'  objectFit="contain" />
                <div className="flex flex-nowrap h-fit w-fit mx-auto">
                    <p className="font-semibold">Wartenberg</p><i>&nbsp;-&nbsp;Ref:&nbsp;</i> <p className="font-thin text-zinc-500">1.1.3.4</p>
                </div>
                <div className="h-fit w-fit mx-auto mt-1">
                    <button className="h-fit w-fit p-1 border-[1px] border-black rounded-lg font-normal text-sm hover:scale-105">Modifier</button> <button className="h-fit w-fit p-1 border-[1px] hover:scale-105 border-red-500 text-red-500 rounded-lg font-normal text-sm">Supprimer</button>
                </div>
        </div>
    )
}