import { useState,useContext } from "react"
import { SizeSelectionContext } from "../utils/SizeSelectionContext"


export default function SizeSelection(props){

    const [selection,setSelection] = useState(0)
    const {selectedSize,setSelectedSize} = useContext(SizeSelectionContext)


    return (
        <div className="flex flex-wrap">
                {props.sizes.map((item,index) => {
                    if(selection != index){ return <p className="border-[1px] border-ciel ml-2 mb-2 h-fit w-fit py-2 px-1 font-medium text-sm hover:cursor-pointer" onClick={e => 
                        {setSelection(index)
                        setSelectedSize(index)}}>{item >= 0 ? item : 0} cm</p>}
                else{
                    return <p className="border-[1px] border-ciel bg-ciel text-white ml-2 mb-2 h-fit w-fit py-2 px-1 font-medium text-sm hover:cursor-pointer">{item >= 0 ? item : 0} cm</p>
                }
            })}
        </div>
    )
}
