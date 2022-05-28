import { useContext, useEffect, useState } from 'react'
import AdminProducts from './AdminProducts'
import PagesNavigator from './PagesNavigator'
import AddProductView from './AddProductView'
import LoadingAnimation from './LoadingAnimation'
import { LoadingContext } from '../utils/LoadingContext'
import { PageSelectionContext } from '../utils/PageSelectionContext'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function ModifyProductsView(props){

    const Router = useRouter()

    const {loadingContext,setLoadingContext} = useContext(LoadingContext)
    const [loading,setLoading] = useState(false)
    const [selectedMessage,setSelectedMessage] = useState(0)

    const scrollLeft = () => {
        const galleryScroller = document.querySelector(".galleryScroller")
        galleryScroller.scroll(galleryScroller.scrollLeft - 431,0)
    }

    const scrollRight = () => {
        const galleryScroller = document.querySelector(".galleryScroller")
        galleryScroller.scroll(galleryScroller.scrollLeft + 431,0)
    }

   return (
        <div className="h-full relative w-full pt-10 grid">
            {loading || loadingContext ? <LoadingAnimation key='delete' bgOpacity={false} /> : null}
            <div className='h-full w-full bg-orange flex items-center justify-center'>
                <div className='w-10/12 h-3/4 bg-white'>
                    <p className='w-80 font-medium text-sm'> <span className='text-base text-zinc-700'>Nom et prénom:</span> {props.value[selectedMessage].name}</p>
                    <p className='w-80 font-medium text-sm'> <span className='text-base text-zinc-700'>E-mail:</span> {props.value[selectedMessage].email}</p>
                    <p className='w-80 font-medium text-sm'> <span className='text-base text-zinc-700'>Message:</span> {props.value[selectedMessage].message}</p>
                </div>
            </div>
            <div className=' w-full relative max-w-full h-52 bg-white flex flex-nowrap items-center overflow-hidden'>
            <button className='relative bg-white w-10 h-full z-[90] font-bold text-2xl' onClick={e => scrollLeft()}><Image src={'pfe/arrow-right-3098_-_Copy_hsxwaz'} alt='arrow' width={30} height={30} layout='fixed' className='hover:scale-x-125' /></button>
            <div className='galleryScroller w-full relative h-full bg-white flex flex-nowrap items-center overflow-hidden px-4 gap-10'>
                
                {props.value.map((item,index) => {
                    if(props.value.length == index + 1 ) 
                        return(
                    <div ref={props.lastElementRef} className='bg-white shadow-form h-40 px-5 py-3'>
                        <p className='w-80 font-medium text-sm'> <span className='text-base text-zinc-700'>Nom et prénom:</span> {item.name}</p>
                        <p className='w-80 font-medium text-sm'> <span className='text-base text-zinc-700'>E-mail:</span> {item.email}</p>
                        <p className='w-80 font-medium text-sm'> <span className='text-base text-zinc-700'>Message:</span> {item.message}</p>
                        
                    </div>)

                        return (<div className='bg-white shadow-form h-40 px-5 py-3'>
                        <p className='w-80 font-medium text-sm'> <span className='text-base text-zinc-700'>Nom et prénom:</span> {item.name}</p>
                        <p className='w-80 font-medium text-sm'> <span className='text-base text-zinc-700'>E-mail:</span> {item.email}</p>
                        <p className='w-80 font-medium text-sm'> <span className='text-base text-zinc-700'>Message:</span> {item.message}</p>
                        
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