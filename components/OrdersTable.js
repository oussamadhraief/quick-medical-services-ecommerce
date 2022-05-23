import OrderBody from './OrderBody'
import PagesNavigator from './PagesNavigator'
import LoadingAnimation from './LoadingAnimation'
import { LoadingContext } from '../utils/LoadingContext'
import { useContext } from 'react'


export default function OrdersTable({orders}){

    const {loadingContext,setLoadingContext} = useContext(LoadingContext)

    return(
        <div className='h-screen pt-10 pb-12 w-full relative overflow-y-auto'>
            {loadingContext ? <LoadingAnimation key='delete' bgOpacity={false} /> : null}
            <table className='w-[99%] mx-auto h-fit py-10'>
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
            <div className='fixed bottom-0 left-0 w-full'>
                <PagesNavigator relative={false}/>
            </div>
        </div>

    )
}