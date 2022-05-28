import Link from 'next/link'
import Image from 'next/image'

export default function QuotesBody(props){
    return (
        
        <tr className='w-full h-20 even:bg-zinc-100 hover:cursor-pointer hover:bg-[#E7EDEE] relative'>
                    <td className='font-bold text-center whitespace-nowrap px-2'>{props.id}</td>
                    <td className='font-medium text-zinc-600 text-center whitespace-nowrap px-3'>{props.name}</td>
                    <td className='font-medium text-zinc-600 text-center whitespace-nowrap px-3'>{props.phoneNumber}</td>
                    <td className='font-medium text-sm text-zinc-600 text-center whitespace-nowrap px-2'>{props.createdAt.substr(0,10)}</td>
                    <td className='font-medium text-zinc-600 text-center whitespace-nowrap px-3'>{props.email}</td>
                    <td className='px-2'> <p className='font-bold bg-[#ffe8d3c6] text-orange w-24 px-2 py-1 rounded-md text-center mx-auto '>{props.status}</p> </td>
                    <td className='w-14 flex justify-center items-center h-full'>
                        <Link href={'admin/quoterequests/edit/'+props.id}>
                            <div className='relative h-fit w-fit group'>
                                <Image src={'pfe/icons8-edit-32_fuir9r'} alt='modifer' height={25} width={25} layout='fixed' />
                                <p className='absolute top-0 right-[135%] hidden bg-white px-2 py-0.5 z-[99] rounded-md group-hover:block'>modifier</p>
                            </div>
                        </Link>
                    </td>
        </tr>
           
    )
}