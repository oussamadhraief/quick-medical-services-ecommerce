import { useContext, useEffect, useState } from 'react'
import { ProductsContext } from '../utils/ProductsContext'
import AdminProducts from './AdminProducts'
import PagesNavigator from './PagesNavigator'
import LoadingAnimation from './LoadingAnimation'
import { LoadingContext } from '../utils/LoadingContext'
import Notification from "../components/Notification"
import { useRouter } from 'next/router'

export default function ModifyProductsView(props){

    const Router = useRouter()

    const {value,setValue} = useContext(ProductsContext)
    const {loadingContext,setLoadingContext} = useContext(LoadingContext)
    const [loading,setLoading] = useState(false)
    const [showNotification,setShowNotification] = useState(false)
    const [message,setMessage] = useState('')

   return (
        <div className="h-full relative w-full pt-2 md:pt-10 flex overflow-y-auto justify-center">
            {loading || loadingContext ? <LoadingAnimation key='delete' bgOpacity={false} /> : null}
            <div className='min-h-full w-full grid'>
                <div className="min-h-full h-full relative w-full overflow-y-auto gap-5 overflow-x-hidden rounded-md pb-8 pt-5 2xl:pt-10 2xl:px-10  lg:pt-5 lg:px-5 flex justify-evenly flex-wrap">
                {value.map(item => {
                    return (<AdminProducts key={item.name} image={item.image} name={item.name} reference={item.reference} availability={item.availability} handleLoading={setLoading} archived={item.archived} setShowNotification={setShowNotification} setMessage={setMessage} />)
                })}
                </div>
                <PagesNavigator relative={false}/>
            </div>
            <Notification show={showNotification} setShow={setShowNotification} message={message} />
        </div>
    )
}