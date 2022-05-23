import Image from "next/image"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { CartContext } from "../utils/CartContext"


export default function CartProduct(props){

    const [productQuantity,setProductQuantity] = useState(1)
    const [productSize,setProductSize] = useState(0)
    const {cartNumber,setCartNumber} = useContext(CartContext)

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

    const removeProduct = async (id) => {
        const res = await fetch('/api/user/removecartproduct',{
            method: 'PATCH',
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({reference: id})
        })
        const { cart } = await res.json()
        setCartNumber(cart)
    }

    return (
        <tr className='border-b'>
            <td className='text-center'>{props.reference}</td>
            <td className='text-center flex flex-nowrap justify-center items-center w-40 h-44 relative'><Image src={props.image} alt='product image' width={150} height={170}  objectFit="contain" objectPosition="center" /> </td>
            <td className='text-center'>{props.name}</td>
            <td>
                <div className='text-center  flex flex-wrap items-center justify-center'>
                    
                {props.sizes.map((item,index) => {
                    if(productSize != index){ return <p className="border-[1px] border-na3ne3i ml-2 mb-2 h-fit w-fit py-2 px-1 font-medium text-sm hover:cursor-pointer" onClick={e => 
                        {setProductSize(index)
                            const temp = props.value
                            temp[props.index].size = props.sizes[index]
                            props.setValue(temp)
                        }}>{item >= 0 ? item : 0} cm</p>}
                else{
                    return <p className="border-[1px] border-na3ne3i bg-na3ne3i text-white ml-2 mb-2 h-fit w-fit py-2 px-1 font-medium text-sm hover:cursor-pointer">{item >= 0 ? item : 0} cm</p>
                }})}
                </div>
           </td>
            <td className='text-center'><input type="number" name="produit" value={productQuantity} min={1} onChange={e => handleChange(e)} className='w-20 text-center border border-zinc-400 rounded-lg'/></td>
            <td><Image src={'pfe/trash-icon-f9bf87-512_evf5ow'} alt='delete' height={25} width={25} className='hover:cursor-pointer' onClick={e => removeProduct(props.reference)} /></td>
        </tr>
    )
}