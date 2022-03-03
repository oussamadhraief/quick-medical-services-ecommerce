import { useEffect, useState,useContext } from "react";
import ReactDOM from "react-dom";
import { CategoriesContext } from '../utils/CategoriesContext'
import 'animate.css'


function CategoriesModal({show, onClose}) {

    const {categoriesAndSubcategories,setCategoriesAndSubcategories} = useContext(CategoriesContext)
    const [isBrowser, setIsBrowser] = useState(false)
    const [selected,setSelected] = useState(0)
    const [subcategories,setSubcategories] = useState([])
  
    useEffect(() => {
        if(categoriesAndSubcategories != [] ){
            const array = categoriesAndSubcategories.find((item,index) => index == selected).subcategories
            setSubcategories(array)
        }
    },[selected])

    useEffect(() => {
      setIsBrowser(true);
    }, []);

    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose()
      };

      const modalContent = show ? 
        <div id="categoriesModal" className="fixed h-screen w-screen top-0 left-0 bg-[#92CFC8] z-[9999] flex items-center flex-nowrap animate__animated animate__zoomInDown">
            <button className="w-fit h-fit absolute left-5 top-1 font-medium font-mono text-xl" onClick={e => handleCloseClick(e)}>X</button>
            <div className="w-2/12 min-h-[95vh] h-fit overflow-auto border-r flex flex-col border-third gap-8 px-5 pt-5">
                {categoriesAndSubcategories.map((item,index) => 
                    <button className="w-full min-w-full h-fit text-third font-medium flex justify-between items-center" onClick={e => setSelected(index)}><p>{item.category}</p><p> &#62;</p></button>
                )}
            </div>
            <div className="w-9/12 h-[95vh] gap-8 flex-col flex-wrap flex pt-5 px-10">
                {subcategories.map(item =>  <p className="w-fit h-fit font-medium">&#62;&nbsp;{item}</p>)}
            </div>
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