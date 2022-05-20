import Image from "next/image"
import { useContext, useState } from "react"
import { ProductsContext } from "../utils/ProductsContext"
import 'animate.css'
import { LoadingContext } from "../utils/LoadingContext"
import { NotificationContext } from "../utils/NotificationContext"
import Modal from "../components/Modal"
import { useRouter } from "next/router"

export default function AdminProducts(props){
    
    const Router = useRouter()

    const {value,setValue} = useContext(ProductsContext)
    const {loadingContext,setLoadingContext} = useContext(LoadingContext)
    const {appear,setAppear} = useContext(NotificationContext)
    const [show,setShow] = useState(false)



    const handleDelete = async () => {
        props.handleLoading(true)
        setLoadingContext(true)
        document.getElementById('scrolltopdiv').scroll(0,0)
        try {
            const res = await fetch('/api/products/'+props.reference,{
                method: 'DELETE',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).then(async (res) => {
                if(res.status == 200){
                    const newValue = value.filter(item => item.reference != props.reference )
                    setValue(newValue)
                    setAppear({display: true, action: 'supprimé'})
                }
            })
        } catch (error) {
            console.error(error)
        }
        setLoadingContext(false)
        props.handleLoading(false)
    }

    return (
        <div id="scrolltopdiv" className={loadingContext ? "hidden" : "w-60 h-fit grid place-items-center border-[1px] sm:mx-3 mb-10 border-zinc-400 pb-1 rounded-lg overflow-hidden"}>
                <Image src={props.image} alt='product image' height={220} width={240} layout='fixed'  objectFit="contain" objectPosition="center" />
                <div className="flex flex-nowrap h-fit w-full overflow-hidden justify-center mx-auto px-1">
                    <p className="font-semibold text-ellipsis overflow-clip">{props.name}</p><i>&nbsp;-&nbsp;Ref:&nbsp;</i> <p className="font-thin text-zinc-500 w-fit">{props.reference}</p>
                </div>
                <div className="h-fit w-fit mx-auto mt-1">
                    <button className="h-fit w-fit p-1 border-[1px] border-main rounded-lg font-normal text-main text-sm hover:scale-105" onClick={e => {
                        Router.push({
                            pathname: Router.pathname,
                            query: { product: props.reference }
                            }, 
                            undefined, { shallow: true }
                            )
                        props.handleClick(props.reference)
                    }}>Modifier</button> <button className="h-fit w-fit p-1 border-[1px] hover:text-white hover:bg-red-500 border-red-500 text-red-500 rounded-lg font-normal text-sm" onClick={e => setShow(true)}>Supprimer</button>
                </div>
                <Modal show={show} onClose={() => setShow(false)} onConfirm={() => handleDelete()} action={'delete'} content={'Êtes-vous sûr de vouloir supprimer ce produit ?'} />
        </div>
    )
}