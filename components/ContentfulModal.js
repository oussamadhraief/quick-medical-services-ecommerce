import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import SizeSelection from './SizeSelection'
import Image from "next/image";

function ContentfulModal({show, onClose, content}) {
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
      <div className="h-4/6 w-11/12 grid lg:flex md:w-8/12 py-3 sm:py-5 px-5 overflow-y-auto sm:px-8 bg-white shadow-[0px_3px_26px_5px_rgba(0,0,0,0.6)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed z-[9999] rounded-xl justify-center gap-10">
      <button onClick={(e) => handleCloseClick(e)} className='absolute top-1 right-2 font-medium text-third hover:text-zinc-300'>X</button>
      <div className="border-[1px] border-zinc-200 w-[95%] mx-auto md:mx-0 flex justify-center h-fit">
            <Image src={content.image} alt="product image" height={350} width={384} layout='fixed'  objectFit="contain"  />
        </div>
            <div className="w-4/6 h-fit pl-1 grid">
                <p className="font-bold text-2xl text-main my-5">{content.name}</p>
                <p className="font-medium text-zinc-600 mt-2 text-md">Référence:&nbsp;</p>
                <p className="font-bold ml-2 mb-5 text-2xl text-main">{content.reference}</p>
                <p className="font-medium text-zinc-600 text-md">Catégorie:&nbsp;<span className="font-medium ml-2">{content.category}</span></p>
                <p className="font-medium text-zinc-600 mt-5 text-md">Sous-Catégorie:&nbsp;<span className="font-medium ml-2">{content.subcategory}</span></p>
                <p className="font-medium text-zinc-600 text-md mt-5 ">Tailles:&nbsp;</p>
                <SizeSelection sizes={content.sizes} />
                <p className="font-medium text-zinc-600 text-md mt-5">Description:&nbsp;</p>
                <p>{content.description != '' ? content.description: 'pas de description'}</p>
                <p className="font-medium text-zinc-600 mt-5 text-md">Disponibilité:&nbsp;</p>
                {content.availability == 'available' ? <p className="font-bold text-md text-green-600">Disponible</p> : <p className="font-bold text-md text-red-500">Sur commande</p>}
                <input type="number" name="quantity" value="1" min={1} className='border-2 border-main ml-14 rounded-lg h-fit w-20 text-center mt-5' />
                <button className="mt-5 bg-ciel w-fit h-fit px-3 py-3 rounded-lg text-white ml-4 text-sm md:text-medium xl:text-lg font-medium hover:bg-main"> Ajouter au panier</button>
            </div>
      </div>
      </>
      : null
    

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent, 
            document.getElementById("contentfulModal-root")
        );
      } else {
        return null;
      }    
  
}

export default ContentfulModal