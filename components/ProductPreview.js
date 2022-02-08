import Image from "next/image"

export default function ProductPreview(props){
    return(
        <div className="w-3/6 h-fit flex flex-wrap sm:flex-nowrap justify-evenly shadow-2xl px-3 py-10 rounded-lg">
        <div className="border-[1px] border-gray-700 w-60 flex justify-center h-fit">
            <Image src={props.productImage} alt="product image" height={220} width={240} layout='fixed'  objectFit="contain"  />
        </div>
            <div className="w-4/6 h-fit pl-1 grid">
                <p className="font-bold text-2xl text-gray-700">{props.name}</p>
                <p className="font-medium text-zinc-600 text-md">Tailles:&nbsp;</p>
                <div className="flex flex-wrap">
                {props.sizes.map(item => <p className="border-[1px] border-gray-700 ml-2 mb-2 h-fit w-fit py-2 px-1 font-medium text-sm">{item >= 0 ? item : 0} mm</p>)}
                </div>
                <p className="font-medium text-zinc-600 text-md">Description:&nbsp;</p>
                <p>{props.description}</p>
                <p className="font-medium text-zinc-600 mt-2 text-md">Disponibilité:&nbsp;</p>
                {props.availability == 'available' ? <p className="font-bold text-md text-green-600">Disponible</p> : <p className="font-bold text-md text-red-500">Sur commande</p>}
                <input type="number" name="quantity" value="1" min={1} className='border-2 border-gray-700 rounded-lg mx-auto h-fit w-20 text-center mt-5' />
                <button className="mt-5 bg-gray-700 w-fit h-fit px-3 py-3 rounded-lg mx-auto text-white font-medium"> Ajouter au panier</button>
            </div>
        </div>
    )
}