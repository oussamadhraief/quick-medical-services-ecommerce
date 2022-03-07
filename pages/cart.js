import Header from '../components/Header'
import Footer from '../components/Footer'
import { CategoriesContext } from "../utils/CategoriesContext"
import { useEffect, useState } from "react"
import Image from "next/image"
import { SearchContext } from "../utils/SearchContext"
import Link from "next/link"
import Head from "next/head"



export default function Contact() {

    const produit = 'pfe/product_mfoz0n.png'

    const [categoriesAndSubcategories,setCategoriesAndSubcategories] = useState([])
    const [search,setSearch] = useState('')

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
    },[])

    function orderedTable(item,data){
        return {
            category: item,
            subcategories: [...new Set(data.filter(element => element.category == item).map(elem => elem.subcategory))]
        }
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
                <Header landingPage={false} />
            </SearchContext.Provider>
            </CategoriesContext.Provider>
                <table className='w-11/12 mt-32 h-fit mx-auto'>
                    <thead className='w-full h-10 border-b'>
                        <th className='text-center text-base font-medium text-third'>RÉFÉRENCE</th>
                        <th className='text-center text-base font-medium text-third'>PRODUIT</th>
                        <th className='text-center text-base font-medium text-third' colSpan={2}>DÉSCRIPTION</th>
                        <th className='text-center text-base font-medium text-third'>TAILLE</th>
                        <th className='text-center text-base font-medium text-third'>QUANTITÉ</th>
                        <th className='text-center text-base font-medium text-third px-5'></th>
                    </thead>
                    <tbody className='w-full h-full'>
                        <tr className='border-b'>
                        <td className='text-center'>Référence</td>
                        <td className='text-center flex flex-nowrap justify-center items-center'><Image src={produit} alt='product image' height={220} width={240} layout='fixed'  objectFit="contain" objectPosition="center" /> <span>Produit</span></td>
                        <td className='text-center text-sm font-medium text-zinc-500' colSpan={2}>Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.</td>
                        <td className='text-center'>Taille</td>
                        <td className='text-center'><input type="number" name="produit" value="1" className='w-20 text-center border border-zinc-400 rounded-lg'/></td>
                        <td><p className='text-center text-zinc-600 hover:bg-third hover:text-white hover:cursor-pointer hover:scale-110 bg-zinc-200 rounded-full w-fit h-fit mx-auto px-2'>X</p></td>
                        </tr>
                        <tr className='border-b'>
                        <td className='text-center'>Référence</td>
                        <td className='text-center flex flex-nowrap justify-center items-center'><Image src={produit} alt='product image' height={220} width={240} layout='fixed'  objectFit="contain" objectPosition="center" /> <span>Produit</span></td>
                        <td className='text-center text-sm font-medium text-zinc-500' colSpan={2}>Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.</td>
                        <td className='text-center'>Taille</td>
                        <td className='text-center'><input type="number" name="produit" value="1" className='w-20 text-center border border-zinc-400 rounded-lg'/></td>
                        <td><p className='text-center text-zinc-600 hover:bg-third hover:text-white hover:cursor-pointer hover:scale-110 bg-zinc-200 rounded-full w-fit h-fit mx-auto px-2'>X</p></td>
                        </tr>
                        <tr className='border-b'>
                        <td className='text-center'>Référence</td>
                        <td className='text-center flex flex-nowrap justify-center items-center'><Image src={produit} alt='product image' height={220} width={240} layout='fixed'  objectFit="contain" objectPosition="center" /> <span>Produit</span></td>
                        <td className='text-center text-sm font-medium text-zinc-500' colSpan={2}>Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.</td>
                        <td className='text-center'>Taille</td>
                        <td className='text-center'><input type="number" name="produit" value="1" className='w-20 text-center border border-zinc-400 rounded-lg'/></td>
                        <td><p className='text-center text-zinc-600 hover:bg-third hover:text-white hover:cursor-pointer hover:scale-110 bg-zinc-200 rounded-full w-fit h-fit mx-auto px-2'>X</p></td>
                        </tr>
                    </tbody>
                </table>
                <form className='w-1/2 h-fit bg-trendy ml-32 grid'>
                    <input type="text" name="" value="" className='w-11/12 h-10 mx-auto outline-none my-5 rounded-md'/>
                    <input type="text" name="" value="" className='w-11/12 h-10 mx-auto outline-none my-5 rounded-md'/>
                    <input type="text" name="" value="" className='w-11/12 h-10 mx-auto outline-none my-5 rounded-md'/>
                    <input type="text" name="" value="" className='w-11/12 h-10 mx-auto outline-none my-5 rounded-md'/>
                    <input type="text" name="" value="" className='w-11/12 h-10 mx-auto outline-none my-5 rounded-md'/>
                </form>
            <Footer/>
        </div>
            
        )
}