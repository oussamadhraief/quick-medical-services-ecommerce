import { useState,useContext } from "react"
import Image from "next/image"
import { SizeSelectionContext } from "../utils/SizeSelectionContext"


export default function SizeSelection(props){

    const [selection,setSelection] = useState(0)
    const {selectedSize,setSelectedSize} = useContext(SizeSelectionContext)

    const scrollLeft = () => {
        const sizeScroller = document.querySelector("#sizeScroller" + props.id)
        sizeScroller.scroll(sizeScroller.scrollLeft - 100,0)
    }

    const scrollRight = () => {
        const sizeScroller = document.querySelector("#sizeScroller" + props.id)
        sizeScroller.scroll(sizeScroller.scrollLeft + 100,0)
    }

    return (
        <div className="flex flex-nowrap overflow-x-auto w-full max-w-full justify-center items-center overflow-hidden">

            <button className='relative bg-white w-5 h-full z-[90] grid place-content-center place-items-center font-bold text-2xl' onClick={e => scrollLeft()}><Image src={'pfe/arrow-right-3098_-_Copy_hsxwaz'} alt='arrow' width={15} height={15} layout='fixed' className='hover:scale-x-125' /></button>

            <div id={"sizeScroller" + props.id} className="sizeScroller w-full max-w-full flex flex-nowrap justify-start overflow-hidden">
                
                {props.sizes.map((item,index) => {
                    if(selection != index){ return <button className="border-[1px] border-orange ml-2 mb-2 h-fit w-fit py-2 px-1 font-medium text-sm hover:cursor-pointer whitespace-nowrap" onClick={e => 
                        {setSelection(index)
                        setSelectedSize(index)}}>{item >= 0 ? item : 0} cm</button>}
                else{
                    return <button className="border-[1px] border-orange bg-orange text-white ml-2 mb-2 h-fit w-fit py-2 px-1 font-medium text-sm hover:cursor-pointer whitespace-nowrap">{item >= 0 ? item : 0} cm</button>
                }
            })}
            </div>

            <button className='relative  bg-white w-5 h-full z-[90] grid place-content-center place-items-center font-bold text-2xl' onClick={e => scrollRight()}><Image src={'pfe/arrow-right-3098_eujgfr'} alt='arrow' width={15} height={15} layout='fixed' className='hover:scale-x-125' /></button>

        </div>
    )
}
