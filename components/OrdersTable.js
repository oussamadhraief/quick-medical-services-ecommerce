import OrderBody from './OrderBody'

export default function OrdersTable(){
    return(
        <table className="w-fit table-auto border-collapse overflow-auto">
            <thead className="bg-zinc-300 overflow-y-scroll overflow-x-auto w-fit min-w-full text-zinc-700 rounded-t-lg">
                <th>CLIENT</th>
                <th>DATE</th>
                <th colSpan={2}>PRODUITS</th>
                <th>ADRESSE</th>
                <th>NUM. T&Eacute;L</th>
                <th>EMAIL</th>
                <th>CLINIQUE</th>
                <th>MAT. FISCALE</th>
                <th></th>
            </thead>
            <tbody className="bg-white overflow-y-scroll overflow-x-auto min-w-full w-fit text-black font-medium text-sm rounded-t-lg">
                <OrderBody />
                <OrderBody />
                <OrderBody />
                <OrderBody />
                <OrderBody />
            </tbody>
        </table>
    )
}