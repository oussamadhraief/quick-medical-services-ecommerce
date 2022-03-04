import Header from '../components/Header'
import Footer from '../components/Footer'
import { CategoriesContext } from "../utils/CategoriesContext"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"


export default function Contact() {

    const facebook = 'pfe/facebook_dryelz.png'
    const location = 'pfe/location_nkg5e0.png'

    const [categoriesAndSubcategories,setCategoriesAndSubcategories] = useState([])
    // fetch for teh header
    // useEffect(async () => {
    //     if(value.length < 1 ){
    //         const res = await fetch('/api/products')
    //         const { data } = await res.json()
    //         setValue(data)
    //         let categories = data.map(item => item.category)
    //         categories = [...new Set(categories)]
    //         const orderedStuff = categories.map(item => orderedTable(item,data))
    //         setCategoriesAndSubcategories(orderedStuff)
    //     }
    // },[])
    
    return(
        
        <div>
            {/* <CategoriesContext.Provider value={{ categoriesAndSubcategories,setCategoriesAndSubcategories }} >
                <Header landingPage={false} />
            </CategoriesContext.Provider> */}
            <div className="flex w-3/4  mx-auto shadow-md mt-20 rounded-2xl">
                <div className="w-1/2 h-full bg-gradient-to-br from-na3ne3i to-light mx-auto ">
                    
                    <div className="w-9/12 mx-auto mt-12 mb-8">
                        <h1 className="text-white text-3xl">Contact us</h1> 
                        <hr className="w-4/12"/>
                        <p className="text-white text-sm"> dont hesitate to contact us , we're open for suggestion</p> 
                    </div>
                    
                    <div className="w-9/12 mx-auto space-y-4 ">
                        <Link href='https://www.facebook.com/QMSJRIBI'>
                            <a target='_blank' className="flex text-white items-center flex-nowrap whitespace-nowrap"><Image src={facebook} alt='facebook' width={16} height={16} layout='fixed' />&nbsp;&nbsp;&nbsp;Facebook: QUICK Medical services</a>
                        </Link>

                        <p className="whitespace-nowrap text-white ">&#x2709;&nbsp;&nbsp; Email: qms.jribi@gmail.com</p>

                        <p className="whitespace-nowrap text-white">&#x260E;&nbsp;&nbsp; Tel: +216 44 219 218</p>
                            
                        <div className="flex items-center flex-nowrap text-white">
                            <Image src={location} alt='location' width={20} height={20} layout='fixed' />
                            <p className="whitespace-nowrap">&nbsp;&nbsp;Sfax, Tunisie</p>
                        </div>

                    </div>
                </div>
                <div className="w-1/2 h-full bg-white"></div>
                
            </div>
            <Footer/>
        </div>
            
        )
}