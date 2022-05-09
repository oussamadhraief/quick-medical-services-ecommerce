import Image from "next/image"
import { useEffect, useState } from "react"

export default function CartProduct(props){

    const [productQuantity,setProductQuantity] = useState(1)
    const [productSize,setProductSize] = useState(0)

    useEffect(() => {
        if(props.value.length > 0)
        setProductQuantity(props.value[props.index].quantity)
    },[])

    const handleChange = (e) => {
        if(e.target.value > 1){
            setProductQuantity(parseInt(e.target.value))
            const temp = props.value
            temp[props.index].quantity = parseInt(e.target.value)
            props.setValue(temp)
        }else{
            setProductQuantity(1)
            const temp = props.value
            temp[props.index].quantity = 1
            props.setValue(temp)
        }
        
    }

    return (
        <tr className='border-b'>
            <td className='text-center'>{props.reference}</td>
            <td className='text-center flex flex-nowrap justify-center items-center w-40 h-44 relative'><Image src={props.image} alt='product image' width={150} height={170}  objectFit="contain" objectPosition="center" /> </td>
            <td className='text-center'>{props.name}</td>
            <td className='text-center text-sm font-medium text-zinc-500' colSpan={2}>Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.</td>
            <td className='text-center  flex flex-wrap'>
                {props.sizes.map((item,index) => {
                    if(productSize != index){ return <p className="border-[1px] border-ciel ml-2 mb-2 h-fit w-fit py-2 px-1 font-medium text-sm hover:cursor-pointer" onClick={e => 
                        {setProductSize(index)
                            const temp = props.value
                            temp[props.index].size = props.sizes[index]
                            props.setValue(temp)
                        }}>{item >= 0 ? item : 0} cm</p>}
                else{
                    return <p className="border-[1px] border-ciel bg-ciel text-white ml-2 mb-2 h-fit w-fit py-2 px-1 font-medium text-sm hover:cursor-pointer">{item >= 0 ? item : 0} cm</p>
                }
            })}</td>
            <td className='text-center'><input type="number" name="produit" value={productQuantity} min={1} onChange={e => handleChange(e)} className='w-20 text-center border border-zinc-400 rounded-lg'/></td>
            <td><p className='text-center text-zinc-600 hover:bg-third hover:text-white hover:cursor-pointer font-medium hover:scale-110 bg-zinc-200 rounded-full w-fit h-fit mx-auto px-2'>X</p></td>
        </tr>
    )
}