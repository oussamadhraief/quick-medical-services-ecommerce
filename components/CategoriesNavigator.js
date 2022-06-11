import Link from "next/link"
import { useState } from "react"

export default function CategoriesNavigator({categoriesAndSubcategories}){

    const [openCategory,setOpenCategory] = useState(-1)

    return(
        <div className="w-full h-fit" id="categoriesOrderer">
        {categoriesAndSubcategories.map((item,index) => {
                                if(index == openCategory)
                    return (
                        <ul onClick={e => {
                            e.stopPropagation()
                            setOpenCategory(-1)}} key={item.category} className="transition-[height] duration-300 w-full overflow-hidden border-b border-zinc-200 h-fit" ><div className="hover:cursor-pointer transition-[height] duration-300 bg-harvey relative w-full font-medium h-10 ulSpan text-sm pl-2 py-2.5  text-black flex flex-nowrap items-center"><p className="text-lg font-mono font-extrabold transition-all rotate-90">&#62; </p>&nbsp;<Link href={`/categories/${item.category}?page=0`}><a className="hover:underline">{item.category}</a></Link></div> 
                            {item.subcategories.map((element,index) => <li key={element} className={index != item.subcategories.length - 1 ?  "bg-white border-b   text-sm pl-5 py-[18px] relative transition-[height] duration-300 expandable h-7 w-full min-w-fit  font-medium flex justify-start items-center px-1" : "bg-white  text-sm pl-5 py-[18px] relative transition-[height] duration-300 expandable h-7 w-full min-w-fit  font-medium flex justify-start items-center px-1" }>
                                <Link href={`/categories/${item.category}/${element}?page=0`}>
                                    <a >&#62; <span className="hover:underline">{element}</span> </a>
                                </Link>
                                </li>
                                )}
                        </ul>)
                        return (
                            <ul onClick={e => {
                                e.stopPropagation()
                                setOpenCategory(index)}} key={item.category} className="transition-[height] duration-300 w-full h-10 overflow-hidden border-b border-zinc-200 last:border-0" ><div className="hover:cursor-pointer transition-[height] duration-300 bg-harvey relative w-full font-medium h-10 ulSpan text-sm pl-2 py-2.5  text-black flex flex-nowrap items-center"><p className="rotate-0 text-lg font-mono font-extrabold transition-all">&#62; </p>&nbsp;<Link href={`/categories/${item.category}?page=0`}><a className="hover:underline">{item.category}</a></Link></div> 
                                {item.subcategories.map(element => <li key={element} className="bg-[#fff]  text-sm pl-5 relative transition-[height] duration-300 expandable h-0 w-full  hidden min-w-fit  font-medium justify-start items-center px-1">
                                    <Link href={`/categories/${item.category}/${element}?page=0`}>
                                        <a >&#62; <span className="hover:underline">{element}</span> </a>
                                    </Link>
                                    </li>
                                    )}
                            </ul>
                        )
            })}
        </div>
    )
}