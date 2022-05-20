import { useState,useEffect,useContext } from 'react'
import CategoriesModal from './CategoriesModal'
import { CategoriesContext } from '../utils/CategoriesContext'
import Link from 'next/link'

export default function CategoriesMenu(){

    const [show,setShow] = useState(false)
    const [isMobile,setIsMobile] = useState(false)
    const [boardContent,setBoardContent] = useState([])
    const {categoriesAndSubcategories,setCategoriesAndSubcategories} = useContext(CategoriesContext)

    useEffect(() => {
        const mql = window.matchMedia('(max-width: 767px)')
        if(mql.matches){
            setIsMobile(true)
        }
    },[])

    useEffect(() => {
        const mql = window.matchMedia('(min-width: 768px)')
        const categoriesBoard = document.getElementById('categoriesBoard')
        if(mql.matches && categoriesBoard != null){
            categoriesBoard.style.height = document.getElementById('categoriesContainer').offsetHeight + 'px'
            const categories = document.querySelectorAll('.categorieItem')
            categories.forEach(item => item.addEventListener('mouseover',(e) => handleDisplaySubcategories(e)))
        }
    })

    const handleDisplaySubcategories = (e) => {
        const newValue = categoriesAndSubcategories.find(item => e.target.id == ('menu' + item.category))
        const temp = newValue.subcategories
        setBoardContent(temp)
    }

    return(
        <>
        {isMobile ?
        <>
                <button className="w-full sm:w-fit h-14 px-10 whitespace-nowrap text-center border-b sm:border-0 font-medium" onClick={e => {
                    document.body.style.height = '100vh'
                    document.body.style.overflow = 'hidden'
                    setShow(true)
                }}><span className="font-bold">&#x2630;</span>&nbsp; Catégories</button>
                <CategoriesModal  show={show} onClose={() => {
                    document.body.style.height = 'fit'
                    document.body.style.overflow = 'auto'
                    setShow(false)}} /> </>:
                    <div className="w-fit h-14 px-10 whitespace-nowrap text-center font-medium group hover:cursor-pointer flex flex-nowrap items-center"><span className="font-bold">&#x2630;</span>&nbsp; Catégories

                {categoriesAndSubcategories.length < 1 ? <>&nbsp;<div className='w-4 h-4 rounded-full border-2 border-t-zinc-300 border-r-zinc-300 border-b-third border-l-third animate-spin'>
                    
                </div>
                
        </> : 
            <div className='w-fit h-fit absolute top-[102%] left-0 hidden group-hover:flex rounded-lg shadow-form z-[9999]'>
                    <div id='categoriesContainer' className='min-w-[250px] grid w-fit pr-5 pl-1 bg-cleangray rounded-lg shadow-form hover:rounded-r-none hover:rounded-l-lg'>
                        {categoriesAndSubcategories.map(item => 
                        <Link key={item.category} href={`/categories/${item.category}`}>
                            <a id={'menu'+item.category}  className="categorieItem w-fit h-fit py-3">
                                    &#62;&nbsp;<span id={'menu'+item.category} className='hover:underline'>{item.category}</span>

                            </a>
                        </Link>)}
                    <div id='categoriesBoard' className='w-fit min-w-[400px] max-w-[700px] max-h-full bg-white absolute top-0 left-full invisible inline-grid place-items-start grid-flow-col px-5 gap-2 rounded-r-lg shadow-float z-[9999]'>
                        {boardContent.map(element => 
                        <Link key={boardContent.category} href={`/categories/${boardContent.category}/${element}`}>
                            <a className='mr-10 flex-auto'>&#62; <span className='hover:underline'>{element}</span></a>
                        </Link>)}
                    </div>
                    </div>
                </div>}

            </div>}
        </>  
        
        )
}