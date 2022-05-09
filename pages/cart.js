import Header from '../components/Header'
import Footer from '../components/Footer'
import CartProduct from '../components/CartProduct'
import { useEffect, useState } from "react"
import { CategoriesContext } from "../utils/CategoriesContext"
import { SearchContext } from "../utils/SearchContext"
import Link from "next/link"
import { useSession } from "next-auth/react"
import Head from "next/head"
import { data } from '../utils/data'



export default function Cart() {
    const { data: session, status } = useSession()


    const [categoriesAndSubcategories,setCategoriesAndSubcategories] = useState([])
    const [search,setSearch] = useState('')
    const [value,setValue] = useState([])
    const [seperateAdresses,setSeperateAdresses] = useState(false)
    const [orderForm, setOrderForm] = useState({name: '',phone: '',email: '',clinicName: '',taxRegistrationNumber: '',note : '', address: '',address2: ''})

    useEffect(() => {
        async function fetchData() {
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
        }
        fetchData()
        const newValue = data.data.map(item => { return ({
            reference: item.reference,
            quantity: 1,
            size: item.sizes[0]
        })})
        setValue(newValue)
    },[])

    function orderedTable(item,data){
        return {
            category: item,
            subcategories: [...new Set(data.filter(element => element.category == item).map(elem => elem.subcategory))]
        }
    }

    const handleChange = (e) => {
        setOrderForm({
            ...orderForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(value);
        if(seperateAdresses){
            globalThis.orderData = {
                ...orderForm,
                address: [orderForm.address,orderForm.address2],
                cart: value
            }
        }else{
            globalThis.orderData = {
                ...orderForm,
                address: [orderForm.address],
                cart: value
            }
        }
        delete orderData.address2
        console.log(orderData);
        const res = await fetch('/api/user/makeorder',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(orderData)
        })
        const { user } = await res.json()
        console.log(user);
    }

    if(status == 'loading') return  (
        <div className='bg-white h-screen w-screen overflow-hidden flex items-center absolute z-[9999] left-0 top-0'>
          <div id="contact-loading" className="w-fit h-fit bg-white/70 z-[9999] mx-auto ">
            <div className="reverse-spinner "></div>
          </div>
        </div>
       )
       
       if(status == 'unauthenticated') {
        window.location = '/login'  
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
            <CategoriesContext.Provider value={{ categoriesAndSubcategories,setCategoriesAndSubcategories }} >
            <SearchContext.Provider value={{search,setSearch}} >
                <Header landingPage={false} cartPage={true} />
            </SearchContext.Provider>
            </CategoriesContext.Provider>
            <div className='w-full h-fit py-2 items-center flex flex-nowrap justify-center relative mt-32 bo shadow border-t border-[#E7EDEE]'>
                <Link href='/'>
                    <a className='absolute left-3 top-3.5 text-center w-fit h-fit font-medium text-zinc-600 hover:underline'>&#x2190;&nbsp;Retour à la page d&apos;acceuil</a>
                </Link>
                <p className='w-fit h-fit text-2xl font-medium text-third'>Votre panier</p>
            </div>
            <form onSubmit={e => handleSubmit(e)} className='w-full h-fit bg-[#E7EDEE] grid pb-10 pt-2'>
                <table className='w-[99%] h-fit mx-auto bg-white table-auto'>
                    <thead className="w-full h-14 after:content-[''] after:absolute after:w-[99%] after:h-[1px] after:bg-zinc-300 relative after:-bottom-[1px] after:mx-auto after:right-0 after:left-0">
                        <th className='text-center text-base font-medium text-third pl-3'>RÉFÉRENCE</th>
                        <th className='text-center text-base font-medium text-third'>IMAGE</th>
                        <th className='text-center text-base font-medium text-third'>NOM</th>
                        <th className='text-center text-base font-medium text-third' colSpan={2}>DÉSCRIPTION</th>
                        <th className='text-center text-base font-medium text-third'>TAILLE</th>
                        <th className='text-center text-base font-medium text-third'>QUANTITÉ</th>
                        <th className='text-center text-base font-medium text-third px-5'></th>
                    </thead>
                    <tbody className='w-full h-full mt-32'>
                        {data.data.map((item,index) => {
                            return (
                                <CartProduct reference={item.reference} name={item.name} sizes={item.sizes} image={item.image} index={index} value={value} setValue={setValue} />
                            )
                        })}     
                    </tbody>
                </table>
                <div className='w-5/12 px-5 py-10 mt-20 mx-auto bg-white grid min-w-[340px]'>
                    <p className='w-fit h-fit text-lg font-medium whitespace-nowrap mx-auto mb-5'>Veuillez vérifier et remplir ce formulaire pour continuer votre achat</p>
                    <p></p>
                    <input required type="text" name="name" onChange={e => handleChange(e)} value={orderForm.name} className='my-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Nom et prénom'/>

                    <input required type="number" name="phone" onChange={e => handleChange(e)} value={orderForm.phone} className='my-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Num. de téléphone'/>
                    
                    <label className='w-11/12 mx-auto font-medium text-sm mt-5 hover:cursor-pointer flex flex-nowrap items-center mb-1'>
                    <input type="checkbox" checked={seperateAdresses} name="seperate" onChange={e => {
                        setSeperateAdresses(!seperateAdresses)
                        if(seperateAdresses){

                            document.querySelector('.mainAdress').placeholder = 'Adresse de livraison et de facturation'
                        }else {
                            document.querySelector('.mainAdress').placeholder = 'Adresse de livraison'
                            
                        }
                    }} value="seperated" className='hover:cursor-pointer' /> &nbsp;Séparer l&apos;adresse de livraison et l&apos;adresse de facturation
                    </label>

                    {seperateAdresses ? <p className='w-11/12 mx-auto font-medium text-sm mt-1'>Adresse de <span className='border-b border-orange'>livraison</span> :</p> : null}
                    <input required type="text" name="address" onChange={e => handleChange(e)} value={orderForm.address} className='mainAdress mb-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Adresse de livraison et de facturation'/>

                    {seperateAdresses ? <p className='w-11/12 mx-auto mt-5 font-medium text-sm'>Adresse de <span className='border-b border-orange'>facturation</span>:</p> : null}
                    {seperateAdresses ? <input required type="text" name="address2" onChange={e => handleChange(e)} value={orderForm.address2} className='mb-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Adresse de facturation'/> : null}
                    
                    
                    <input required type="text" name="clinicName" onChange={e => handleChange(e)} value={orderForm.clinicName} className='my-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Nom de clinique'/>
                    
                    <input required type="text" name="taxRegistrationNumber" onChange={e => handleChange(e)} value={orderForm.taxRegistrationNumber} className='my-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Matricule fiscale'/>
                    
                    <input required type="email" name="email" onChange={e => handleChange(e)} value={orderForm.email} className='my-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Email'/>

                    <textarea className='my-5 h-fit min-h-[100px] w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' onChange={e => handleChange(e)} value={orderForm.note} placeholder='Message (facultatif)' col={50} row={4} name='note' />
                    
                    <div className='my-10 flex flex-nowrap justify-center w-fit mx-auto gap-10 items-center'>
                        
                    <button type="submit" className=' w-fit h-fit bg-orange whitespace-nowrap font-medium px-3 py-2 rounded-xl hover:bg-na3ne3i hover:text-white hover:scale-105 transition-all'>Demander un devis</button>
                    <button type="submit" className=' w-fit h-fit bg-na3ne3i text-white whitespace-nowrap font-medium px-3 py-2 rounded-xl hover:bg-orange hover:text-black hover:scale-105 transition-all'>Confirmer ma commande</button>
                    </div>
                </div>
                </form>
                <div className='w-full h-fit py-2 items-center flex flex-nowrap justify-between shadow px-5'>
                <Link href='/'>
                    <a className='text-center w-fit h-fit font-medium text-zinc-600 hover:underline'>&#x2190;&nbsp;Retour à la page d&apos;acceuil</a>
                </Link>
                <div className=' flex flex-nowrap gap-5 justify-between h-fit w-fit'>
                    
                <Link href='/account/estimates'>
                    <a className='text-center w-fit h-fit font-medium  px-1 py-0.5 rounded-sm  hover:underline'>Voir mon historique de devis</a>
                </Link>
                |
                <Link href='/account/orders'>
                    <a className='text-center w-fit h-fit font-medium px-1 py-0.5 rounded-sm hover:underline'>Voir mon historique de commandes</a>
                </Link>
                </div>
            </div>
            <Footer/>
        </div>
            
        )
}


export async function getServerSideProps () {
    return { props: { hi: 'hi' } }
  }