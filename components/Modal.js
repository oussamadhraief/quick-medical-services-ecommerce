import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

function Modal({show, onClose, content, onConfirm}) {
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
      <div className="h-fit w-11/12 sm:w-fit py-10 px-12 bg-white shadow-[0px_3px_26px_5px_rgba(0,0,0,0.6)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed z-[9999] rounded-xl grid place-items-center">
          <h1 className=" w-fit h-fit text-right font-bold top-2 right-4 text-xs absolute text-zinc-400 font-sans hover:cursor-pointer hover:text-red-500" onClick={(e) => handleCloseClick(e)}>X</h1>
          <p className="font-medium text-medium mt-5">{content}</p>
          <div className="flex flex-nowrap justify-end w-full h-fit mt-10">
            <button className="bg-red-500 px-6 py-2 rounded-xl text-white font-medium text-medium mr-5" onClick={() => onConfirm()}>Oui</button>
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