import { useContext, useEffect, useState } from 'react'
import LoadingAnimation from './LoadingAnimation'
import SizeSelection from './SizeSelection'
import { LoadingContext } from '../utils/LoadingContext'
import { useRouter } from 'next/router'
import Image from 'next/image'
import 'animate.css'

export default function ModifyProductsView(props){

    const Router = useRouter()

    const {loadingContext,setLoadingContext} = useContext(LoadingContext)
    const [loading,setloading] = useState(false)
    const [open,setOpen] = useState(false)
    const [selectedMessage,setSelectedMessage] = useState(0)

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

    const handleFulfill = async () => {
        setOpen(false)
        setloading(true)
        try {
            
            await fetch('/api/orders/'+props.value[selectedMessage]?._id,{
                method: 'PUT',
                headers:{
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }})
            let temp = props.value
            temp.splice(selectedMessage,1)
            props.setValue(temp)
            setSelectedMessage(0)
        } catch (error) {
            console.error(error)
        }
        setloading(false)
    }

    const handleArchive = async () => {
        setOpen(false)
        setloading(true)
        try {
            await fetch('/api/orders/'+props.value[selectedMessage]?._id,{
                method: 'DELETE',
                headers:{
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }})
            let temp = props.value
            temp.splice(selectedMessage,1)
            props.setValue(temp)
            setSelectedMessage(0)
        } catch (error) {
            console.error(error)
        }
        setloading(false)
    }

   return (
        <div className="screenSize h-full relative w-full flex-col justify-between flex max-h-full overflow-hidden">
            {loadingContext ? <LoadingAnimation key='delete' bgOpacity={false} /> : null}
            <div className='mainScreen w-full bg-[#E7EDEE] flex items-center justify-center relative p-10 flex-auto'>
                <div className='w-7/12 min-w-[300px] min-h-[400px] max-h-[600px] h-fit bg-white shadow-float rounded-md py-7 px-5 overflow-y-auto animate__animated animate__fadeInUp '>
                    {loading ? <LoadingAnimation key='delete' bgOpacity={false} /> : null}
                    <div className='flex justify-between items-center border-b border-zinc-400 pb-1'>
                    <p className='text-sm font-medium text-zinc-600 h-fit'>Cette commande a été passée le <span className='underline'>{`${props.value[selectedMessage]?.createdAt.substr(8,2)} ${Intl.DateTimeFormat('fr', { month: 'long' }).format(new Date(props.value[selectedMessage]?.createdAt.substr(6,2)))} ${props.value[selectedMessage]?.createdAt.substr(0,4)}`}</span>  et elle est actuellement <span className='underline'>{props.value[selectedMessage]?.status}</span>. </p>
                        <div className='flex flex-nowrap gap-2 relative w-36 justify-end'>
                            <button onClick={e => setOpen(prev => !prev)}><Image src={'pfe/icons8-dots-loading-48_lonv7i'} alt='modifier' height={18} width={16} /></button>
                            <div className={open ? 'absolute w-fit h-fit left-0 top-full whitespace-nowrap bg-white rounded py-0.5 shadow-form grid px-1' : 'hidden'}>
                                
                            <button onClick={e => handleFulfill()} className='font-medium text-sm text-third hover:underline border-b py-1'>Marquer comme livrée</button>
                            <button onClick={e => handleArchive()} className='text-sm font-medium text-red-400 underline rounded py-1'>Archiver</button>
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-2 mt-2'>

                    <p className='font-medium text-lg w-full text-center'> <span className='text-na3ne3i underline text-xl'>Référence de la commande:</span>&nbsp; {props.value[selectedMessage]?._id}</p>
                    <p className='font-medium'> <span className='text-na3ne3i text-lg'>Nom et prénom:</span>&nbsp; {props.value[selectedMessage]?.name}</p>
                    <p className='font-medium'> <span className='text-na3ne3i text-lg'>E-mail:</span>&nbsp; {props.value[selectedMessage]?.email}</p>
                    <p className='font-medium'> <span className='text-na3ne3i text-lg'>Num. de téléphone:</span>&nbsp; {props.value[selectedMessage]?.phoneNumber}</p>
                    <p className='text-na3ne3i text-lg font-medium'>Adresses:</p>
                    <div className='w-full flex flex-nowrap justify-around gap-5'>
                        <div className='w-6/12 h-fit border border-na3ne3i px-3 pb-10 pt-1 grid gap-3 font-medium'>
                            <span className='w-full border-b border-pinky'>Adresse de livraison:</span>
                            <p><span className='text-na3ne3i'>Adresse: </span>{props.value[selectedMessage]?.address[0]}</p>
                            <p><span className='text-na3ne3i'>Ville: </span>{props.value[selectedMessage]?.city[0]}</p>
                            <p><span className='text-na3ne3i'>Pays: </span>{props.value[selectedMessage]?.country[0]}</p>
                            <p><span className='text-na3ne3i'>Code postal: </span>{props.value[selectedMessage]?.zipCode[0]}</p>
                         </div>
                         <div className='w-6/12 h-fit border border-na3ne3i px-3 pb-10 pt-1 grid gap-3 font-medium'>
                            <span className='w-full border-b border-pinky'>Adresse de facturation:</span>
                            <p><span className='text-na3ne3i'>Adresse: </span>{props.value[selectedMessage]?.address.length > 1 ? props.value[selectedMessage]?.address[1] : props.value[selectedMessage]?.address[0]}</p>
                            <p><span className='text-na3ne3i'>Ville: </span>{props.value[selectedMessage]?.address.length > 1 ? props.value[selectedMessage]?.city[1] : props.value[selectedMessage]?.city[0]}</p>
                            <p><span className='text-na3ne3i'>Pays: </span>{props.value[selectedMessage]?.address.length > 1 ? props.value[selectedMessage]?.country[1] : props.value[selectedMessage]?.country[0]}</p>
                            <p><span className='text-na3ne3i'>Code postal: </span>{props.value[selectedMessage]?.address.length > 1 ? props.value[selectedMessage]?.zipCode[1] : props.value[selectedMessage]?.zipCode[0]}</p>
                         </div>
                    </div>
                    <p className='font-medium'> <span className='text-na3ne3i text-lg'>Nom de clinique:</span>&nbsp; {props.value[selectedMessage]?.clinicName}</p>
                    <p className='font-medium break-words overflow-hidden'> <span className='text-na3ne3i text-lg'>Matricule fiscale:</span> &nbsp;{props.value[selectedMessage]?.taxRegistrationNumber}</p>
                    <p className='font-medium break-words overflow-hidden'> <span className='text-na3ne3i text-lg'>Message:</span> &nbsp;{props.value[selectedMessage]?.note}</p>
                    <table className='w-full mt-10 px-10'>
                <thead>
                <tr className='border-b h-10 border-zinc-400'>
                  <th className='font-bold'>RÉFÉRENCE</th>
                  <th className='font-bold'>IMAGE</th>
                  <th className='font-bold'>NOM</th>
                  <th className='font-bold'>TAILLE</th>
                  <th className='font-bold'>QUANTITÉ</th>
                </tr>
                </thead>
                <tbody>
                  {props.value[selectedMessage]?.cart.map((item,index) => {return(
                    <tr key={index} className='border-b'>
                      <td className='text-center font-medium'>{item.product.reference}</td>
                      <td className='w-40 h-48'><Image src={item.product.image} alt='image' width={150} height={170}  objectFit="contain" objectPosition="center"  /></td>
                      <td className='text-center font-medium'>{item.product.name}</td>
                      <td className='text-center font-medium'>{props.value[selectedMessage]?.cart[index].size} cm</td>
                      <td className='text-center font-medium'>{props.value[selectedMessage]?.cart[index].quantity}</td>
                    </tr>
                  )})}
                </tbody>
              </table>
              <p className='font-medium text-pinky underline text-lg w-fit mx-auto'>Commande passée par:</p>
              <p className='font-medium'> <span className='text-na3ne3i text-lg'>Nom et prénom:</span>&nbsp; {props.value[selectedMessage]?.user.name}</p>
              <p className='font-medium'> <span className='text-na3ne3i text-lg'>E-mail:</span>&nbsp; {props.value[selectedMessage]?.user.email}</p>
              <p className='font-medium'> <span className='text-na3ne3i text-lg'>Num. de téléphone:</span>&nbsp; {props.value[selectedMessage]?.user.phone}</p>
                    </div>
                </div>
            </div>

            <div className=' w-full relative min-w-full h-60 min-h-60 bg-white flex flex-nowrap items-center overflow-hidden py-10 shadow-form'>
            <button className='relative bg-white w-10 h-full z-[90] font-bold text-2xl' onClick={e => scrollLeft()}><Image src={'pfe/arrow-right-3098_-_Copy_hsxwaz'} alt='arrow' width={30} height={30} layout='fixed' className='hover:scale-x-125' /></button>
            <div className='galleryScroller w-full relative h-60 py-5 min-h-60 bg-white flex flex-nowrap items-center overflow-hidden px-4 gap-10'>
                
                {props.value.map((item,index) => {
                    if(props.value.length == index + 1 ) 
                        return(
                    <div key={index} ref={props.lastElementRef} onClick={e => {
                        setOpen(false)
                        setSelectedMessage(index)
                    }} className='hover:cursor-pointer bg-white shadow-form h-40 px-5 py-3'>
                        <p className='w-80 font-medium text-sm'> <span className='text-base text-emerald-700'>Nom et prénom:</span> {item.name}</p>
                        <p className='w-80 font-medium text-sm'> <span className='text-base text-emerald-700'>E-mail:</span> {item.email}</p>
                        <p className='w-80 font-medium text-sm'> <span className='text-base text-emerald-700'>Référence:</span> {item._id}</p>
                        <p className='w-80 font-medium text-sm'> <span className='text-base text-emerald-700'>Nombre de produits:</span> {item.cart.length}</p>
                        
                    </div>)

                        return (<div key={index} onClick={e => {
                            setOpen(false)
                            setSelectedMessage(index)
                        }} className='hover:cursor-pointer bg-white shadow-form h-40 px-5 py-3'>
                        <p className='w-80 font-medium text-sm'> <span className='text-base text-emerald-700'>Nom et prénom:</span> {item.name}</p>
                        <p className='w-80 font-medium text-sm'> <span className='text-base text-emerald-700'>E-mail:</span> {item.email}</p>
                        <p className='w-80 font-medium text-sm'> <span className='text-base text-emerald-700'>Référence:</span> {item._id}</p>
                        <p className='w-80 font-medium text-sm'> <span className='text-base text-emerald-700'>Nombre de produits:</span> {item.cart.length}</p>
                        
                    </div>)
                })}
           {props.loading ? 
           <div className='h-40 w-32 min-w-[128px] px-5 py-3 relative'>
                <div className='bg-white h-full w-32 rounded-lg overflow-hidden flex items-center absolute left-0 top-0'>
                    <div id="contact-loading" className="w-fit h-fit bg-white/70 mx-auto "></div>
                    <div className="reverse-spinner "></div>
                </div>
             </div> : null}
        </div>
               <button className='relative  bg-white w-10 h-full z-[90] font-bold text-2xl' onClick={e => scrollRight()}><Image src={'pfe/arrow-right-3098_eujgfr'} alt='arrow' width={30} height={30} layout='fixed' className='hover:scale-x-125' /></button>
            </div>
        </div>
    )
}