import Link from "next/link"

export default function CategoriesNavigator({categoriesAndSubcategories}){
    return(
        <>
        {categoriesAndSubcategories.map(item => 
                        <ul id={item.category} key={item.category} className='ml-3 my-5'><span onClick={e => {
                            const element = document.querySelectorAll(`#${item.category} .expandable`)
                            if(element[0].offsetHeight < 24 ) {
                                element.forEach(elem => {
                                    elem.style.visibility = 'visible'
                                    elem.style.height = '28px'
                                    elem.style.marginTop = '6px'
                                })
                            }else{
                                element.forEach(elem => {
                                    elem.style.visibility = 'hidden'
                                    elem.style.height = '0px'
                                    elem.style.marginTop = '0px'
                                })
                            }
                            }} className="hover:cursor-pointer relative ml-4 font-medium text-sm pl-2 pr-5 py-1">&#62; shsrthrtsdhrthdrthdhdrty</span> 
                            {item.subcategories.map(element => <li key={element} className="bg-zinc-200 text-sm relative ml-12 transition-[height] duration-300 expandable h-0 w-7/12 shadow-lg invisible mt-0 min-w-fit rounded-lg font-medium flex justify-start items-center px-1">
                                <Link href='/'>
                                    <a>{element}</a>
                                </Link>
                                </li>)}
                        </ul>
                    )}
        </>
    )
}