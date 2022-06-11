import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Image from "next/image"
import SizeSelection from "../../components/SizeSelection"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { SizeSelectionContext } from "../../utils/SizeSelectionContext"
import { CategoriesContext } from "../../utils/CategoriesContext"
import { SearchContext } from "../../utils/SearchContext"
import { CartContext } from "../../utils/CartContext"
import CategoriesNavigator from "../../components/CategoriesNavigator"
import Head from 'next/head'
import { useSession } from "next-auth/react"
import Notification from '../../components/Notification'
import Modal from '../../components/Modal'


export default function Details(){

  const { data: session, status } = useSession()

    const delivery = 'pfe/1_tybhhw.png'
    const payment = 'pfe/2_tqhmcd.png'
    const rapidity = 'pfe/3_av1ccn.png'
    const satisfaction = 'pfe/4_gutx7r.png'
    
    const [product,setProduct] = useState()
    const [show, setShow] = useState(false)
    const [categoriesAndSubcategories,setCategoriesAndSubcategories] = useState([])
    const [search,setSearch] = useState('')
    const [hiddenCategories,setHiddenCategories] = useState(false)
    const [loading,setLoading] = useState(true)
    const [selectedSize , setSelectedSize]= useState(0)
    const [cartNumber , setCartNumber]= useState(0)
    const router = useRouter()
    const [showNotification,setShowNotification] = useState(false)
    const [message,setMessage] = useState('')

    useEffect(() => {
        async function fetchData() {
        const id = router.query.id
        if(typeof(id) == 'string'){try {
            const res = await fetch(`/api/products/${id}`)
            const { data } = await res.json()
            setProduct(data)
            setLoading(false)
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
          if(cartNumber < cart) {

            setCartNumber(cart)
            setShowNotification(false)
            setMessage('Le produit a été ajouté au panier')
            setShowNotification(true)
          }else{
            setCartNumber(cart)
            setShowNotification(false)
            setMessage('Le produit déjà existe dans votre panier')
            setShowNotification(true)
          }
        } catch (error) {
          console.error(error)
        }
        
        
      }

      if (status === 'loading' || loading) {
        return (
          <div className='bg-white h-screen w-screen overflow-hidden flex items-center absolute z-[9999] left-0 top-0'>
            <div id="contact-loading" className="w-fit h-fit bg-white/70 z-[9999] mx-auto ">
              <div className="reverse-spinner "></div>
            </div>
          </div>
         )
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
            <div className="w-full relative h-fit gap-3 lg:gap-0 flex flex-col lg:flex-row flex-nowrap justify-center lg:justify-start items-center lg:items-start mt-32 px-2 md:px-10 my-0">
            
                <div  className="w-11/12 sm:w-8/12 md:w-6/12 lg:w-3/12 lg:min-w-[300px] overflow-hidden transition-[height] duration-300 grid h-fit bg-harvey border-zinc-200 border min-h-fit shadow">
                <div className="w-full h-fit relative flex flex-nowrap items-center justify-center py-3 shadow-2xl text-white bg-light hover:cursor-pointer hover:bg-pinky " onClick={e => {
                        setHiddenCategories(prev => !prev)
                    }}>
                        <p className="h-fit w-fit font-medium whitespace-nowrap">Catégories et sous-catégories&nbsp;</p>
                        <p id="flipArrow" className={hiddenCategories ? "h-fit w-fit -rotate-90 transition-all" : "h-fit w-fit rotate-90 transition-all"}>&#11164;</p>
                    </div>
                    <div className={hiddenCategories ? "h-0 overflow-hidden" : "w-full h-fit"}>    
                        <CategoriesNavigator categoriesAndSubcategories={categoriesAndSubcategories} />
                    </div>
                </div>
                
                <div className="w-full grid place-content-start md:flex h-full flex-nowrap justify-start ml-3">
                    <div className="border-[1px] border-zinc-200 mx-auto h-[300px] sm:h-[400px] aspect-square relative">
                        <Image src={product.image} alt="product image" layout='fill' objectFit='contain' objectPosition='center'  />
                    </div>
                    <div className="w-full h-fit pl-5 grid gap-2">
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
                        {product.archived ? <div className='font-medium w-fit h-fit bg-zinc-200 px-3 py-3 ml-4 mt-7 rounded hover:cursor-not-allowed transition-all relative group whitespace-nowrap'>
                          Ajouter au panier
                          <p className='absolute -left-10 w-32 h-fit mx-auto top-[120%] hidden group-hover:block whitespace-nowrap text-red-500 font-normal'>Ce produit n&apos;est plus disponible.</p>
                        </div> : <button onClick={e => setShow(true)} className="mt-5 bg-pinky shadow-[0px_3px_10px_rgba(247,177,162,0.5)] hover:shadow-[0px_3px_10px_rgba(25,98,102,0.5)] hover:scale-105 transition-all w-fit h-fit px-3 py-3 rounded-lg text-white ml-4 text-sm md: xl:text-lg font-medium hover:bg-na3ne3i"> Ajouter au panier</button>}
                    </div>
                </div>
                
            </div>
            <div className="h-fit px-2 w-fit mx-auto justify-center items-center mt-32 flex flex-wrap gap-9">
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
                    <Image src={satisfaction} alt='' width={80} height={80} layout='fixed' />
                    <p className="text-start font-medium text-sm text-third">Garantie de<br></br>satisfaction totale</p>
                </div>
                <Modal show={show} onClose={() => setShow(false)} onConfirm={() => handleAddToCart()} action={'add'} content={'Êtes-vous sûr de vouloir ajouter ce produit au panier?'} />
                <Notification show={showNotification} setShow={setShowNotification} message={message} />
            </div>
            <Footer />
        </div>
    )
}

export async function getServerSideProps () {
    return { props: { hi: 'hi' } }
  }