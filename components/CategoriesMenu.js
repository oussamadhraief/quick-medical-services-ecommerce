import { useState,useEffect,useContext } from 'react'
import CategoriesModal from './CategoriesModal'
import { CategoriesContext } from '../utils/CategoriesContext'
import Link from 'next/link'

export default function CategoriesMenu(){

    const [show,setShow] = useState(false)
    const [isMobile,setIsMobile] = useState(false)
    const [boardContent,setBoardContent] = useState({category: '',subcategories: []})
    const {categoriesAndSubcategories,setCategoriesAndSubcategories} = useContext(CategoriesContext)

    useEffect(() => {
        const mql = window.matchMedia('(max-width: 767px)')
      if(mql.matches){
        setIsMobile(true)
      }else{
        setIsMobile(false)
      }
    },[])

    useEffect(() => {
        document.getElementById('categoriesBoard').style.height = document.getElementById('categoriesContainer').offsetHeight + 'px'
        const categories = document.querySelectorAll('.categorieItem')
        categories.forEach(item => item.addEventListener('mouseover',(e) => handleDisplaySubcategories(e)))
    })

    const handleDisplaySubcategories = (e) => {
        const newValue = categoriesAndSubcategories.find(item => item.category == e.target.id)
        setBoardContent(newValue)
    }

    if(isMobile) return(
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
    return (
        <>
        <div className="w-fit h-20 px-10 whitespace-nowrap text-center font-medium group hover:cursor-pointer flex flex-nowrap items-center"><span className="font-bold">&#x2630;</span>&nbsp; Catégories

        <div className='w-fit h-fit absolute top-[102%] left-0 hidden group-hover:flex rounded-lg shadow-form z-[9999]'>
            <div id='categoriesContainer' className='min-w-[250px] grid w-fit pr-5 pl-1 bg-cleangray rounded-lg shadow-form hover:rounded-r-none hover:rounded-l-lg group-foo'>
                {categoriesAndSubcategories.map(item => 
                <Link href={`/categories/${item.category}`}>
                    <a id={item.category} className="categorieItem w-fit h-fit py-3">
                            &#62;&nbsp;<span id={item.category} className='hover:underline'>{item.category}</span>

                    </a>
                </Link>)}
            <div id='categoriesBoard' className='w-fit min-w-[400px] max-h-full h-fit bg-white absolute top-0 left-full hidden group-foo-hover:inline-grid place-items-start grid-flow-col px-5 gap-2 rounded-r-lg shadow-float'>
                {boardContent.subcategories.map(element => 
                <Link href={`/categories/${boardContent.category}/${element}`}>
                    <a className='mr-10 flex-auto'>&#62; <span className='hover:underline'>{element}</span></a>
                </Link>)}
            </div>
            </div>
        </div>

        </div>
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