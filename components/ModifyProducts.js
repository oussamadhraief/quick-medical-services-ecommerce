import Image from "next/image"
import { useEffect, useState, useContext } from "react"
import { LoadingContext } from "../utils/LoadingContext"
import { ProductsContext } from "../utils/ProductsContext"

export default function ModifyProducts(props){

    const Modify = 'pfe/modify_p9iu6t.png'
    const Modifyselected = 'pfe/modifyselected_ncujpy_fdlkhp.png'

    const [classes,setClasses] = useState("mt-9 w-full px-1 bg-transparent py-2 flex flex-nowrap justify-center md:justify-start items-center space-x-1 hover:cursor-pointer hover:bg-orange rounded-lg")
    const [textClasses, setTextClasses] = useState("font-medium text-white whitespace-nowrap")
    const {loadingContext,setLoadingContext} = useContext(LoadingContext)
    const {value,setValue} = useContext(ProductsContext)


    useEffect(() => {
        if(props.selected == 2){
            setClasses("mt-9 w-full bg-white px-1 py-2 flex flex-nowrap justify-center md:justify-start items-center space-x-1 hover:cursor-pointer rounded-lg")
            setTextClasses("font-medium text-na3ne3i whitespace-nowrap")
        } else {
            setClasses("mt-9 w-full bg-transparent px-1 py-2 flex flex-nowrap justify-center md:justify-start items-center space-x-1 hover:cursor-pointer hover:bg-orange rounded-lg")
            setTextClasses("font-medium text-white whitespace-nowrap")
        }
    })

    return (
        <div id="modifyProducts" className={props.show ? classes : 'hidden'} onClick={async () => {if(!loadingContext) 
        {
        setLoadingContext(true)
        props.handleClick(2)
        const res = await fetch('api/products', {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
      
          })
        const { data } = await res.json()
        setTimeout(() => {
            
        }, 3000);
        setValue(data)
        setLoadingContext(false)
        }}} >
            {props.selected == 2 ? <Image src={Modifyselected} alt="plus" width={15} height={17} layout="fixed" /> : <Image src={Modify} alt="plus" width={15} height={17} layout="fixed" />}
            <p className={textClasses}>Modifier les produits</p>
        </div>
    )
}