import OrdersTable from "./OrdersTable"

export default function ArchivedOrdersView(){
    return (
        <div className="h-full w-full border-2 border-zinc-300 rounded-md">
            <OrdersTable />
        </div>
    )
}