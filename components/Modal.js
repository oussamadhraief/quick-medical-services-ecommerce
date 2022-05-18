import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

function Modal({show, onClose, content,action, onConfirm}) {
    const [isBrowser, setIsBrowser] = useState(false);
  
    useEffect(() => {
      setIsBrowser(true);
    }, []);

    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose()
      };

      const modalContent = show ? 
      <>
       <div className="top-0 right-0 left-0 bottom-0 fixed bg-[rgba(0,0,0,.7)] z-[9999]" onClick={(e) => handleCloseClick(e)}>
           
       </div>
      <div className="h-fit w-10/12 sm:w-fit py-3 sm:py-5 px-5 sm:px-8 bg-white shadow-[0px_3px_26px_5px_rgba(0,0,0,0.6)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed z-[9999] rounded-xl grid">
          <h1 className=" w-fit h-fit text-right font-bold top-2 right-4 text-xs absolute text-zinc-400 font-sans hover:cursor-pointer hover:text-third hidden sm:block" onClick={(e) => handleCloseClick(e)}>X</h1>
          <p className="font-medium  mt-5">{content}</p>
          <div className="flex flex-nowrap justify-end w-full h-fit mt-10">
            <button className={action == 'delete' ? "bg-red-500 px-6 py-2 rounded-lg text-white font-medium  mr-5 hover:scale-105" : "bg-na3ne3i px-6 py-2 rounded-lg text-white font-medium  hover:bg-orange mr-5 hover:scale-105"} onClick={(e) => 
              {
                onConfirm()
                e.preventDefault();
                onClose()
              }
              }>Oui</button>
            <button className="font-medium text-sm" onClick={(e) => handleCloseClick(e)}>Annuler</button>
          </div>
      </div>
      </>
      : null
    

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent, 
            document.getElementById("modal-root")
        );
      } else {
        return null;
      }    
  
}

export default Modal