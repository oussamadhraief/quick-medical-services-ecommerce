import { useState } from "react"


export default function SizeSelection(props){

    const [selection,setSelection] = useState(0)


    return (
        <div className="flex flex-wrap">
                {props.sizes.map((item,index) => {
                    if(selection != index){ return <p className="border-[1px] border-main ml-2 mb-2 h-fit w-fit py-2 px-1 font-medium text-sm hover:cursor-pointer" onClick={e => setSelection(index)}>{item >= 0 ? item : 0} cm</p>}
                else{
                    return <p className="border-[1px] border-main bg-main text-white ml-2 mb-2 h-fit w-fit py-2 px-1 font-medium text-sm hover:cursor-pointer">{item >= 0 ? item : 0} cm</p>
                }
            })}
        </div>
    )
}