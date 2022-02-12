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
            <div className='min-h-full w-full grid'>
                <div className="min-h-full h-full relative w-full overflow-y-scroll overflow-x-hidden rounded-md 2xl:pt-10 2xl:px-10  lg:pt-5 lg:px-5 flex justify-evenly flex-wrap">
                {value.slice(0).reverse().map(item => <AdminProducts key={item.name} image={item.image} name={item.name} reference={item.reference} handleClick={handleEdit} />)}
                </div>
                <PagesNavigator />
            </div>}
        </div>
    )
}