import { useContext, useEffect, useState } from 'react'
import { ProductsContext } from '../utils/ProductsContext'
import AdminProducts from './AdminProducts'
import PagesNavigator from './PagesNavigator'
import AddProductView from './AddProductView'
import LoadingAnimation from './LoadingAnimation'
import { LoadingContext } from '../utils/LoadingContext'
import { PageSelectionContext } from '../utils/PageSelectionContext'
import { useRouter } from 'next/router'

export default function ModifyProductsView({ editing, setEditing}){

    const Router = useRouter()

    const {value,setValue} = useContext(ProductsContext)
    const {pageSelection,setPageSelection} = useContext(PageSelectionContext)
    const {loadingContext,setLoadingContext} = useContext(LoadingContext)
    const [editingProduct,setEditingProduct] = useState({reference: '',name:'',sizes:[0],description:'',category:'',subcategory:'',availability:'available',productImage: ''})
    const [loading,setLoading] = useState(false)

    const handleEdit = (ref) => {
        const product = value.find(item => item.reference == ref)
        product.reference = ref
        setEditingProduct(product)
        setEditing(true)
    }

    const handleCancel = () => {
        Router.push({
            pathname: "/admin/products/modify",
            query: { page: 0 }
            })
            setEditing(false)
            setPageSelection(0)
    }

   return (
        <div className="h-full relative w-full pt-10 flex justify-center">
            {loading || loadingContext ? <LoadingAnimation key='delete' bgOpacity={false} /> : null}
            {editing ?  <AddProductView key='edit' addForm={false} modifiedProduct={editingProduct} handleCancel={handleCancel} /> :
            <div className='min-h-full w-full grid'>
                <div className="min-h-full h-full relative w-full overflow-y-auto gap-5 overflow-x-hidden rounded-md pb-8 pt-5 2xl:pt-10 2xl:px-10  lg:pt-5 lg:px-5 flex justify-evenly flex-wrap">
                {value.map(item => <AdminProducts key={item.name} image={item.image} name={item.name} reference={item.reference} handleClick={handleEdit} handleLoading={setLoading} />)}
                </div>
                <PagesNavigator relative={false}/>
            </div>}
        </div>
    )
}