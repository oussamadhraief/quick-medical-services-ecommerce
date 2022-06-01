import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useEffect } from 'react'

export default function QuoteComponent(props){

  const [classes,setClasses] = useState("font-bold bg-[#ffdbb9c6] text-[#fd8c22c6] w-24 px-2 py-1 rounded-md text-center mx-auto ")

  useEffect(() => {
    if(props.status == 'Répondue') setClasses('font-bold bg-green-200 text-emerald-700 w-24 px-2 py-1 rounded-md text-center mx-auto ')
    if(props.status == 'Archivée') setClasses('font-bold bg-red-200 text-red-500 w-24 px-2 py-1 rounded-md text-center mx-auto')
  },[])

    return(
      <tr className='w-full  even:bg-zinc-100 hover:cursor-pointer hover:bg-harvey relative h-20'>
      <td className='font-bold text-center whitespace-nowrap px-2 underline'>{props.id}</td>
      <td className='font-medium text-zinc-600 text-center whitespace-nowrap px-3'>{props.phoneNumber}</td>
      <td className='font-medium text-sm text-zinc-600 text-center whitespace-nowrap px-3'>{props.createdAt.substr(0,10)}</td>
      <td className='font-medium text-zinc-600 text-center whitespace-nowrap px-3'>{props.email}</td>
      <td className='px-2'> 
      <p className={classes}>{props.status == 'Archivée' ? 'Annulée' : props.status}</p>
       </td>
      <td className='w-14 flex justify-center items-center h-full'>
          <Link href={'/account/quoterequests/'+props.id}>
              <a className='w-full text-center hover:underline font-medium text-third'>voir</a>
          </Link>
      </td>
</tr>
    )
}