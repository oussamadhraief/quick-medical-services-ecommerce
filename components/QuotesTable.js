import QuotesBody from './QuotesBody'
import PagesNavigator from './PagesNavigator'
import LoadingAnimation from './LoadingAnimation'
import { LoadingContext } from '../utils/LoadingContext'
import { useContext } from 'react'


export default function QuotesTable({quotes}){

    const {loadingContext,setLoadingContext} = useContext(LoadingContext)

    return(
        <div className='h-full min-h-full pt-10 pb-10 w-full relative grid overflow-auto'>
            {loadingContext ? <LoadingAnimation key='delete' bgOpacity={false} /> : null}
            <div className='w-[99%] mx-auto h-full pb-20 overflow-y-auto max-h-full'>
            <table className='w-full h-fit'>
                <thead className='w-full h-12 border-b border-white'>
                    <tr>
                    <th className='bg-[#E7EDEE] border-r border-white text-sm'>Référence</th>
                    <th className='bg-[#E7EDEE] border-r border-white text-sm'>Nom du client</th>
                    <th className='bg-[#E7EDEE] border-r border-white text-sm'>Num. de téléphone</th>
                    <th className='bg-[#E7EDEE] border-r border-white text-sm'>Date</th>
                    <th className='bg-[#E7EDEE] border-r border-white text-sm'>Email</th>
                    <th className='bg-[#E7EDEE] border-r border-white text-sm'>Status</th>
                    <th></th>
                    </tr>
                    
                </thead>
                <tbody className='w-full h-fit '>
                    {quotes.map(item => {
                        return (<QuotesBody key={item._id} id={item._id} name={item.user?.name} phoneNumber={item.phoneNumber} createdAt={item.createdAt} status={item.status} email={item.email} />)
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