import Header from '../components/Header'
import Footer from '../components/Footer'
import OrderForm from '../components/OrderForm'
import EstimateForm from '../components/EstimateForm'
import LoadingAnimation from '../components/LoadingAnimation'
import CartProduct from '../components/CartProduct'
import { useEffect, useState } from "react"
import { CategoriesContext } from "../utils/CategoriesContext"
import { SearchContext } from "../utils/SearchContext"
import { CartContext } from "../utils/CartContext"
import Link from "next/link"
import { useSession } from "next-auth/react"
import Head from "next/head"
import { useRouter } from 'next/router'



export default function Cart() {
    const { data: session, status } = useSession()

    const router = useRouter()


    const [categoriesAndSubcategories,setCategoriesAndSubcategories] = useState([])
    const [search,setSearch] = useState('')
    const [value,setValue] = useState([])
    const [loading,setLoading] = useState(true)
    const [cartProducts,setCartProducts] = useState([])
    const [cartNumber,setCartNumber] = useState(0)

    useEffect(() => {
        const AbortController = window.AbortController;
        const abortController = new AbortController()
        async function fetchData() {
            try {
                const res = await fetch('/api/categoriesandsubcategories',{ signal: abortController.signal })
                const { data } = await res.json()
                setCategoriesAndSubcategories(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
        
        return () => {
            abortController.abort();
          }
    },[])

    useEffect(() => {
        const AbortController = window.AbortController;
        const abortController = new AbortController()
       async function fetchProducts() {
            try {
                const res = await fetch('/api/user/userproducts',{ signal: abortController.signal })
                const { data } = await res.json()
                setCartProducts(data)
                const newValue = data.map(item => { 
                    return ({
                    reference: item.product.reference,
                    quantity: 1,
                    size: item.product.sizes[0]
                })})
                setValue(newValue)
                setLoading(false)
            } catch (error) {
                console.error(error)
            }
        }
        fetchProducts()
        
        return () => {
            abortController.abort();
          }
    },[])

    useEffect(() => {
        setLoading(true)
        const AbortController = window.AbortController;
        const abortController = new AbortController()
       async function fetchProducts() {
            try {
                const res = await fetch('/api/user/userproducts',{ signal: abortController.signal })
                const { data } = await res.json()
                const temp = data.map(item => item.product)
                setCartProducts(temp)
            } catch (error) {
                console.error(error)
            }
            setLoading(false)
        }
        fetchProducts()
        
        return () => {
            abortController.abort();
          }
    },[cartNumber])

    useEffect(() => {
        const AbortController = window.AbortController;
        const abortController = new AbortController()
        if(session){
          async function fetchCart(){
              const res = await fetch('/api/user/usercart',{ signal: abortController.signal })
              const { data } = await res.json()
              setCartNumber(data.length)
          }
          fetchCart()
        }
        return () => {
            abortController.abort();
          }
      },[status])

    

    if(status == 'loading') return  (
        <div className='bg-white h-screen w-screen overflow-hidden flex items-center absolute z-[9999] left-0 top-0'>
          <div id="contact-loading" className="w-fit h-fit bg-white/70 z-[9999] mx-auto ">
            <div className="reverse-spinner "></div>
          </div>
        </div>
       )
       
       if(status == 'unauthenticated') {
        router.push('/login')
        return null
       }
    
    return(
        
        <div>
            <Head>
        <title>Contact - QUICK Medical Services</title>
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
            <CartContext.Provider value={{cartNumber,setCartNumber}} >
            <CategoriesContext.Provider value={{ categoriesAndSubcategories,setCategoriesAndSubcategories }} >
            <SearchContext.Provider value={{search,setSearch}} >
                <Header landingPage={false}  />
            </SearchContext.Provider>
            </CategoriesContext.Provider>
            <div className='w-full h-fit py-2 items-center flex flex-nowrap justify-center relative mt-32 bo shadow border-t border-harvey'>
                <Link href='/'>
                    <a className='absolute left-3 top-3.5 text-center w-fit h-fit font-medium text-zinc-600 hover:underline'>&#x2190;&nbsp;Retour à la page d&apos;acceuil</a>
                </Link>
                <p className='w-fit h-fit text-2xl font-medium text-third'>Votre panier</p>
            </div>
            <div  className='w-full h-fit bg-harvey grid pb-10 pt-10 '>
                <div className='w-[99%] bg-transparent h-fit min-h-[300px] relative mx-auto'>
            {loading ? <LoadingAnimation key='delete' bgOpacity={false} /> : 
                    
                
                <table className='w-full h-fit  bg-white table-auto rounded-md'>
                    <thead className="w-full h-14 after:content-[''] after:absolute after:w-[99%] after:h-[1px] after:bg-zinc-300 relative after:-bottom-[1px] after:mx-auto after:right-0 after:left-0">
                        <tr>
                        <th className='text-center text-base font-medium text-third pl-3'>RÉFÉRENCE</th>
                        <th className='text-center text-base font-medium text-third w-40'>IMAGE</th>
                        <th className='text-center text-base font-medium text-third'>NOM</th>
                        <th className='text-center text-base font-medium text-third'>TAILLE</th>
                        <th className='text-center text-base font-medium text-third'>QUANTITÉ</th>
                        <th className='text-center text-base font-medium text-third px-5'></th>
                        </tr>
                    </thead>
                    <tbody className='w-full h-full mt-32  '>
                        {cartProducts.length > 0 ? 
                        cartProducts.map((item,index) => {
                            return (
                                <CartProduct key={index} reference={item.reference} name={item.name} sizes={item.sizes} image={item.image} index={index} value={value} setValue={setValue} />
                                )
                            })
                            : <tr>
                                <td className='font-medium text-center h-52' colSpan={6}>Votre panier est vide, <Link href={{pathname: '/products',query: {page: 0}}}><a className='text-pinky hover:underline'>explorez nos produits !</a></Link></td>
                            </tr> 
                            } 
                    </tbody>
                </table>
                    }
                </div>
                <p className='mt-10  w-10/12 mx-auto bg-white text-center font-medium pt-5'>Veuillez remplir l&apos;un de ces formulaires selon vos besoins</p>
                <div className='w-10/12 h-fit flex flex-nowrap bg-white mx-auto justify-evenly py-10 rounded-md'>
                    <OrderForm value={value} setCartNumber={setCartNumber} />
                    <div className='min-h-full py-10 bg-complementary shadow-inner w-1 rounded-lg '>
                        
                    </div>
                    <EstimateForm value={value} setCartNumber={setCartNumber} />
                </div>
                </div>
                <div className='w-full h-fit py-2 items-center flex flex-nowrap justify-between shadow px-5'>
                <Link href='/'>
                    <a className='text-center w-fit h-fit font-medium text-zinc-600 hover:underline'>&#x2190;&nbsp;Retour à la page d&apos;acceuil</a>
                </Link>
                <div className=' flex flex-nowrap gap-5 justify-between h-fit w-fit'>
                    
                <Link href='/account/quoterequests'>
                    <a className='text-center w-fit h-fit font-medium  px-1 py-0.5 rounded-sm  hover:underline'>Voir mon historique de devis</a>
                </Link>
                |
                <Link href='/account/orders'>
                    <a className='text-center w-fit h-fit font-medium px-1 py-0.5 rounded-sm hover:underline'>Voir mon historique de commandes</a>
                </Link>
                </div>
            </div>
            <Footer/>
            </CartContext.Provider>
        </div>
            
        )
}


export async function getServerSideProps () {
    return { props: { hi: 'hi' } }
}

  Cart.auth = true