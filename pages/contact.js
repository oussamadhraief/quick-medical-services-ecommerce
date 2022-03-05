import Header from '../components/Header'
import Footer from '../components/Footer'
import { CategoriesContext } from "../utils/CategoriesContext"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"


export default function Contact() {

    const facebook = 'pfe/facebook_dryelz.png'
    const location = 'pfe/location_nkg5e0.png'

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [subject,setSubject] = useState('')
    const [message,setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const formInputs = {name,email,phone,subject,message}
        console.log(formInputs)
    }


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
            <div className="flex w-3/4  mx-auto  shadow-form mt-20 rounded-2xl">
                <div className="w-1/2 backgroundAnimated mx-auto ">
                    
                    <div className="w-9/12 mx-auto mt-12 mb-8">
                        <h1 className="text-white text-4xl font-bold">Contact us</h1> 
                        <hr className="w-4/12"/>
                        <p className="text-white text-md mt-2 font-medium"> dont hesitate to contact us , we're open for suggestion</p> 
                    </div>
                    
                    <div className="w-9/12 mx-auto space-y-4 ">
                        <Link href='https://www.facebook.com/QMSJRIBI'>
                            <a target='_blank' className="flex text-white items-center flex-nowrap whitespace-nowrap font-medium"><Image src={facebook} alt='facebook' width={18} height={18} layout='fixed' />&nbsp;&nbsp;&nbsp;Facebook: QUICK Medical services</a>
                        </Link>

                        <p className="whitespace-nowrap text-white font-medium ">&#x2709;&nbsp;&nbsp; Email: qms.jribi@gmail.com</p>

                        <p className="whitespace-nowrap text-white font-medium">&#x260E;&nbsp;&nbsp; Tel: +216 44 219 218</p>
                         
                    </div>
                </div>

                    <form className="w-1/2 h-full bg-white my-12 space-y-5" onSubmit={handleSubmit}>
                        <div className="relative mx-auto w-11/12 h-fit">
                            <input className="form-input invalid:border-red-500 peer invalid:text-red-500" placeholder=" " type="text" name="name" id="formName" minLength={4} value={name} onChange={(e)=>setName(e.target.value)}  />
                            <label className="form-label"  for="formName">Nom et Prénom</label>
                        </div>
                        <div className="relative mx-auto w-11/12 h-fit">
                            <input className="form-input invalid:border-red-500 peer invalid:text-red-500" placeholder=" " type="email" name="email" id="formEmail" value={email} onChange={(e)=>setEmail(e.target.value)}  />
                            <label className="form-label" for="formEmail">Email</label>
                        </div>
                        <div className="relative mx-auto w-11/12 h-fit">
                            <input className="form-input invalid:border-red-500 peer invalid:text-red-500" placeholder=" " type="tel" name="phoneNumber" id="formPhoneNumber" value={phone} onChange={(e)=>setPhone(e.target.value)}  />
                            <label className="form-label" for="formPhoneNumber">Num. de téléphone</label>
                        </div>
                        <div className="relative mx-auto w-11/12 h-fit">
                            <input className="form-input invalid:border-red-500 peer invalid:text-red-500" placeholder=" " type="text" name="subject" id="formSubject" value={subject} onChange={(e)=>setSubject(e.target.value)}  />
                            <label className="form-label" for="formSubject">Sujet</label>
                        </div>
                        <div className="relative mx-auto w-11/12 h-fit">
                            <textarea className="h-32 form-input invalid:border-red-500 peer invalid:text-red-500" placeholder=" " col={50} row={4} name="textArea" id="formTextArea" value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
                            <label className="form-label" for="formTextArea">Message</label>
                        </div>
                        <button className="flex text-white px-3 py-1 mx-auto bg-gradient-to-br from-icy to-trendy shadow-btn" type="submit">Envoyer </button>
                    </form>
                </div>
            <Footer/>
        </div>
            
        )
}