import { useState } from "react"

export default function OrderForm(props){

    const [estimateForm, setEstimateForm] = useState({name: '',phone: '',email: '',note : ''})

    const handleChange = (e) => {
        setEstimateForm({
            ...estimateForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const estimateData= {
            ...estimateForm,
            cart: props.value
        }
        const res = await fetch('/api/user/makeestimaterequest',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(estimateData)
        })
        const { user } = await res.json()
        console.log(user);
    }
    
    return(
        <form onSubmit={e => handleSubmit(e)} className='w-5/12 h-fit px-5 py-10 bg-white grid min-w-[340px]'>
                    <p className='w-fit h-fit text-3xl font-medium whitespace-nowrap mx-auto mb-5'>Demander <span className="border-b-2 border-orange">un devis</span>  </p>
                    <p></p>
                    <input required type="text" name="name" onChange={e => handleChange(e)} value={estimateForm.name} className='my-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Nom et prénom'/>

                    <input required type="number" name="phone" onChange={e => handleChange(e)} value={estimateForm.phone} className='my-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Num. de téléphone'/>
                    
                    <input required type="email" name="email" onChange={e => handleChange(e)} value={estimateForm.email} className='my-5 h-10 w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' placeholder='Email'/>

                    <textarea className='my-5 h-fit min-h-[100px] w-11/12 mx-auto border-zinc-400 border-b outline-none bg-transparent' onChange={e => handleChange(e)} value={estimateForm.note} placeholder='Message (facultatif)' col={50} row={4} name='note' />
                    {props.value.length > 0 ? <button type="submit" className='mx-auto mt-10 w-fit h-fit bg-orange text-white whitespace-nowrap font-medium px-3 py-2 rounded-xl hover:bg-orange hover:text-black hover:scale-105 transition-all'>Confirmer ma demande</button> : <button disabled type="submit" className='mx-auto mt-10 w-fit h-fit bg-zinc-400 text-white whitespace-nowrap font-medium px-3 py-2 rounded-xl hover:cursor-not-allowed '>Confirmer ma demande</button>}
                    <p className="text-xs mt-10 text-zinc-400 w-11/12 mx-auto">Veuillez visiter votre historique des devis dans les prochaines 48 heures, vous-y trouverez une réponse.</p>

                </form>
    )
}