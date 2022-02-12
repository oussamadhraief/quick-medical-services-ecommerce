import OrdersTable from './OrdersTable'

export default function ViewOrdersView(){
    return (
        <div className="h-full w-full border-2 border-zinc-300 rounded-md overflow-auto">
            <OrdersTable />
        </div>
    )
}