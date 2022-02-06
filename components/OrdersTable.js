import OrderBody from './OrderBody'

export default function OrdersTable(){
    return(
        <table className="w-full">
            <thead className="bg-zinc-300 text-zinc-700 rounded-t-lg">
                <th>CLIENT</th>
                <th>DATE</th>
                <th colSpan={2}>PRODUITS</th>
                <th>ADRESSE</th>
                <th>NUM. T&Eacute;L</th>
                <th>EMAIL</th>
                <th>ARCHIVER</th>
            </thead>
            <tbody className="bg-white text-black font-medium text-sm rounded-t-lg">
                <OrderBody />
                <OrderBody />
                <OrderBody />
                <OrderBody />
                <OrderBody />
            </tbody>
        </table>
    )
}