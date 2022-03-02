import Link from "next/link"

export default function CategoriesNavigator({categoriesAndSubcategories}){
    return(
        <>
        {categoriesAndSubcategories.map(item => 
                        <ul id={item.category} key={item.category} className="transition-[height] duration-300 w-full overflow-hidden border-b border-white last:border-0" ><p key={item.subcategory} onClick={e => {
                            const element = document.querySelectorAll(`#${item.category} .expandable`)
                            const ulElem = document.getElementById(item.category)
                            const rotateArrow = document.getElementById(`${item.category}arrow`)
                            ulElem.style.height = '40px'
                            if(element[0].offsetHeight < 24 ) {
                                element.forEach((elem,index) => {
                                    elem.style.visibility = 'visible'
                                    elem.style.paddingTop='18px'
                                    elem.style.paddingBottom='18px'
                                    elem.style.height = '28px'
                                    if(index != element.length - 1) elem.style.borderBottom = '1px solid #d8d7d7'
                                })
                                rotateArrow.style.transform = 'rotate(90deg)'
                                ulElem.style.height = ulElem.offsetHeight + (element.length * 37 )+ 'px'
                            }else{
                                element.forEach((elem,index) => {
                                    elem.style.visibility = 'hidden'
                                    elem.style.paddingTop='0px'
                                    elem.style.paddingBottom='0px'
                                    elem.style.height = '0px'
                                    elem.style.borderBottom = '0px solid #d8d7d7'
                                })
                                rotateArrow.style.transform = 'rotate(0deg)'
                                console.log(rotateArrow);
                            }
                            }} className="hover:cursor-pointer transition-[height] duration-300 bg-[#ECECEC] relative w-full font-medium h-10 ulSpan text-sm pl-2 py-2.5  text-[#636161] flex flex-nowrap items-center"><p id={`${item.category}arrow`} className="text-xs font-medium transition-all">&#62; </p>&nbsp;{item.category}</p> 
                            {item.subcategories.map(element => <li key={element} className="bg-white border-[#d8d7d7] ml-10 text-sm relative text-[#636161] transition-[height] duration-300 expandable h-0 w-full  invisible min-w-fit  font-medium flex justify-start items-center px-1">
                                <Link href='/'>
                                    <a>{element}</a>
                                </Link>
                                </li>
                                )}
                        </ul>
                    )}
        </>
    )
}