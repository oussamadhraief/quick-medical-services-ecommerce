import { useContext, useEffect, useState, useRef } from 'react'
import LoadingAnimation from './LoadingAnimation'
import Modal from './Modal'
import Notification from './Notification'
import { LoadingContext } from '../utils/LoadingContext'
import Image from 'next/image'
import 'animate.css'

export default function ModifyProductsView(props){

    const mainScreen = useRef()
    const itemHolder = useRef()

    const {loadingContext,setLoadingContext} = useContext(LoadingContext)
    const [loading,setloading] = useState(false)
    const [open,setOpen] = useState(false)
    const [show,setShow] = useState(false)
    const [show2,setShow2] = useState(false)
    const [selectedMessage,setSelectedMessage] = useState(0)
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

    const handleDisplay = async () => {
        setOpen(false)
        setShow(false)
        setloading(true)
        try {
            const res = await fetch('/api/contact/'+props.value[selectedMessage]._id,{
                method: 'PUT',
                headers:{
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    isReview: !props.value[selectedMessage]?.isReview})
            })
            const {data} = await res.json()
            let temp = props.value
            temp[selectedMessage] = data
            props.setValue(temp)
            setloading(false)
            setShowNotification(false)
            setMessage('Le message a été bien modifié')
            setShowNotification(true)
        } catch (error) {
            console.error(error)
            setloading(false)
        }
    }

    const handleDelete = async () => {
        setOpen(false)
        setShow2(false)
        setLoadingContext(true)
        try {
            await fetch('/api/contact/'+props.value[selectedMessage]._id,{
                method: 'DELETE',
                headers:{
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    isReview: !props.value[selectedMessage]?.isReview})
            })
            let temp = props.value
            temp.splice(selectedMessage,1)
            props.setValue(temp)
            setSelectedMessage(0)
            setLoadingContext(false)
            setShowNotification(false)
            setMessage('Le message a été supprimé')
            setShowNotification(true)
        } catch (error) {
            setLoadingContext(false)
            console.error(error)
        }
    }

 
        
   return (
       <>
       {props.value?.length <1 ?
        <p className="w-full text-center h-fit mx-auto font-medium text-third mt-2">Pas de résultats trouvés :&#x28; ...</p>
           :
        <div ref={mainScreen} className="screenSize h-full relative w-full flex-col justify-between flex max-h-full overflow-hidden">
            {loadingContext ? <LoadingAnimation key='delete' bgOpacity={false} /> : null}
            <Modal show={show} onClose={() => {
                setShow(false)
                setOpen(false)
                }} onConfirm={() => handleDisplay()} action={'add'} content={'Êtes-vous sûr de vouloir modifier ce message?'} />
            <Modal show={show2} onClose={() => {
                setShow2(false)
                setOpen(false)
                }} onConfirm={() => handleDelete()} action={'add'} content={'Êtes-vous sûr de vouloir supprimer ce message?'} />
            <div ref={itemHolder} className='mainScreen w-full bg-harvey flex items-center justify-center relative p-4 lg:p-5 xl:p-10 flex-auto'>
                <div className={loading ? 'w-11/12 md:w-9/12 lg:w-7/12 xl:w-6/12 min-w-[300px]  h-full max-h-[400px] bg-white shadow-float rounded-md py-7 px-5 overflow-hidden animate__animated animate__fadeInUp ' : 'w-11/12 md:w-9/12 lg:w-7/12 xl:w-6/12 min-w-[300px]  h-full max-h-[400px] bg-white shadow-float rounded-md py-7 px-5 overflow-auto animate__animated animate__fadeInUp '}>
                    {loading ? <LoadingAnimation key='delete' bgOpacity={false} /> : null}
                    <div className='flex justify-between items-center border-b border-zinc-400 pb-1'>
                        <p className={props.value[selectedMessage]?.isReview == true ? ' text-emerald-700 bg-emerald-100 px-1 py-0.5 rounded font-medium': ' bg-red-100 text-red-500 px-1 py-0.5 rounded font-medium  h-fit'}>Ce message  <span>{props.value[selectedMessage]?.isReview == true ? 'est affiché' : `n'est pas affiché`}</span>  sur l&apos;écran d&apos;accueil</p>
                        <div className='flex flex-nowrap gap-2 relative w-44 justify-end'>
                            <button onClick={e => setOpen(prev => !prev)}><Image src={'pfe/icons8-dots-loading-48_lonv7i'} alt='modifier' height={18} width={16} /></button>
                            <div className={open ? 'absolute w-fit h-fit right-0 top-full whitespace-nowrap bg-white rounded py-0.5 shadow-form grid px-1' : 'hidden'}>
                                
                            <button onClick={() => {
                                setOpen(false)
                                setShow(true)
                                }} className='font-medium text-sm text-third hover:underline border-b py-1'>{props.value[selectedMessage]?.isReview == true ? 'Retirer de' : 'Afficher sur'}  l&apos;écran d&apos;acceuil</button>
                            <button onClick={e => {
                                setOpen(false)
                                setShow2(true)
                                }} className='text-sm font-medium text-red-400 underline rounded py-1'>Supprimer</button>
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-2 mt-2'>
                    <p className='font-medium'> <span className='text-na3ne3i text-lg'>Nom et prénom:</span>&nbsp; {props.value[selectedMessage]?.name}</p>
                    <p className='font-medium'> <span className='text-na3ne3i text-lg'>E-mail:</span>&nbsp; {props.value[selectedMessage]?.email}</p>
                    <p className='font-medium'> <span className='text-na3ne3i text-lg'>Num. de téléphone:</span>&nbsp; {props.value[selectedMessage]?.phoneNumber}</p>
                    <p className='font-medium'> <span className='text-na3ne3i text-lg'>Sujet:</span>&nbsp; {props.value[selectedMessage]?.subject}</p>
                    <p className='font-medium break-words overflow-hidden'> <span className='text-na3ne3i text-lg'>Message:</span> &nbsp;{props.value[selectedMessage]?.message}</p>
                    </div>
                </div>
            </div>

            <div className=' w-full relative min-w-full h-36 min-h-36 md:h-48 md:min-h-48 bg-white flex flex-nowrap items-center overflow-hidden py-10 shadow-form'>
            <button className='relative bg-white w-10 h-full z-[90] font-bold text-2xl hidden md:block' onClick={e => scrollLeft()}><Image src={'pfe/arrow-right-3098_-_Copy_hsxwaz'} alt='arrow' width={30} height={30} layout='fixed' className='hover:scale-x-125' /></button>
            <div className='galleryScroller w-full relative h-36 min-h-36  md:h-48 py-5 md:min-h-48 bg-white flex flex-nowrap items-center overflow-x-auto overflow-y-hidden md:overflow-hidden px-4 gap-10'>
                
                {props.value.map((item,index) => {
                    if(props.value.length == index + 1 ) 
                        return(
                    <div key={index} ref={props.lastElementRef} onClick={e => {
                        setOpen(false)
                        setSelectedMessage(index)
                    }} className='hover:cursor-pointer bg-white shadow-form max-h-28 h-28 md:h-36 md:max-h-36 p-1 md:px-5 md:py-3 rounded'>
                        <p className='w-60 md:w-80 font-medium text-sm'> <span className='text-base text-emerald-700'>Nom et prénom:</span> {item.name}</p>
                        <p className='w-60 md:w-80 font-medium text-sm'> <span className='text-base text-emerald-700'>E-mail:</span> {item.email}</p>
                        <p className='w-60 md:w-80 font-medium text-sm overflow-hidden max-h-14 md:max-h-20'> <span className='text-base text-emerald-700'>Message:</span> {item.message}</p>
                        
                    </div>)

                        return (<div key={index} onClick={e => {
                            setOpen(false)
                            setSelectedMessage(index)
                        }} className='hover:cursor-pointer bg-white shadow-form max-h-28 h-28 md:h-36 md:max-h-36 p-1 md:px-5 md:py-3 rounded'>
                        <p className='w-60 md:w-80 font-medium text-sm'> <span className='text-base text-emerald-700'>Nom et prénom:</span> {item.name}</p>
                        <p className='w-60 md:w-80 font-medium text-sm'> <span className='text-base text-emerald-700'>E-mail:</span> {item.email}</p>
                        <p className='w-60 md:w-80 font-medium text-sm overflow-hidden max-h-14 md:max-h-20'> <span className='text-base text-emerald-700'>Message:</span> {item.message}</p>
                        
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
        </div>}
        <Notification show={showNotification} setShow={setShowNotification} message={message} />

        </>
    )
}