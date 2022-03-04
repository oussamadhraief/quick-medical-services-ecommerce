import { useEffect, useState,useContext } from "react";
import ReactDOM from "react-dom";
import { CategoriesContext } from '../utils/CategoriesContext'
import 'animate.css'


function CategoriesModal({show, onClose}) {

    const {categoriesAndSubcategories,setCategoriesAndSubcategories} = useContext(CategoriesContext)
    const [isBrowser, setIsBrowser] = useState(false)
    const [selected,setSelected] = useState(0)
    const [subcats,setSubcats] = useState([])
  
    useEffect(() => {
        if(categoriesAndSubcategories.length != 0 && isBrowser){
            const { subcategories } = categoriesAndSubcategories.find((item,index) => index == selected)
            setSubcats(subcategories)
        }
    },[categoriesAndSubcategories,selected])

    useEffect(() => {
      setIsBrowser(true);
    }, []);

    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose()
      };

      const modalContent = show ? 
        <div id="categoriesModal" className="fixed h-screen w-screen top-0 left-0 bg-trendy z-[9999] flex items-center flex-nowrap animate__animated animate__faster animate__fadeIn">
            <button className="w-fit h-fit absolute right-5 hover:scale-125 top-1 font-medium font-mono text-xl" onClick={e => handleCloseClick(e)}>X</button>
            <div className="w-[13%] min-h-[95vh] h-fit overflow-auto border-r flex flex-col border-third gap-8 px-3 pt-5">
                {categoriesAndSubcategories.map((item,index) => 
                    <button key={index} className={index != selected ? "w-full min-w-full h-fit px-2 py-1 text-third font-medium flex justify-between items-center hover:bg-third hover:text-white hover:rounded-lg" : "w-full min-w-full h-fit px-2 py-1  font-medium flex justify-between items-center bg-third text-white rounded-lg"} onClick={e => setSelected(index)}><p className="hover:underline" onClick={e => location.href=`/categories/${item.category}`}>{item.category}</p><p> &#62;</p></button>
                )}
            </div>
            <div className="w-9/12 h-[95vh] gap-8 flex-col flex-wrap flex pt-5 px-10">
                {subcats.map(item =>  <p key={item} className="w-fit h-fit font-medium flex flex-nowrap items-center">&#62;&nbsp;<p className="hover:underline hover:cursor-pointer" onClick={e => location.href=`/categories/${categoriesAndSubcategories[selected].category}/${item}`}>
                  {item}</p></p>)}
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