import Image from "next/image"

export default function AdminProducts(props){


    function handleDelete(){
        
    }

    return (
        <div className="w-60 h-[300px] grid content-center border-[1px] mx-auto sm:mx-3 mt-10 border-gray-700 shadow-2xl rounded-lg overflow-hidden">
                <Image src={props.image} alt='product image' height={220} width={240} layout='fixed'  objectFit="contain" objectPosition="center" />
                <div className="flex flex-nowrap h-fit w-fit mx-auto">
                    <p className="font-semibold">{props.name}</p><i>&nbsp;-&nbsp;Ref:&nbsp;</i> <p className="font-thin text-zinc-500">{props.reference}</p>
                </div>
                <div className="h-fit w-fit mx-auto mt-1">
                    <button className="h-fit w-fit p-1 border-[1px] border-black rounded-lg font-normal text-sm hover:scale-105" onClick={e => props.handleClick(props.reference)}>Modifier</button> <button className="h-fit w-fit p-1 border-[1px] hover:scale-105 border-red-500 text-red-500 rounded-lg font-normal text-sm">Supprimer</button>
                </div>
        </div>
    )
}