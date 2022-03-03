import { useContext } from "react"
import { CategoriesContext } from "../utils/CategoriesContext"

export default function CategoriesMenu(){

    const {categoriesAndSubcategories,setCategoriesAndSubcategories} = useContext(CategoriesContext)

    return(
        <ul className="text-third font-medium text-lg rounded-t-lg sm:rounded-t-none rounded-l-none sm:rounded-l-lg py-3 mx-auto sm:mx-0 sm:border-r-[1px] px-3 border-zinc-300 hover:cursor-pointer grid group relative">
            <p className="flex flex-nowrap px-2 gap-3 w-fit h-full"><span className="font-extrabold">&#x2630; &nbsp;</span>  Catégories</p>
            <ul className="absolute top-[69px] -left-3 rounded-md shadow-stylish bg-white w-fit h-fit">
                
            {categoriesAndSubcategories.map(item => <li key={item.category} className="hidden w-11/12 mx-auto last:border-none h-fit group-hover:flex bg-white pl-3 pr-32 py-3 fomt-medium text-base border-b relative"><ul className="w-fit h-fit group flex bg-white">
                &#62;{item.category}
                <div className="hidden group-hover:grid absolute left-[110%] bg-white">
                    {item.subcategories.map(element => <li key={element} className="hidden group-hover:grid bg-white px-5">{element}</li>)}
                </div>
            </ul></li>)}
            </ul>
        </ul>
    )
}