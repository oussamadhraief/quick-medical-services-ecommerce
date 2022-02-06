import AdminProducts from './AdminProducts'
import PagesNavigator from './PagesNavigator'

export default function ModifyProductsView(){
    return (
        <div className="h-full relative w-full border-2 rounded-lg border-zinc-300">
            <div className="h-full relative w-full overflow-y-scroll  rounded-md pb-32 px-3 pt-3 lg:pt-10 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-10 3xl:gap-14">
            <AdminProducts />
            <AdminProducts />
            <AdminProducts />
            <AdminProducts />
            <AdminProducts />
            <AdminProducts />
            <AdminProducts />
            <AdminProducts />
            <AdminProducts />
            <AdminProducts />
            </div>
            <PagesNavigator />
        </div>
    )
}