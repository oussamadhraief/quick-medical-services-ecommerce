import { useContext, useEffect, useState } from 'react'
import { ProductsContext } from '../utils/ProductsContext'
import AdminProducts from './AdminProducts'
import PagesNavigator from './PagesNavigator'
import AddProductView from './AddProductView'

export default function ModifyProductsView(){

    const {value,setValue} = useContext(ProductsContext)
    const [editing,setEditing] = useState(false)
    const [editingProduct,setEditingProduct] = useState({reference: '',name:'',sizes:[0],description:'',category:'',subcategory:'',availability:'available',productImage: ''})

    const handleEdit = (ref) => {
        const product = value.find(item => item.reference == ref)
        product.reference = ref
        setEditingProduct(product)
        setEditing(true)
    }

    const handleCancel = () => {
        setEditing(false)
    }

   return (
        <div className="h-full relative w-full border-2 rounded-lg border-zinc-300 flex justify-center">
            {editing ?  <AddProductView key='edit' addForm={false} modifiedProduct={editingProduct} handleCancel={handleCancel} /> :
            <div className='h-full w-full flex justify-center'>
                <ul className="h-full relative w-full overflow-y-scroll overflow-x-hidden rounded-md pb-32 lg:pt-10 lg:px-10 flex justify-evenly flex-wrap">
                {value.slice(0).reverse().map(item => <AdminProducts image={item.image} name={item.name} reference={item.reference} handleClick={handleEdit} />)}
                </ul>
                <PagesNavigator />
            </div>}
        </div>
    )
}