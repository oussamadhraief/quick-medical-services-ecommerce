

export default function CategoriesNavigator({categoriesAndSubcategories}){
    return(
        <>
        {categoriesAndSubcategories.map(item => 
                        <ul id={item.category} className='ml-10'><span onClick={e => {
                            const element = document.querySelectorAll(`#${item.category} .expandable`)
                            if(element[0].offsetHeight == 0 ) {
                                element.forEach(elem => {
                                    elem.style.visibility = 'visible'
                                    elem.style.height = '24px'
                                })
                            }else{
                                element.forEach(elem => {
                                    elem.style.visibility = 'hidden'
                                    elem.style.height = '0px'
                                })
                            }
                            }} className="hover:cursor-pointer before:content-[''] before:bg-secondary before:w-2 before:h-2 before:absolute before:-left-3.5 before:top-2 before:rounded-full relative ml-4 font-medium text-base">{item.category}</span> 
                            {item.subcategories.map(element => <li className="before:content-[''] before:bg-main before:w-1.5 before:h-1.5 before:absolute before:-left-2.5 before:top-3 text-base before:rounded-full relative ml-6 transition-[height] expandable h-0 w-full invisible">{element}</li>)}
                        </ul>
                    )}
        </>
    )
}