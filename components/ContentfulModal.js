import { useEffect, useRef, useState,useContext } from "react";
import ReactDOM from "react-dom";
import SizeSelection from './SizeSelection'
import Image from "next/image";
import { SizeSelectionContext } from '../utils/SizeSelectionContext'
import { CartContext } from '../utils/CartContext'


function ContentfulModal({show, onClose, content}) {

    const [isBrowser, setIsBrowser] = useState(false);
    const {cartNumber,setCartNumber} = useContext(CartContext)
    const {selectedSize,setSelectedSize} = useContext(SizeSelectionContext)

    const delivery = 'pfe/1_tybhhw.png'
    const payment = 'pfe/2_tqhmcd.png'
    const rapidity = 'pfe/3_av1ccn.png'
    const satisfaction = 'pfe/4_gutx7r.png'
  
    useEffect(() => {
      setIsBrowser(true);
    }, []);

    const handleCloseClick = (e) => {
        e.preventDefault();
        setSelectedSize(0)
        onClose()
      };

      const modalContent = show ? 
      <>
       <div className="top-0 right-0 left-0 bottom-0 fixed bg-[rgba(0,0,0,.7)] z-[9999]" onClick={(e) => handleCloseClick(e)}>
           
       </div>
      <div className="h-5/6 flex flex-wrap lg:flex-nowrap w-10/12 lg:w-1/2 py-3 sm:py-10 px-5 overflow-y-auto sm:px-8 bg-white shadow-[0px_3px_26px_5px_rgba(0,0,0,0.6)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed z-[9999] rounded-xl justify-evenly gap-5">
          <SizeSelectionContext.Provider value={{selectedSize,setSelectedSize}}>
            <button onClick={(e) => handleCloseClick(e)} className='absolute top-1 right-2 font-medium text-third hover:text-zinc-300'>X</button>
                
            <div>
                    <div className="border-[1px] border-zinc-200 w-[95%] md:w-96 mx-auto md:mx-0 flex justify-center aspect-square h-fit relative">
                        <Image src={content.image} alt="product image" layout='fill'  objectFit="contain"  />
                    </div>
                    <p className="font-medium mt-5 text-sm text-zinc-400">Nombre de produits dans votre panier: {cartNumber}</p>
            </div>
            <div className="w-4/6 h-fit pl-1 grid">
                <p className="font-bold text-2xl text-main my-5 w-full overflow-hidden break-words">{content.name}</p>
                <p className="font-medium text-zinc-600 mt-2 text-md">Référence:&nbsp;</p>
                <p className="font-bold ml-2 mb-5 text-2xl text-main">{content.reference}.{content.sizes[selectedSize]}</p>
                <p className="font-medium text-zinc-600 text-md">Tailles:&nbsp;</p>
                <div className="w-full max-w-sm">
                    
                    <SizeSelection sizes={content.sizes} id={content._id} />
                </div>
                <p className="font-medium text-zinc-600 text-md mt-5">Description:&nbsp;</p>
                <p>{content.description != '' ? content.description: 'pas de description'}</p>
                <p className="font-medium text-zinc-600 mt-5 text-md">Disponibilité:&nbsp;</p>
                {content.availability == 'available' ? <p className="font-bold text-md text-green-600">Disponible</p> : <p className="font-bold text-md text-red-500">Sur commande</p>}
                <p className="font-medium text-zinc-600 text-md mt-5">Catégorie:&nbsp;<span className="font-medium ml-2">{content.category}</span></p>
                <p className="font-medium text-zinc-600 mt-5 text-md">Sous-Catégorie:&nbsp;<span className="font-medium ml-2">{content.subcategory}</span></p>
                <input type="number" name="quantity" value="1" min={1} className='border-2 border-main ml-14 rounded-lg h-fit w-20 text-center mt-10' />
                <button className="mt-5 bg-na3ne3i w-fit h-fit px-3 py-3 rounded-lg text-white ml-4 text-sm md: xl:text-lg font-medium hover:bg-orange"> Ajouter au panier</button>
            </div>
            </SizeSelectionContext.Provider>
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