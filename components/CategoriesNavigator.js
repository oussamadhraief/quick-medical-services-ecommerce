import Link from "next/link"

export default function CategoriesNavigator({categoriesAndSubcategories}){
    return(
        <>
        {categoriesAndSubcategories.map(item => 
                        <ul id={item.category} key={item.category} className="transition-[height] h-fit duration-300" ><li key={item.subcategory} onClick={e => {
                            const element = document.querySelectorAll(`#${item.category} .expandable`)
                            if(element[0].offsetHeight < 24 ) {
                                element.forEach(elem => {
                                    elem.style.height = '28px'
                                    elem.style.visibility = 'visible'
                                    elem.style.marginTop = '1px'
                                    elem.style.paddingTop='22px'
                                    elem.style.paddingBottom='22px'
                                })
                            }else{
                                element.forEach(elem => {
                                    elem.style.height = '0px'
                                    elem.style.visibility = 'hidden'
                                    elem.style.marginTop = '0px'
                                    elem.style.paddingTop='0px'
                                    elem.style.paddingBottom='0px'
                                })
                            }
                            }} className="hover:cursor-pointer transition-[height] duration-300 bg-[#ECECEC] relative w-full font-medium text-sm pl-2 py-2.5  text-[#636161]">&#62; {item.category}</li> 
                            {item.subcategories.map(element => <li key={element} className="bg-white border-[#d8d7d7] last:border-none border-b ml-10 text-sm relative text-[#636161] transition-[height] duration-300 expandable h-0 w-full  invisible mt-0 min-w-fit  font-medium flex justify-start items-center px-1">
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