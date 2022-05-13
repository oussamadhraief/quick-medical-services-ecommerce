import { useState } from "react"


export default function OrderForm(props){

    const [orderForm, setOrderForm] = useState({name: '',phone: '',email: '',clinicName: '',taxRegistrationNumber: '',note : '', address: '',address2: ''})
    const [seperateAdresses,setSeperateAdresses] = useState(false)


    const handleChange = (e) => {
        setOrderForm({
            ...orderForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let orderData = {}
        if(seperateAdresses){
            orderData = {
                ...orderForm,
                address: [orderForm.address,orderForm.address2],
                cart: props.value
            }
        }else{
            orderData = {
                ...orderForm,
                address: [orderForm.address],
                cart: props.value
            }
        }
        delete orderData.address2
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

    return(
        <form onSubmit={e => handleSubmit(e)} className='w-5/12 px-5 py-10 bg-white grid min-w-[340px]'>
                    <p className='w-fit h-fit text-3xl font-medium whitespace-nowrap mx-auto mb-5'>Passer <span className="border-b-2 border-orange">une commande</span>  </p>
                    <p></p>
                    <input required type="text" name="name" onChange={e => handleChange(e)} value={orderForm.name} className='my-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Nom et prénom'/>

                    <input required type="number" name="phone" onChange={e => handleChange(e)} value={orderForm.phone} className='my-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Num. de téléphone'/>
                    
                    <label className='w-11/12 mx-auto font-medium text-sm mt-5 hover:cursor-pointer flex flex-nowrap items-center mb-1'>
                    <input type="checkbox" checked={seperateAdresses} name="seperate" onChange={e => {
                        setSeperateAdresses(prevSeperateAdresses => !prevSeperateAdresses)
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
                        
                    <button type="submit" className='mx-auto mt-10 w-fit h-fit bg-na3ne3i text-white whitespace-nowrap font-medium px-3 py-2 rounded-xl hover:bg-orange hover:text-black hover:scale-105 transition-all'>Confirmer ma commande</button>

                </form>
    )
}