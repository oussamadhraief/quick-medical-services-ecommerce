import { useEffect, useState,useContext } from "react";
import ReactDOM from "react-dom";
import { CategoriesContext } from '../utils/CategoriesContext'
import 'animate.css'
import Link from 'next/link'


function CategoriesModal({show, onClose}) {

    const {categoriesAndSubcategories,setCategoriesAndSubcategories} = useContext(CategoriesContext)
    const [isBrowser, setIsBrowser] = useState(false)
    const [selected,setSelected] = useState(0)
    const [loading,setLoading] = useState(true)
  
    useEffect(() => {
        if(categoriesAndSubcategories.length != 0 && isBrowser){
          setLoading(false)
          const { subcategories } = categoriesAndSubcategories.find((item,index) => index == selected)

        }
    },[categoriesAndSubcategories,selected])

    useEffect(() => {
      setIsBrowser(true);
    }, [])

    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose()
      };

      const modalContent = show ? 
        <div id="categoriesModal" className={`fixed h-screen w-screen top-0 left-0 bg-na3ne3i z-[9999] flex ${loading ? 'justify-center' : null} flex-nowrap  overflow-y-auto`}>
            {loading ? <div className="w-8 h-8 rounded-full border-4  border-b-zinc-400  border-l-zinc-400 border-t-third border-r-third animate-spin">
              
            </div>
            : <>  
            <div className="w-10 h-10 absolute right-5 hover:scale-110 top-5 font-medium text-white text-xl hover:cursor-pointer" onClick={e => handleCloseClick(e)}>
                <div className="w-6 h-[3px] bg-white absolute left-0 top-2 rotate-45 rounded-sm">
                  
                </div>
                <div className="w-6 h-[3px] bg-white absolute left-0 top-2 -rotate-45 rounded-sm">
                  
                </div>
            </div>
              <div className="w-screen h-fit py-10 grid gap-3">
                {categoriesAndSubcategories.map(item => {
                return (<ul key={`ul${item.category}`} id={`ul${item.category}`} className="relative w-full h-10 overflow-hidden grid after:content-[''] after:absolute after:bottom-[1px] after:w-full after:h-[0.5px] after:bg-[#1b6a6e] transition-all after:left-0 after:right-0 after:mx-auto">
                  <div className="flex w-full pl-5 items-center h-10 hover:cursor-pointer" onClick={e => {
                    e.target.firstChild.click()
                  }}>
                    <p className="font-medium text-xl text-white w-fit h-fit hover:cursor-pointer" onClick={(e) => {
                      e.stopPropagation();
                      const lisubs = document.querySelectorAll(`#ul${item.category} > li`)
                      const ulelem = document.getElementById(`ul${item.category}`)
                      if(ulelem.offsetHeight > 40){
                        e.target.innerText = '+'
                        ulelem.style.height = '40px'
                      }else{
                        e.target.innerText = '-'
                        ulelem.style.height = 40 + lisubs.length * 40 + 'px'
                    }}}>+</p>
                    &nbsp;
                    <Link href={`/categories/${item.category}`}>
                    <a className="font-medium text-white w-fit h-fit hover:underline">{item.category}</a>
                    </Link>
                  </div>
                  {item.subcategories.map(element => {
                    return (
                      <li key={`liol${element}`} className="h-10 w-full bg-pinky pl-10 font-medium py-2 text-gray-700 border-b-[0.5px] border-na3ne3i">&#62; 
                      <Link href={`/categories/${item.category}/${element}`}>
                      <a className="font-medium text-gray-700 w-fit h-fit hover:underline">{element}</a>
                      </Link></li>
                    )
                  })}
                </ul>
                )}
                )}
              </div>
            </>}
        </div>
      : null
    

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent, 
            document.getElementById("categoriesModal-root")
        );
      } else {
        return null;
      }    
  
}

export default CategoriesModal