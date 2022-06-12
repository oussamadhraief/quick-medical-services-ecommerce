import { useEffect, useState } from "react"
import emailjs from '@emailjs/browser';
import Modal from "./Modal";
import Notification from "./Notification";
import { useSession } from "next-auth/react"


export default function OrderForm(props){
    const { data: session, status } = useSession()


    const [orderForm, setOrderForm] = useState({name: '',phone: '',email: '',clinicName: '',taxRegistrationNumber: '',note : '', address: '',address2: '', city: '',city2: '', country: '',country2: '', zipCode: '',zipCode2: ''})
    const [seperateAdresses,setSeperateAdresses] = useState(false)
    const [show,setShow] = useState(false)
    const [showNotification,setShowNotification] = useState(false)
    const [message,setMessage] = useState('')

    useEffect(() => {
        if(session){
        if (session.user.address.length == 0) {

                setOrderForm({
                    ...orderForm,
                    name: session.user.name,
                    phone: session.user.phone,
                    email: session.user.email
                })
            }
    
          if (session.user.address.length == 1) {
            setOrderForm({
              ...OrderForm,
              address: session.user.address[0],
              city: session.user.city[0],
              country: session.user.country[0],
              zipCode: session.user.zipCode[0],
              name: session.user.name,
              phone: session.user.phone,
              email: session.user.email
            })
          }
    
          if (session.user.address.length == 2) {
            setSeperateAdresses(true)
            setOrderForm({
              ...orderForm,
              address: session.user.address[0],
              city: session.user.city[0],
              country: session.user.country[0],
              zipCode: session.user.zipCode[0],
              address2: session.user.address[1],
              city2: session.user.city[1],
              country2: session.user.country[1],
              zipCode2: session.user.zipCode[1],
              name: session.user.name,
              phone: session.user.phone,
              email: session.user.email
            })
        }}
    },[])

    const handleChange = (e) => {
        setOrderForm({
            ...orderForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setShow(true)
    }

    const handleMakeOrder = async () => {
        props.setBiggerLoading(true)
        let orderData = {}
        if(seperateAdresses){
            orderData = {
                ...orderForm,
                address: [orderForm.address,orderForm.address2],
                city: [orderForm.city,orderForm.city2],
                country: [orderForm.country,orderForm.country2],
                zipCode: [orderForm.zipCode,orderForm.zipCode2],
                cart: props.value
            }
        }else{
            orderData = {
                ...orderForm,
                address: [orderForm.address],
                city: [orderForm.city],
                country: [orderForm.country],
                zipCode: [orderForm.zipCode],
                cart: props.value
            }
        }
        delete orderData.address2
        try {
            const res = await fetch('/api/user/makeorder',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify(orderData)
            })
            const {data,user} = await res.json()
            props.setCartNumber(0)
            setOrderForm({name: '',phone: '',email: '',clinicName: '',taxRegistrationNumber: '',note : '', address: '',address2: '', city: '',city2: '', country: '',country2: '', zipCode: '',zipCode2: ''})
            setSeperateAdresses(false)
            emailjs.send("service_gwl2rmp","template_7zya51h",{
                to_name: user.name,
                reference: data._id,
                to_email: data.email,
                },"lKkzd1QChFF2krYAd")
            props.setBiggerLoading(false)
            setShowNotification(false)
            setMessage('Votre commande a été bien reçue')
            setShowNotification(true)
        } catch (error) {
            props.setBiggerLoading(false)
            console.error(error);
        }
    }

    return(
        <form onSubmit={e => handleSubmit(e)} className='w-full md:w-6/12 xl:w-5/12 px-0 md:px-5 py-10 bg-white grid min-w-[340px]'>
                    <p className='w-fit h-fit text-3xl font-medium whitespace-nowrap mx-auto mb-5'>Passer <span className="border-b-2 border-pinky">une commande</span>  </p>
                    <p></p>
                    <input required type="text" name="name" onChange={e => handleChange(e)} value={orderForm.name} className='my-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Nom et prénom'/>

                    <input required type="number" name="phone" onChange={e => handleChange(e)} value={orderForm.phone} className='my-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Num. de  téléphone'/>
                    
                    <label className='w-11/12 mx-auto font-medium text-sm mt-5 hover:cursor-pointer flex flex-nowrap gap-1 items-center mb-1'>
                    <input type="checkbox" checked={seperateAdresses} name="seperate" onChange={e => {
                        setSeperateAdresses(prevSeperateAdresses => !prevSeperateAdresses)
                    }} value="seperated" className='hover:cursor-pointer' /> <p>Séparer l&apos;adresse de livraison et l&apos;adresse de facturation</p> 
                    </label>

                    {seperateAdresses ? <p className='w-11/12 mx-auto font-medium text-sm mt-1'>Adresse de <span className='border-b border-pinky'>livraison</span> :</p> : <p className='w-11/12 mx-auto font-medium text-sm mt-1'>Adresse de <span className='border-b border-pinky'>livraison et de facturation</span> :</p>}
                    <input required type="text" name="address" onChange={e => handleChange(e)} value={orderForm.address} className='mainAdress mb-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Adresse'/>
                    <input required type="text" name="city" onChange={e => handleChange(e)} value={orderForm.city} className='mainAdress mb-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Ville'/>
                    <input required type="text" name="country" onChange={e => handleChange(e)} value={orderForm.country} className='mainAdress mb-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Pays'/>
                    <input required type="number" name="zipCode" onChange={e => handleChange(e)} value={orderForm.zipCode} className='mainAdress mb-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Code postal'/>

                    {seperateAdresses ? <p className='w-11/12 mx-auto mt-5 font-medium text-sm'>Adresse de <span className='border-b border-pinky'>facturation</span>:</p> : null}
                    {seperateAdresses ? <input required type="text" name="address2" onChange={e => handleChange(e)} value={orderForm.address2} className='mb-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Adresse'/> : null}
                    {seperateAdresses ? <input required type="text" name="city2" onChange={e => handleChange(e)} value={orderForm.city2} className='mb-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Ville'/> : null}
                    {seperateAdresses ? <input required type="text" name="country2" onChange={e => handleChange(e)} value={orderForm.country2} className='mb-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Pays'/> : null}
                    {seperateAdresses ? <input required type="number" name="zipCode2" onChange={e => handleChange(e)} value={orderForm.zipCode2} className='mb-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Code postal'/> : null}
                    
                    
                    <input required type="text" name="clinicName" onChange={e => handleChange(e)} value={orderForm.clinicName} className='my-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Nom de clinique'/>
                    
                    <input required type="text" name="taxRegistrationNumber" onChange={e => handleChange(e)} value={orderForm.taxRegistrationNumber} className='my-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Matricule fiscale'/>
                    
                    <input required type="email" name="email" onChange={e => handleChange(e)} value={orderForm.email} className='my-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Email'/>

                    <textarea className='my-5 h-fit min-h-[100px] w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' onChange={e => handleChange(e)} value={orderForm.note} placeholder='Message (facultatif)' col={50} row={4} name='note' />
                        
                    {props.value.length > 0 ? <button type="submit" className='mx-auto mt-10 w-fit h-fit bg-na3ne3i shadow-[0px_3px_10px_rgba(25,98,102,0.8)] text-white whitespace-nowrap font-medium px-3 py-2 rounded-xl hover:scale-105 transition-all'>Confirmer ma commande</button> : <button type="submit" disabled className='mx-auto mt-10 w-fit h-fit bg-zinc-400 text-white whitespace-nowrap font-medium px-3 py-2 rounded-xl hover:cursor-not-allowed transition-all'>Confirmer ma commande</button>}
                    <Modal show={show} onClose={() => setShow(false)} onConfirm={() => handleMakeOrder()} action={'add'} content={'Êtes-vous sûr de vouloir passer cette commande?'} />
                    <Notification show={showNotification} setShow={setShowNotification} message={message} />
                </form>
    )
}