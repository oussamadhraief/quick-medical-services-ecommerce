import { useContext, useState,useEffect,useRef } from 'react'
import LoadingAnimation from './LoadingAnimation'
import Modal from './Modal'
import Notification from './Notification'
import { LoadingContext } from '../utils/LoadingContext'
import { useRouter } from 'next/router'
import Image from 'next/image'
import 'animate.css'
import emailjs from '@emailjs/browser';

export default function QuotesTable(props){

    const mainScreen = useRef()
    const itemHolder = useRef()

    const {loadingContext,setLoadingContext} = useContext(LoadingContext)
    const [loading,setloading] = useState(false)
    const [open,setOpen] = useState(false)
    const [show,setShow] = useState(false)
    const [show2,setShow2] = useState(false)
    const [show3,setShow3] = useState(false)
    const [selectedMessage,setSelectedMessage] = useState(0)
    const [response,setResponse] = useState({price: 0,message: ''})
    const [showNotification,setShowNotification] = useState(false)
    const [message,setMessage] = useState('')

    useEffect(() => {
        const mq1 = window.matchMedia("(max-width: 767px)")
        if(mq1.matches){
            itemHolder.current.style.height = (mainScreen.current.offsetHeight - 168) + 'px'
             
        }else{
            itemHolder.current.style.height = (mainScreen.current.offsetHeight - 232) + 'px'
             
        }
    })

    const scrollLeft = () => {
        const galleryScroller = document.querySelector(".galleryScroller")
        const screenSize = document.querySelector(".screenSize")
        galleryScroller.scroll(galleryScroller.scrollLeft - screenSize.offsetWidth,0)
    }

    const scrollRight = () => {
        const screenSize = document.querySelector(".screenSize")
        const galleryScroller = document.querySelector(".galleryScroller")
        galleryScroller.scroll(galleryScroller.scrollLeft + screenSize.offsetWidth,0)
    }

    const handleChange = (e) => {
        
        setResponse({
            ...response,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setShow3(true)
    }

    const handleRespond = async () => {
        setloading(true)
        try {
            const res =await fetch('/api/quoterequests/'+props.value[selectedMessage]?._id,{
                method: 'PUT',
                headers:{
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    ...response,
                    price: parseInt(response.price)
                })
        })
            const {data}  = await res.json()
            let temp = props.value
            temp.splice(selectedMessage,1)
            props.setValue(temp)
            setSelectedMessage(0)
            setShow(false)
            setResponse({price: 0,message: ''})
            emailjs.send("service_1hznxbq","template_0hjf7ac",{
                to_name: data.user.name,
                reference: data._id,
                variable: "https://pfeeeeeee.vercel.app",
                to_email: data.email,
                },"Ripm8PZ2lXtT3znlf")
            setloading(false)
            setShowNotification(false)
            setMessage('La réponse a été envoyée')
            setShowNotification(true)
        } catch (error) {
            console.error(error)
            setloading(false)
        }
    } 

    const handleArchive = async () => {
        setloading(true)
        try {
            const res= await fetch('/api/quoterequests/'+props.value[selectedMessage]?._id,{
                method: 'DELETE',
                headers:{
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }})
         const {data}  = await res.json()

            let temp = props.value
            temp.splice(selectedMessage,1)
            props.setValue(temp)
            setSelectedMessage(0)
            emailjs.send("service_rtugv3n","template_jxj8z6m",{
                to_name: data.user.name,
                reference: data._id,
                variable: "https://pfeeeeeee.vercel.app",
                to_email: data.email,
                },"KHMkvXV1QAlRiuEGH")
            setloading(false)
            setShowNotification(false)
            setMessage('La demande de devis a été archivée')
            setShowNotification(true)
        } catch (error) {
            console.error(error)
            setloading(false)
        }
    }


   return (
    <>
    {props.value?.length <1 ?
    <p className="w-full text-center h-fit mx-auto font-medium text-third mt-2">Pas de résultats trouvés :&#x28; ...</p>
       :
        <div ref={mainScreen} className="screenSize h-full relative w-full flex-col justify-between flex max-h-full overflow-hidden">
            {loadingContext ? <LoadingAnimation key='delete' bgOpacity={false} /> : null}
            <Modal show={show3} onClose={() => {
                setShow3(false)
                setOpen(false)
                }} onConfirm={() => handleRespond()} action={'add'} content={'Êtes-vous sûr de vouloir envoyer cette réponse?'} />
            <Modal show={show2} onClose={() => {
                setShow2(false)
                setOpen(false)
            }} onConfirm={() => handleArchive()} action={'delete'} content={'Êtes-vous sûr de vouloir archiver cette demande de devis?'} />
            <div ref={itemHolder} className='mainScreen w-full bg-harvey flex items-center justify-center relative p-4 lg:p-5 xl:p-10 flex-auto'>
                <div className={loading ? 'w-full lg:w-11/12 xl:w-9/12 min-w-[300px] h-full bg-white shadow-float rounded-md py-7 px-5 overflow-hidden animate__animated animate__fadeInUp ' : 'w-full lg:w-11/12 xl:w-9/12 min-w-[300px] h-full bg-white shadow-float rounded-md py-7 px-5 overflow-x-auto md:overflow-x-hidden overflow-y-auto animate__animated animate__fadeInUp '}>
                    {loading ? <LoadingAnimation key='delete' bgOpacity={false} /> : null}
                    <div className='flex justify-between items-center border-b border-zinc-400 pb-1'>
                    <p className='text-sm font-medium text-zinc-600 h-fit'>Cette demande de devis a été passée le <span className='underline'>{`${props.value[selectedMessage]?.createdAt.substr(8,2)} ${Intl.DateTimeFormat('fr', { month: 'long' }).format(new Date(props.value[selectedMessage]?.createdAt.substr(6,2)))} ${props.value[selectedMessage]?.createdAt.substr(0,4)}`}</span>  et elle est actuellement <span className='underline'>{props.value[selectedMessage]?.status}</span>. </p>
                    {props.value[selectedMessage]?.status != 'En cours' ? null :

                    
                        <div className='flex flex-nowrap gap-2 relative w-36 justify-end'>
                            <button onClick={e => setOpen(prev => !prev)}><Image src={'pfe/icons8-dots-loading-48_lonv7i'} alt='modifier' height={18} width={16} /></button>
                            <div className={open ? 'absolute w-fit h-fit right-0 top-full whitespace-nowrap bg-white rounded py-0.5 shadow-form grid px-1' : 'hidden'}>
                                
                            <button onClick={e => {
                                setShow(prev => !prev)
                                setOpen(false)
                                }} className='font-medium text-sm text-third hover:underline border-b py-1'>{show ? 'Annuler' : "Répondre à la demande"}</button>
                            <button onClick={() => {
                                setShow2(true)
                                setOpen(false)
                                }} className='text-sm font-medium text-red-400 underline rounded py-1'>Archiver</button>
                            </div>
                        </div>}
                    </div>
                    <div className='grid gap-2 mt-2'>

                    <p className='font-medium text-lg w-full text-center'> <span className='text-na3ne3i underline text-xl'>Référence de la demande de devis:</span>&nbsp; {props.value[selectedMessage]?._id}</p>
                    {show ? <form onSubmit={e => handleSubmit(e)} className='w-full border border-na3ne3i p-5 grid'>
                        <label  className='grid text-na3ne3i font-medium'>
                                Prix en TND:
                        <input type="number" name="price" required value={response.price} onChange={e => handleChange(e)} className='outline-none border-b border-pinky  w-72' />
                        </label>
                        <label className='grid text-na3ne3i mt-3 font-medium'>
                               Message:  
                        <textarea
                            className='h-20 bg-transparent form-input border-b border-pinky  outline-none'
                            required
                            col={50}
                            maxLength='400'
                            row={4}
                            name='message'
                            value={response.message}
                            onChange={e => handleChange(e)}
                        />
                        </label>
                        <div className='w-fit h-fit flex flex-nowrap items-center gap-3'>
                            
                        <button type="submit" className='px-5 py-1 rounded w-fit h-fit bg-pinky shadow-[0px_3px_10px_rgba(247,177,162,0.5)] text-white mt-5 hover:scale-110 transition-all'>Envoyer</button>
                        <button onClick={e => setShow(false)} type="button" className='rounded w-fit h-fit  text-third hover:underline mt-5'>annuler</button>
                        </div>
                    </form> : null}
                    <p className='font-medium'> <span className='text-na3ne3i text-lg'>Nom et prénom:</span>&nbsp; {props.value[selectedMessage]?.name}</p>
                    <p className='font-medium'> <span className='text-na3ne3i text-lg'>E-mail:</span>&nbsp; {props.value[selectedMessage]?.email}</p>
                    <p className='font-medium'> <span className='text-na3ne3i text-lg'>Num. de téléphone:</span>&nbsp; {props.value[selectedMessage]?.phoneNumber}</p>
                    <p className='font-medium break-words overflow-hidden'> <span className='text-na3ne3i text-lg'>Message:</span> &nbsp;{props.value[selectedMessage]?.note}</p>
                    {
                    props.value[selectedMessage]?.price != null && props.value[selectedMessage]?.message != null ? 
                    <>
                    <p className='w-fit font-medium text-pinky underline'>Réponse de l&apos;administrateur:</p>
                    <p className='font-medium'> <span className='text-na3ne3i text-lg'>Prix:</span>&nbsp; {props.value[selectedMessage]?.price}</p>
                    <p className='font-medium break-words overflow-hidden'> <span className='text-na3ne3i text-lg'>Message:</span> &nbsp;{props.value[selectedMessage]?.message}</p>
                    </>
                    : null
                    }
                    <table className='w-fit min-w-full md:w-full mt-10 px-10'>
                <thead>
                <tr className='border-b h-10 border-zinc-400'>
                  <th className='font-bold'>RÉFÉRENCE</th>
                  <th className='font-bold'>IMAGE</th>
                  <th className='font-bold'>NOM</th>
                  <th className='font-bold'>TAILLE</th>
                  <th className='font-bold px-2'>QUANTITÉ</th>
                </tr>
                </thead>
                <tbody>
                  {props.value[selectedMessage]?.cart.map((item,index) => {return(
                    <tr key={index} className='border-b'>
                      <td className='text-center font-medium px-2'>{item.product.reference}</td>
                      <td className='w-40 h-48 px-2'><Image src={item.product.image} alt='image' width={150} height={170} layout='fixed'  objectFit="contain" objectPosition="center"  /></td>
                      <td className='text-center font-medium px-2'>{item.product.name}</td>
                      <td className='text-center font-medium px-2'>{props.value[selectedMessage]?.cart[index].size} cm</td>
                      <td className='text-center font-medium px-2'>{props.value[selectedMessage]?.cart[index].quantity}</td>
                    </tr>
                  )})}
                </tbody>
              </table>
              <p className='font-medium text-pinky underline text-lg w-fit mx-auto'>Demande de devis effectuée par:</p>
              <p className='font-medium'> <span className='text-na3ne3i text-lg'>Nom et prénom:</span>&nbsp; {props.value[selectedMessage]?.user.name}</p>
              <p className='font-medium'> <span className='text-na3ne3i text-lg'>E-mail:</span>&nbsp; {props.value[selectedMessage]?.user.email}</p>
              <p className='font-medium'> <span className='text-na3ne3i text-lg'>Num. de téléphone:</span>&nbsp; {props.value[selectedMessage]?.user.phone}</p>
                    </div>
                </div>
            </div>

            <div className=' w-full relative min-w-full h-36 min-h-36 md:h-48 md:min-h-48 bg-white flex flex-nowrap items-center overflow-hidden py-2 md:py-10 shadow-form'>
            <button className='relative bg-white w-10 h-full z-[90] font-bold hidden md:block text-2xl' onClick={e => scrollLeft()}><Image src={'pfe/arrow-right-3098_-_Copy_hsxwaz'} alt='arrow' width={30} height={30} layout='fixed' className='hover:scale-x-125' /></button>
            <div className='galleryScroller w-full relative py-1 md:py-5 h-36 min-h-36 md:h-48 md:min-h-48 bg-white flex flex-nowrap items-center overflow-x-auto overflow-y-hidden md:overflow-hidden px-4 gap-10'>
                
                {props.value.map((item,index) => {
                    if(props.value.length == index + 1 ) 
                        return(
                    <div key={index} ref={props.lastElementRef} onClick={e => {
                        setOpen(false)
                        setSelectedMessage(index)
                        setShow(false)
                        setResponse({price: 0,message: ''})
                    }} className='hover:cursor-pointer bg-white shadow-form h-28 md:h-36 p-1 md:px-5 md:py-3 rounded'>
                        <p className='w-60 md:w-80 font-medium text-sm'> <span className='text-sm md:text-base text-emerald-700'>Nom et prénom:</span> {item.name}</p>
                        <p className='w-60 md:w-80 font-medium text-sm'> <span className='text-sm md:text-base text-emerald-700'>E-mail:</span> {item.email}</p>
                        <p className='w-60 md:w-80 font-medium text-sm'> <span className='text-sm md:text-base text-emerald-700'>Référence:</span> {item._id}</p>
                        
                    </div>)

                        return (<div key={index} onClick={e => {
                            setOpen(false)
                            setSelectedMessage(index)
                            setShow(false)
                            setResponse({price: 0,message: ''})
                        }} className='hover:cursor-pointer bg-white shadow-form h-28 md:h-36 p-1 md:px-5 md:py-3 rounded'>
                        <p className='w-60 md:w-80 font-medium text-sm'> <span className='text-sm md:text-base text-emerald-700'>Nom et prénom:</span> {item.name}</p>
                        <p className='w-60 md:w-80 font-medium text-sm'> <span className='text-sm md:text-base text-emerald-700'>E-mail:</span> {item.email}</p>
                        <p className='w-60 md:w-80 font-medium text-sm'> <span className='text-sm md:text-base text-emerald-700'>Référence:</span> {item._id}</p>
                        
                    </div>)
                })}
           {props.loading ? 
           <div className='h-36 w-32 min-w-[128px] px-5 py-3 relative'>
                <div className='bg-white h-full w-32 rounded-lg overflow-hidden flex items-center absolute left-0 top-0'>
                    <div id="contact-loading" className="w-fit h-fit bg-white/70 mx-auto "></div>
                    <div className="reverse-spinner "></div>
                </div>
             </div> : null}
        </div>
               <button className='relative  bg-white w-10 h-full z-[90] font-bold text-2xl hidden md:block' onClick={e => scrollRight()}><Image src={'pfe/arrow-right-3098_eujgfr'} alt='arrow' width={30} height={30} layout='fixed' className='hover:scale-x-125' /></button>
            </div>
        </div>
    }
            <Notification show={showNotification} setShow={setShowNotification} message={message} />
    </>
    )
}