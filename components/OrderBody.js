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
            <td className="text-center p-3">YOSR</td>
            <td className="text-center p-3">123456789</td>
            <td className='text-center'><button className="px-2 text-red-500 border-[1px] border-red-500 rounded-md mx-1 hover:text-white hover:bg-red-500">Archiver</button></td>
        </tr>
    )
}