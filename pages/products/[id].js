import { NextRouter, useRouter } from "next/router"
import { useEffect, useState } from "react"
import Image from "next/image"
import SizeSelection from "../../components/SizeSelection"
import LoadingAnimation from '../../components/LoadingAnimation'
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { SizeSelectionContext } from "../../utils/SizeSelectionContext"
import CategoriesNavigator from "../../components/CategoriesNavigator"

export default function Details(){

    const delivery = 'pfe/delivery_nexa3b.png'
    const payment = 'pfe/payment_zy8xmo.png'
    const rapidity = 'pfe/rapidity_xclfrf.png'
    const satisfaction = 'pfe/satisfait_yak5un.png'
    
    const [product,setProduct] = useState()
    const [categoriesAndSubcategories,setCategoriesAndSubcategories] = useState([])
    const [selectedSize , setSelectedSize]= useState(0)
    const router = useRouter()

    useEffect(async () => {
        const id = router.query.id
        if(typeof(id) == 'string'){try {
            const res = await fetch(`/api/products/${id}`)
            const { data } = await res.json()
            setProduct(data)
        } catch (error) {
            console.log(error);
        }
    }
    },[router])

    useEffect(async () => {
        try {
            const res = await fetch('/api/categoriesandsubcategories')
            const { data } = await res.json()
            let categories = data.map(item => item.category)
            categories = [...new Set(categories)]
            const orderedStuff = categories.map(item => orderedTable(item,data))
            setCategoriesAndSubcategories(orderedStuff)
        } catch (error) {
            console.error(error)
        }
        
    },[])

    function orderedTable(item,data){
        return {
            category: item,
            subcategories: [...new Set(data.filter(element => element.category == item).map(elem => elem.subcategory))]
        }
    }

    return(
        <div>
            <Header />
            <div className="w-full flex flex-nowrap justify-start items-start">
                
            
                <div className="w-3/12 border-2 h-full mx-2 ">
                    <CategoriesNavigator categoriesAndSubcategories={categoriesAndSubcategories} />
                </div>
                {product == null ? <LoadingAnimation bgOpacity={true} /> :
                <div className="w-8/12 flex h-full flex-nowrap justify-start">
                    <div className="border-[1px] border-zinc-200 w-[95%] md:w-96 mx-auto md:mx-0 flex justify-center h-fit">
                        <Image src={product.image} alt="product image" height={350} width={384} layout='fixed'  objectFit="contain"  />
                    </div>
                    <div className="w-4/6 h-fit pl-5 grid">
                        <p className="font-bold text-2xl text-main my-5">{product.name}</p>
                        <p className="font-medium text-zinc-600 mt-2 text-md">Référence:&nbsp;<span className="font-medium ml-2">{product.reference}.{product.sizes[selectedSize]}</span></p>
                        <p className="font-medium text-zinc-600 text-md mt-5">Catégorie:&nbsp;<span className="font-medium ml-2">{product.category}</span></p>
                        <p className="font-medium text-zinc-600 mt-5 text-md">Sous-Catégorie:&nbsp;<span className="font-medium ml-2">{product.subcategory}</span></p>
                        <p className="font-medium text-zinc-600 text-md mt-5 ">Tailles:&nbsp;</p>
                        <SizeSelectionContext.Provider value={{selectedSize, setSelectedSize}} >
                        <SizeSelection sizes={product.sizes} />
                        </SizeSelectionContext.Provider>
                        <p className="font-medium text-zinc-600 text-md mt-5">Description:&nbsp;</p>
                        <p>{product.description != '' ? product.description: 'pas de description'}</p>
                        <p className="font-medium text-zinc-600 mt-5 text-md">Disponibilité:&nbsp;</p>
                        {product.availability == 'available' ? <p className="font-bold text-md text-green-600">Disponible</p> : <p className="font-bold text-md text-red-500">Sur commande</p>}
                        <input type="number" name="quantity" value="1" min={1} className='border-2 border-main ml-14 rounded-lg h-fit w-20 text-center mt-5' />
                        <button className="mt-5 bg-ciel w-fit h-fit px-3 py-3 rounded-lg text-white ml-4 text-sm md:text-medium xl:text-lg font-medium hover:bg-main"> Ajouter au panier</button>
                    </div>
                    <div className="h-fit py-5 px-14 w-fit grid gap-9">
                <div className="flex flex-nowrap justify-between gap-4 items-center w-fit h-fit">
                    <Image src={delivery} alt='' width={80} height={55} layout='fixed' />
                    <p className="text-center font-medium text-sm text-third">Livraison à<br></br>domicile</p>
                </div>
                <div className="flex flex-nowrap justify-between gap-4 items-center w-fit h-fit">
                    <Image src={payment} alt='' width={80} height={80} layout='fixed' />
                    <p className="text-center font-medium text-sm text-third">Paiement à<br></br>la livraison</p>
                </div>
                <div className="flex flex-nowrap justify-between gap-4 items-center w-fit h-fit">
                    <Image src={rapidity} alt='' width={80} height={80} layout='fixed' />
                    <p className="text-center font-medium text-sm text-third">Rapidité et<br></br>efficacité</p>
                </div>
                <div className="flex flex-nowrap justify-between gap-4 items-center w-fit h-fit">
                    <Image src={satisfaction} alt='' width={80} height={80} layout='fixed' />
                    <p className="text-start font-medium text-sm text-third">Garantie de<br></br>satisfaction totale</p>
                </div>
            </div>
                </div>
                }
            </div>
            <Footer />
        </div>
    )
}