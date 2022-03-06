import Header from '../components/Header'
import Footer from '../components/Footer'
import { CategoriesContext } from "../utils/CategoriesContext"
import { useEffect, useState } from "react"
import Image from "next/image"
import { SearchContext } from "../utils/SearchContext"
import Link from "next/link"


export default function Contact() {

    const facebook = 'pfe/facebook_dryelz.png'
    const location = 'pfe/location_nkg5e0.png'

    const [categoriesAndSubcategories,setCategoriesAndSubcategories] = useState([])
    const [search,setSearch] = useState('')
    const [formData,setFormData] = useState({name: "", email: "", phoneNumber: "", subject: "", message: "" })
    

    const handleChange = (e) => {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [e.target.name] : e.target.value
            }
        })
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
        const formInputs = {...formData , isRead :false , isReview :false}
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formInputs)
        })}
        catch(error){
            console.error(error)
        }
        
    }
    
    return(
        
        <div>
            <CategoriesContext.Provider value={{ categoriesAndSubcategories,setCategoriesAndSubcategories }} >
            <SearchContext.Provider value={{search,setSearch}} >
                <Header landingPage={false} />
            </SearchContext.Provider>
            </CategoriesContext.Provider>
            <div className="flex w-3/4  mx-auto  shadow-form mt-20 rounded-2xl">
                <div className="w-1/2 backgroundAnimated mx-auto ">
                    
                    <div className="w-9/12 mx-auto mt-12 mb-8">
                        <h1 className="text-white text-4xl font-bold">Contact us</h1> 
                        <hr className="w-4/12"/>
                        <p className="text-white text-md mt-2 font-medium"> dont hesitate to contact us , were open for suggestion</p> 
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
                            <input className="form-input invalid:border-red-500 peer invalid:text-red-500" placeholder=" " type="text" name="name" id="formName" value={formData.name} minLength={4}  onChange={handleChange}/>
                            <label className="form-label"  htmlFor="formName">Nom et Prénom</label>
                        </div>
                        <div className="relative mx-auto w-11/12 h-fit">
                            <input className="form-input invalid:border-red-500 peer invalid:text-red-500" placeholder=" " type="email" name="email" id="formEmail" value={formData.email} onChange={handleChange} />
                            <label className="form-label" htmlFor="formEmail">Email</label>
                        </div>
                        <div className="relative mx-auto w-11/12 h-fit">
                            <input className="form-input invalid:border-red-500 peer invalid:text-red-500 appearance" placeholder=" " type="number" name="phoneNumber" id="formPhoneNumber" value={formData.phone} onChange={handleChange} />
                            <label className="form-label" htmlFor="formPhoneNumber">Num. de téléphone</label>
                        </div>
                        <div className="relative mx-auto w-11/12 h-fit">
                            <input className="form-input invalid:border-red-500 peer invalid:text-red-500" placeholder=" " type="text" name="subject" id="formSubject" value={formData.subject} onChange={handleChange} />
                            <label className="form-label" htmlFor="formSubject">Sujet</label>
                        </div>
                        <div className="relative mx-auto w-11/12 h-fit">
                            <textarea className="h-32 form-input invalid:border-red-500 peer invalid:text-red-500" placeholder=" " col={50} row={4} name="message" id="formTextArea" value={formData.message} onChange={handleChange}></textarea>
                            <label className="form-label" htmlFor="formTextArea">Message</label>
                        </div>
                        <button className="flex text-white px-3 py-1 mx-auto bg-gradient-to-br from-icy to-trendy shadow-btn" type="submit">Envoyer </button>
                    </form>
                </div>
            <Footer/>
        </div>
            
        )
}