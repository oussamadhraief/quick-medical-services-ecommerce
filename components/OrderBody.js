import remove from '../assets/remove.png'

export default function OrderBody(){
    return (
        <tr className="border-b-[1px] border-zinc-300 h-fit">
            <td className="text-center p-3">Oussema Dhraief</td>
            <td className="text-center p-3">10 Janv. 2022</td>
            <td colSpan={2} className="text-center p-3">Hamlock&#40;1&#41;, Flatline&#40;1&#41;, R-301&#40;1&#41;, Mastiff&#40;1&#41;, Deez&#40;1&#41;, Halouani&#40;1&#41;,Hamlock&#40;1&#41;, Flatline&#40;1&#41;, R-301&#40;1&#41;, Mastiff&#40;1&#41;, Deez&#40;1&#41;, Halouani&#40;1&#41;,</td>
            <td className="text-center p-3">num 2 rue deez nuts hammem sousse sousse tunisia</td>
            <td className="text-center p-3">95237383</td>
            <td className="text-center p-3">oussema@deezhalouani.nuts</td>
            <td className='text-center'><span className='font-extrabold text-xl text-red-500'>&#x2716;</span></td>
        </tr>
    )
}