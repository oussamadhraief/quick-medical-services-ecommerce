import Image from "next/image"
import SizeSelection from './SizeSelection'

export default function ProductPreview(props){
    return(
        <div className="w-11/12 xl:w-6/12 h-fit flex flex-wrap md:flex-nowrap justify-start sm:justify-evenly shadow-2xl mb-5 px-3 py-10 rounded-lg animate__animated animate__slideInRight">
        <div className="border-[1px] border-main w-60 mx-auto md:mx-0 flex justify-center h-fit">
            <Image src={props.productImage} alt="product image" height={220} width={240} layout='fixed'  objectFit="contain"  />
        </div>
            <div className="w-4/6 h-fit pl-1 grid">
                <p className="font-bold text-2xl text-main">{props.name}</p>
                <p className="font-medium text-zinc-600 text-md">Tailles:&nbsp;</p>
                <SizeSelection sizes={props.sizes} />
                <p className="font-medium text-zinc-600 text-md">Description:&nbsp;</p>
                <p>{props.description}</p>
                <p className="font-medium text-zinc-600 mt-2 text-md">Disponibilité:&nbsp;</p>
                {props.availability == 'available' ? <p className="font-bold text-md text-green-600">Disponible</p> : <p className="font-bold text-md text-red-500">Sur commande</p>}
                <input type="number" name="quantity" value="1" min={1} className='border-2 border-main rounded-lg mx-auto h-fit w-20 text-center mt-5' />
                <button className="mt-5 bg-main w-fit h-fit px-3 py-3 rounded-lg mx-auto text-white text-sm md:text-medium xl:text-lg font-medium"> Ajouter au panier</button>
            </div>
        </div>
    )
}