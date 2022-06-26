import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useContext } from "react"
import { CartContext } from "../utils/CartContext"
import Modal from "./Modal"


export default function CartProduct(props){

    const [productQuantity,setProductQuantity] = useState(1)
    const [show,setShow] = useState(false)
    const [productSize,setProductSize] = useState(0)
    const {cartNumber,setCartNumber} = useContext(CartContext)

    const handleChange = (e) => {
      
        if(e.target.value > 1){
            setProductQuantity(parseInt(e.target.value))
            let temp = props.value
            temp[props.index].quantity = parseInt(e.target.value)
            props.setValue(temp)
        }else{
            setProductQuantity(1)
            let temp = props.value
            temp[props.index].quantity = 1
            props.setValue(temp)
        }
        

    }

    const scrollLeft = () => {
        const sizeScroller = document.querySelector("#sizeScroller" + props.id)
        sizeScroller.scroll(sizeScroller.scrollLeft - 100,0)
    }

    const scrollRight = () => {
        const sizeScroller = document.querySelector("#sizeScroller" + props.id)
        sizeScroller.scroll(sizeScroller.scrollLeft + 100,0)
    }

    const removeProduct = async (id) => {
        try {
            const res = await fetch('/api/user/removecartproduct',{
                method: 'PATCH',
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify({reference: id})
            })
            const { cart } = await res.json()
            const temp = props.value.filter(item => item.reference != id);
            props.setValue(temp)
            setCartNumber(cart)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <tr className='border-b'>
            <td className='text-center font-medium'>{props.reference}.{props.sizes[productSize]}</td>
            <td className='text-center flex flex-nowrap justify-center items-center w-40 h-44 relative'><Image src={props.image} alt='product image' width={150} height={170} layout='fixed' objectFit="contain" objectPosition="center" /> </td>
            <td className='text-center max-w-xs w-fit overflow-hidden text-ellipsis max-h-44'>
                <Link href={'/products/' + props.reference} >
                    <a className='hover:underline font-medium' target='_blank'>{props.name}</a>
                </Link></td>
            <td className="max-w-xs">
            <div className="noScrollBar flex flex-nowrap overflow-x-auto w-full max-w-full justify-center items-center overflow-hidden">
            <button className='relative bg-white w-5 h-full z-[90] grid place-content-center place-items-center font-bold text-2xl' onClick={e => scrollLeft()}><Image src={'pfe/arrow-right-3098_-_Copy_hsxwaz'} alt='arrow' width={15} height={15} layout='fixed' className='hover:scale-x-125' /></button>
            <div id={"sizeScroller" + props.id} className="sizeScroller w-full max-w-full flex flex-nowrap justify-start overflow-hidden">
                {props.sizes.map((item,index) => {
                if(productSize != index){ return <p className="border-[1px] border-orange ml-2 mb-2 h-fit w-fit py-2 px-1 font-medium text-sm hover:cursor-pointer whitespace-nowrap" onClick={e => 
                        {setProductSize(index)
                            let temp = props.value
                            temp[props.index].size = props.sizes[index]
                            props.setValue(temp)
                        }}>{item >= 0 ? item : 0} cm</p>}
                else{
                    return <p className="border-[1px] border-orange bg-orange text-white ml-2 mb-2 h-fit w-fit py-2 px-1 font-medium text-sm hover:cursor-pointer whitespace-nowrap">{item >= 0 ? item : 0} cm</p>
                }})}
                </div>
                <button className='relative  bg-white w-5 h-full z-[90] grid place-content-center place-items-center font-bold text-2xl' onClick={e => scrollRight()}><Image src={'pfe/arrow-right-3098_eujgfr'} alt='arrow' width={15} height={15} layout='fixed' className='hover:scale-x-125' /></button>
                </div>
           </td>
            <td className='text-center'><input type="number" name="produit" value={productQuantity} min={1} onChange={e => handleChange(e)} className='w-20 h-10 text-center border border-zinc-400 rounded-lg'/></td>
            <td><Image src={'pfe/trash-can-10417_dtvnpx'} alt='delete' height={25} width={25} className='hover:cursor-pointer' onClick={e => setShow(true)} /></td>
            <Modal show={show} onClose={() => setShow(false)} onConfirm={() => removeProduct(props.reference)} action={'delete'} content={'Êtes-vous sûr de vouloir retirer ce produit de votre panier?'} />
        </tr>
    )
}