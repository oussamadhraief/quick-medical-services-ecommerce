import OrderBody from './OrderBody'
import PagesNavigator from './PagesNavigator'
import LoadingAnimation from './LoadingAnimation'
import { LoadingContext } from '../utils/LoadingContext'
import { useContext } from 'react'


export default function OrdersTable({orders}){

    const {loadingContext,setLoadingContext} = useContext(LoadingContext)

    return(
        <div className='h-full min-h-full pt-10 w-full relative grid overflow-y-auto'>
            {loadingContext ? <LoadingAnimation key='delete' bgOpacity={false} /> : null}
            <div className='w-[99%] mx-auto h-full pb-20 overflow-y-auto max-h-full'>
            <table className='w-full h-fit'>
                <thead className='w-full'>
                    <tr>
                    <th className='bg-[#E7EDEE] border-r border-white'>Référence</th>
                    <th className='bg-[#E7EDEE] border-r border-white'>Date</th>
                    <th className='bg-[#E7EDEE] border-r border-white'>Nom du client</th>
                    <th className='bg-[#E7EDEE] border-r border-white'>Email</th>
                    <th className='bg-[#E7EDEE] border-r border-white'>Status</th>
                    <th></th>
                    </tr>
                    
                </thead>
                <tbody className='w-full h-fit'>
                    {orders.map(item => <OrderBody key={item._id} id={item._id} name={item.user.name} createdAt={item.createdAt} status={item.status} email={item.email} />)}
                </tbody>
            </table>
            </div>
            <div className='absolute bottom-0 left-0 w-full'>
                
                <PagesNavigator relative={false}/>
            </div>
        </div>

    )
}