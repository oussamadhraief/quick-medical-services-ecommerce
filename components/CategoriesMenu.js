import { useState,useEffect,useContext } from 'react'
import CategoriesModal from './CategoriesModal'
import { CategoriesContext } from '../utils/CategoriesContext'
import Link from 'next/link'

export default function CategoriesMenu(){

    const [show,setShow] = useState(false)
    const [isMobile,setIsMobile] = useState(false)
    const [open,setopen] = useState(false)
    const [boardContent,setBoardContent] = useState({category: '',subcategories: []})
    const {categoriesAndSubcategories,setCategoriesAndSubcategories} = useContext(CategoriesContext)


    useEffect(() => {
        const mql = window.matchMedia('(max-width: 767px)')
        if(mql.matches){
            setIsMobile(true)
        }
    },[])
    
    const handleDisplaySubcategories = (e,category) => {
        setopen(true)
        e.stopPropagation()
        const categoriesBoard = document.getElementById('categoriesBoard')
        if(!isMobile && categoriesBoard != null){
            categoriesBoard.style.height = document.getElementById('categoriesContainer').offsetHeight + 'px'
        }
        const newValue = categoriesAndSubcategories.find(item => 
            category == item.category
        )
        setBoardContent(newValue)
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
                    <div id='categoriesContainer' className={open ? 'min-w-[250px] grid w-fit  bg-harvey rounded-lg shadow-form rounded-r-none hover:rounded-l-lg overflow-hidden' : 'min-w-[250px] grid w-fit  bg-harvey rounded-lg shadow-form hover:rounded-l-lg overflow-hidden'}>
                        {categoriesAndSubcategories.map(item => 
                        <button key={item.category} onClick={e => handleDisplaySubcategories(e,item.category)} className={boardContent.category == item.category ? 'w-full py-4 h-fit text-left font-medium bg-complementary pr-5 pl-1 relative overflow-hidden text-ellipsis max-w-[300px] break-words' :  'w-full py-4 h-fit text-left font-medium hover:bg-complementary pr-5 pl-1 relative overflow-hidden text-ellipsis max-w-[300px] break-words'}>
                        <Link href={`/categories/${item.category}?page=0`}>
                            <a id={'menu'+item.category}  className=" w-fit h-fit">
                                    &#62;&nbsp;<span id={'menu'+item.category} className='hover:underline whitespace-normal'>{item.category}</span>

                            </a>
                        </Link>
                        <p  className='absolute top-4 right-3'>&#x276F;</p>
                        </button>
                        )}
                    <div id='categoriesBoard' className={open ? 'w-fit min-w-[400px] max-w-[700px] max-h-full bg-white absolute top-0 left-full overflow-hidden inline-grid place-items-start grid-flow-col px-5 gap-2 rounded-r-lg shadow-float z-[9999]' : 'w-fit min-w-[400px] max-w-[700px] max-h-full bg-white absolute top-0 left-full hidden place-items-start overflow-hidden grid-flow-col px-5 gap-2 rounded-r-lg shadow-float z-[9999]'}>
                        {boardContent.subcategories.map(element => 
                        <Link key={element} href={`/categories/${boardContent.category}/${element}`}>
                            <a className='mr-10 flex-auto'>&#62; <span className='hover:underline'>{element}</span></a>
                        </Link>)}
                    </div>
                    </div>
                </div>}

            </div>}
        </>  
        
        )
}