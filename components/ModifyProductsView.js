import { useContext, useEffect, useState } from 'react'
import { ProductsContext } from '../utils/ProductsContext'
import AdminProducts from './AdminProducts'
import PagesNavigator from './PagesNavigator'
import AddProductView from './AddProductView'

export default function ModifyProductsView(){

    const {value,setValue} = useContext(ProductsContext)
    const [editing,setEditing] = useState(false)
    const [editingProduct,setEditingProduct] = useState({name:'',sizes:[0],description:'',category:'',subcategory:'',availability:'available',productImage: ''})

    const handleEdit = (ref) => {
        const product = value.find(item => item.reference == ref)
        setEditingProduct(product)
        setEditing(true)
    }

    const handleCancel = () => {
        setEditing(false)
    }

   return (
        <div className="h-full relative w-full border-2 rounded-lg border-zinc-300">
            {editing ?  <AddProductView key='edit' addForm={false} modifiedProduct={editingProduct} handleCancel={handleCancel} /> :
            <div className='h-full w-full'>
                <div className="h-full relative w-full overflow-y-scroll  rounded-md pb-32 px-3 pt-3 lg:pt-10 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-10 3xl:gap-14">
                {value.map(item => <AdminProducts image={item.image} name={item.name} reference={item.reference} handleClick={handleEdit} />)}
                </div>
                <PagesNavigator />
            </div>}
        </div>
    )
}