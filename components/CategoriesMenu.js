import { useState } from 'react'
import CategoriesModal from './CategoriesModal'

export default function CategoriesMenu(){

    const [show,setShow] = useState(false)

    return(
        <>
            <button className="w-fit h-20 px-10 whitespace-nowrap text-center font-medium" onClick={e => {
                document.body.style.height = '100vh'
                document.body.style.overflow = 'hidden'
                setShow(true)
            }}><span className="font-bold">&#x2630;</span>&nbsp; Catégories</button>
            <CategoriesModal show={show} onClose={() => {
                document.body.style.height = 'fit'
                document.body.style.overflow = 'auto'
                setShow(false)}} />
        </>
    )
}

 // const {categoriesAndSubcategories,setCategoriesAndSubcategories} = useContext(CategoriesContext)

    // useEffect(() => {
    //         const stretchMe = document.querySelectorAll('.stretchme')
    //         const stretchHim = document.getElementById('stretchhim')
    //         stretchMe.forEach(item => {
    //         item.style.height = stretchHim.offsetHeight +'px'
    //         item.style.width = stretchHim.offsetWidth * 3 +'px'})
    // })

// &#x2630;
{/* <ul id="positionUl" className="text-third font-medium text-lg rounded-t-lg sm:rounded-t-none rounded-l-none sm:rounded-l-lg py-3 mx-auto sm:mx-0 sm:border-r-[1px] px-3 border-zinc-300 hover:cursor-pointer grid group relative whitespace-nowrap z-50">
           &#x2630; Catégories
                <div id="stretchhim" className="hidden w-fit hover:w-[60vw] h-fit group-hover:grid group-bar group-hover:absolute top-full shadow-3xl bg-white overflow-hidden rounded-lg hover:overflow-visible hover:rounded-l-lg hover:rounded-r-none">
                    
            {categoriesAndSubcategories.map(item => <li className=" w-32 group-bar-hover:bg-ciel group-bar-hover:mx-0 mx-auto flex last:border-none h-fit bg-white pl-3 pr-32 py-3 fomt-medium text-base border-b relative group-foo">
                &#62;{item.category}
                    <div className="stretchme absolute top-0 rounded-r-lg shadow-stylish -z-10 bg-white min-h-full h-full left-[105%] hidden group-foo-hover:grid">
                        {item.subcategories.map(element => <li className=" bg-white px-5 h-fit w-fit">{element}</li>)}
                    </div>
                </li>)}
            </div>
        </ul> */}