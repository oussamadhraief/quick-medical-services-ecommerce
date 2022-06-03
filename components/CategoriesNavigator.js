import Link from "next/link"

export default function CategoriesNavigator({categoriesAndSubcategories}){
    return(
        <div className="w-full h-fit" id="categoriesOrderer">
        {categoriesAndSubcategories.map(item => 
                        <ul id={'lu'+item.category} key={item.category} className="transition-[height] duration-300 w-full overflow-hidden border-b border-zinc-200 last:border-0" ><div key={item.subcategory} className="hover:cursor-pointer transition-[height] duration-300 bg-harvey relative w-full font-medium h-10 ulSpan text-sm pl-2 py-2.5  text-black flex flex-nowrap items-center"><p id={`lu${item.category}arrow`} className="text-lg font-mono font-extrabold transition-all" onClick={e => {
                            const element = document.querySelectorAll(`#lu${item.category} .expandable`)
                            const ulElem = document.getElementById('lu'+item.category)
                            const divchange = document.querySelector(`#lu${item.category} > div`)
                            const rotateArrow = document.getElementById(`lu${item.category}arrow`)
                            ulElem.style.height = '40px'
                            if(element[0].offsetHeight < 24 ) {
                                element.forEach((elem,index) => {
                                    elem.style.visibility = 'visible'
                                    elem.style.paddingTop='18px'
                                    elem.style.paddingBottom='18px'
                                    elem.style.height = '28px'
                                    divchange.style.background = '#E7EDEE'
                                    if(index != element.length - 1) elem.style.borderBottom = '1px solid #fff'
                                })
                                rotateArrow.style.transform = 'rotate(90deg)'
                                ulElem.style.height = ulElem.offsetHeight + (element.length * 37 )+ 'px'
                            }else{
                                element.forEach((elem,index) => {
                                    elem.style.visibility = 'hidden'
                                    elem.style.paddingTop='0px'
                                    elem.style.paddingBottom='0px'
                                    elem.style.height = '0px'
                                    divchange.style.background = '#ddece9'
                                    elem.style.borderBottom = '0px solid #fff'
                                })
                                rotateArrow.style.transform = 'rotate(0deg)'
                            }
                            }}>&#62; </p>&nbsp;<Link href={`/categories/${item.category}?page=0`}><a className="hover:underline">{item.category}</a></Link></div> 
                            {item.subcategories.map(element => <li key={element} className="bg-[#fff]  text-sm pl-5 relative transition-[height] duration-300 expandable h-0 w-full  invisible min-w-fit  font-medium flex justify-start items-center px-1">
                                <Link href={`/categories/${item.category}/${element}?page=0`}>
                                    <a >&#62; <span className="hover:underline">{element}</span> </a>
                                </Link>
                                </li>
                                )}
                        </ul>
                    )}
        </div>
    )
}