import { NextRouter, useRouter } from "next/router"
import { useEffect, useState } from "react"
import Image from "next/image"
import SizeSelection from "../../components/SizeSelection"
import LoadingAnimation from '../../components/LoadingAnimation'
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { SizeSelectionContext } from "../../utils/SizeSelectionContext"
import { CategoriesContext } from "../../utils/CategoriesContext"
import { SearchContext } from "../../utils/SearchContext"
import { CartContext } from "../../utils/CartContext"
import CategoriesNavigator from "../../components/CategoriesNavigator"
import Head from 'next/head'

export default function Details(){

    const delivery = 'pfe/1_tybhhw.png'
    const payment = 'pfe/2_tqhmcd.png'
    const rapidity = 'pfe/3_av1ccn.png'
    const satisfaction = 'pfe/4_gutx7r.png'
    
    const [product,setProduct] = useState()
    const [categoriesAndSubcategories,setCategoriesAndSubcategories] = useState([])
    const [search,setSearch] = useState('')
    const [selectedSize , setSelectedSize]= useState(0)
    const [cartNumber , setCartNumber]= useState(0)
    const router = useRouter()

    useEffect(() => {
        async function fetchData() {
        const id = router.query.id
        if(typeof(id) == 'string'){try {
            const res = await fetch(`/api/products/${id}`)
            const { data } = await res.json()
            setProduct(data)
        } catch (error) {
            console.error(error);
        }
    }
}
    fetchData()
    },[router])

    useEffect(() => {
    async function fetchData() {
        try {
            const res = await fetch('/api/categoriesandsubcategories')
            const { data } = await res.json()
            setCategoriesAndSubcategories(data)
        } catch (error) {
            console.error(error)
        }
    }
    fetchData()
    },[])

    async function handleAddToCart() {
        try {
            const res = await fetch('/api/user/addproducttocart', {
              method : 'PATCH',
              headers:{
                  'accept' : 'application/json',
                  'Content-Type' : 'application/json'
              },
              body : JSON.stringify({reference : product.reference})
          })
          const { cart } = await res.json()
          setCartNumber(cart)
        } catch (error) {
          console.error(error)
        }
        
        
      }

    return(
        <div>
            <Head>
                <title>{typeof(product) == 'object' ? product.name : 'Produit'} - QUICK Medical Services</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Medical Supply Store"/>
                <meta name="robots" content="index, follow" />
                <link rel="icon" href="/logo.png"></link>
                <meta name="googlebot" content="index, follow"/>
                <meta name="keywords" content="" />
                <meta name='image' content="" />
                <meta itemProp="name" content="QUICK Medical Services"/>
                <meta itemProp="description" content="Medical Supply Store"/>
                <meta property="og:title" content="QUICK Medical Services"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content=""/>
                <meta property="og:image" content=""/>
                <meta property="og:description" content="Medical Supply Store"/>
                <meta itemProp='name' content="QUICK Medical Services"/>
                <meta itemProp='description' content="Medical Supply Store"/>
                <meta itemProp='image' content=""/>
                <meta name="twitter:card" value="summary_large_image"/>
                <meta name="twitter:title" value="QUICK Medical Services"/>
                <meta name="twitter:description" value="Medical Supply Store"/>
                <meta name="twitter:image" value=""/>
            </Head>
            <CategoriesContext.Provider value={{categoriesAndSubcategories,setCategoriesAndSubcategories}} >
            <SearchContext.Provider value={{search,setSearch}} >
            <CartContext.Provider value={{cartNumber,setCartNumber}} >
                <Header landingPage={false}  />
            </CartContext.Provider>
            </SearchContext.Provider>
            </CategoriesContext.Provider>
            <div className="w-full flex flex-nowrap justify-start items-start mt-32">
                
            
                <div className="w-3/12 h-full mx-2 ">
                        <p className="w-full h-fit py-4 text-center bg-na3ne3i font-medium text-white shadow-form">Explorez nos catégories</p>
                        <CategoriesNavigator categoriesAndSubcategories={categoriesAndSubcategories} />
                </div>
                {product == null ? <LoadingAnimation bgOpacity={true} /> :
                <div className="w-8/12 flex h-full flex-nowrap justify-start">
                    <div className="border-[1px] border-zinc-200 w-[95%] md:w-96 mx-auto md:mx-0 flex justify-center h-fit">
                        <Image src={product.image} alt="product image" height={350} width={384} layout='fixed'  objectFit="contain"  />
                    </div>
                    <div className="w-4/6 h-fit pl-5 grid gap-2">
                        <p className="font-bold text-2xl text-na3ne3i my-5">{product.name}</p>
                        <p className="font-medium text-zinc-600 mt-2 text-md">Référence:&nbsp;<span className="font-medium ml-2">{product.reference}.{product.sizes[selectedSize]}</span></p>
                        <p className="font-medium text-zinc-600 text-md mt-5">Catégorie:&nbsp;<span className="font-medium ml-2">{product.category}</span></p>
                        <p className="font-medium text-zinc-600 mt-5 text-md">Sous-Catégorie:&nbsp;<span className="font-medium ml-2">{product.subcategory}</span></p>
                        <p className="font-medium text-zinc-600 text-md mt-5 ">Tailles:&nbsp;</p>
                        <SizeSelectionContext.Provider value={{selectedSize, setSelectedSize}} >
                            <div className="h-fit w-full max-w-sm">
                                
                        <SizeSelection sizes={product.sizes} id={product._id} />
                            </div>
                        </SizeSelectionContext.Provider>
                        <p className="font-medium text-zinc-600 text-md mt-5">Description:&nbsp;</p>
                        <p>{product.description != '' ? product.description: 'pas de description'}</p>
                        <p className="font-medium text-zinc-600 mt-5 text-md">Disponibilité:&nbsp;</p>
                        {product.availability == 'available' ? <p className="font-bold text-md text-green-600">Disponible</p> : <p className="font-bold text-md text-red-500">Sur commande</p>}
                        <input type="number" name="quantity" value="1" min={1} className='border-2 border-pinky ml-14 rounded-lg h-fit w-20 text-center mt-5' />
                        <button onClick={e => handleAddToCart()} className="mt-5 bg-pinky w-fit h-fit px-3 py-3 rounded-lg text-white ml-4 text-sm md: xl:text-lg font-medium hover:bg-na3ne3i"> Ajouter au panier</button>
                    </div>
                    <div className="h-fit py-5 px-14 w-fit grid gap-9">
                <div className="flex flex-nowrap justify-between gap-4 items-center w-fit h-fit">
                    <Image src={delivery} alt='' width={80} height={80} layout='fixed' />
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
                    <Image src={satisfaction} alt='' width={100} height={80} layout='fixed' />
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

export async function getServerSideProps () {
    return { props: { hi: 'hi' } }
  }