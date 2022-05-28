import OrderBody from './OrderBody'
import PagesNavigator from './PagesNavigator'
import LoadingAnimation from './LoadingAnimation'
import { LoadingContext } from '../utils/LoadingContext'
import { useContext } from 'react'


export default function OrdersTable({orders}){

    const {loadingContext,setLoadingContext} = useContext(LoadingContext)

    return(
        <div className='h-full min-h-full pt-10 pb-10 w-full relative grid overflow-auto'>
            {loadingContext ? <LoadingAnimation key='delete' bgOpacity={false} /> : null}
            <div className='w-[99%] mx-auto h-full pb-10 overflow-y-auto max-h-full'>
            <table className='w-full h-fit'>
                <thead className='w-full h-12 border-b border-white'>
                    <tr>
                    <th className='bg-[#E7EDEE] border-r border-white text-sm'>Référence</th>
                    <th className='bg-[#E7EDEE] border-r border-white text-sm'>Nom du client</th>
                    <th className='bg-[#E7EDEE] border-r border-white text-sm'>Adresse de livraison</th>
                    <th className='bg-[#E7EDEE] border-r border-white text-sm'>Adresse de facturation</th>
                    <th className='bg-[#E7EDEE] border-r border-white text-sm'>Num. de téléphone</th>
                    <th className='bg-[#E7EDEE] border-r border-white text-sm'>Date</th>
                    <th className='bg-[#E7EDEE] border-r border-white text-sm'>Email</th>
                    <th className='bg-[#E7EDEE] border-r border-white text-sm'>Status</th>
                    <th></th>
                    </tr>
                    
                </thead>
                <tbody className='w-full h-fit '>
                    {orders.map(item => {
                        if(item.address.length == 1) return (<OrderBody key={item._id} id={item._id} name={item.user.name} phoneNumber={item.phoneNumber} address={item.address[0]} city={item.city[0]} country={item.country[0]} zipCode={item.zipCode[0]}  address2={item.address[0]} city2={item.city[0]} country2={item.country[0]} zipCode2={item.zipCode[0]} createdAt={item.createdAt} status={item.status} email={item.email} />)
                        return (<OrderBody key={item._id} id={item._id} name={item.user.name} phoneNumber={item.phoneNumber} address={item.address[0]} city={item.city[0]} country={item.country[0]} address2={item.address[1]} city2={item.city[1]} zipCode={item.zipCode[0]} country2={item.country[1]} zipCode2={item.zipCode[1]} createdAt={item.createdAt} status={item.status} email={item.email} />)
                })}
                </tbody>
            </table>
            </div>
            <div className='absolute bottom-0 left-0 w-full'>
                
                <PagesNavigator relative={false}/>
            </div>
        </div>

    )
}