import Image from "next/image"
import { useContext, useState } from "react"
import { ProductsContext } from "../utils/ProductsContext"
import 'animate.css'
import { LoadingContext } from "../utils/LoadingContext"
import { NotificationContext } from "../utils/NotificationContext"
import Modal from "../components/Modal"
import { PagesContext } from "../utils/PagesContext"
import { useRouter } from "next/router"
import Link from "next/link"


export default function AdminProducts(props){
    
    const Router = useRouter()

    const {value,setValue} = useContext(ProductsContext)
    const {pages,setPages} = useContext(PagesContext)
    const {loadingContext,setLoadingContext} = useContext(LoadingContext)
    const {appear,setAppear} = useContext(NotificationContext)
    const [show,setShow] = useState(false)



    const handleArchived = async () => {
        props.handleLoading(true)
        setLoadingContext(true)
        document.getElementById('scrolltopdiv').scroll(0,0)
        try {
            let requestMethod
            if(props.archived){
                requestMethod = 'PATCH'
            }else{
                requestMethod = 'DELETE'
            }
            const res =  await fetch('/api/products/'+props.reference,{
                method: requestMethod,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).then(async (res) => {
                await res.json()
                if(res.status == 200){
                    setAppear({display: false, action: ''})
                    if(props.archived){
                        setAppear({display: true, action: 'désarchivé'})
                    }else{
                        setAppear({display: true, action: 'archivé'})
                    }

                    if(Router.query.page != 0){
                        Router.push({
                            pathname: Router.pathname,
                            query: { page: 0 }
                            })
                    }else{
                        let res
                        if(Router.pathname.includes('search')){
                            res = await fetch('/api/search/'+Router.query.id+'?page='+0)
                        }else{

                            if(props.archived){
                                res = await fetch('/api/products/archived?page='+0)
                            }else{
                                res = await fetch('/api/products?page='+0)
                            }
                        }
                        
                        const { data,number } = await res.json()
                        let numberOfPages
                        if(number> 0){

                            numberOfPages = Math.ceil(number /10)
                        }else{
                            numberOfPages = 1
                        }
                        
                        setValue(data)
                        setPages(numberOfPages)
                    }
                    
                }
            })
        } catch (error) {
            console.error(error)
        }
        setLoadingContext(false)
        props.handleLoading(false)
    }

    return (
        <div id="scrolltopdiv" className={loadingContext ? "hidden" : "w-64 h-fit grid place-items-center border-[1px] sm:mx-3 mb-10 border-zinc-400 pb-1 rounded-md overflow-hidden relative"}>
                {props.availability == 'unavailable' ? <div className="absolute top-0 right-1 z-10 w-14 h-12">
                    <Image src={'pfe/feelin_3_or1zjy'} alt='sur commande' layout="fill" />
                </div> : null }
                <Image src={props.image} alt='product image' height={220} width={240} layout='fixed'  objectFit="contain" objectPosition="center" />
                <div className="flex flex-nowrap h-fit w-full overflow-hidden justify-center mx-auto px-1 mb-3 mt-1">
                    <Link href={'/products/'+props.reference}> 
                        <a target='_blank' className="font-semibold text-ellipsis overflow-clip hover:underline">{props.name}</a>
                    </Link>
                    <i>&nbsp;-&nbsp;Ref:&nbsp;</i> <p className="font-thin text-zinc-500 w-fit">{props.reference}</p>
                </div>
                <div className="h-fit w-fit mx-auto mt-1 flex gap-1 flex-nowrap items-center">
                    
                    {props.archived ? null : <button className="h-fit w-fit p-1 bg-emerald-700 rounded-lg font-normal hover:border-green-600 hover:bg-green-600 text-white text-sm hover:scale-105" onClick={e => {
                        Router.push({
                            pathname: Router.pathname,
                            query: { product: props.reference }
                            }, 
                            undefined, { shallow: true }
                            )
                        props.handleClick(props.reference)
                    }}>Modifier</button> }
                     <button className={props.archived ? "h-fit w-fit p-1 border border-emerald-700 hover:border-red-400 hover:bg-red-400 bg-emerald-700 text-white rounded-lg font-normal text-sm" : "h-fit w-fit p-1 border border-bandena hover:border-red-400 hover:bg-red-400 bg-bandena text-white rounded-lg font-normal text-sm"} onClick={e => setShow(true)}>{props.archived ? 'Désarchiver' : 'Archiver'}</button>
                </div>
                {props.archived ? <Modal show={show} onClose={() => setShow(false)} onConfirm={() => handleArchived()} action={'delete'} content={'Êtes-vous sûr de vouloir archiver ce produit ?'} /> :
                <Modal show={show} onClose={() => setShow(false)} onConfirm={() => handleArchived()} action={'add'} content={'Êtes-vous sûr de vouloir désarchiver ce produit ?'} />  }
        </div>
    )
}