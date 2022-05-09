

export default function OrderComponent(props){
    return(
        <tr className='w-full h-10 border-b'>
                    <td className='font-medium text-center'>{props.id}</td>
                    <td className='font-medium text-center'>{props.createdAt.substr(0,10)}</td>
                    <td className='font-medium text-center'>{props.email}</td>
                    <td> <p className='font-medium bg-orange w-28 px-2 py-0.5 rounded-md text-center mx-auto'>{props.status}</p> </td>
                    <td className='flex justify-center items-center'>
                      <button className='font-medium w-fit h-fit px-3 py-0.5 rounded-3xl bg-[#E7EDEE] shadow-form flex items-center mt-[4px]'> Voir</button>
                    </td>
        </tr>
    )
}