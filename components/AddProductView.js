import { useContext, useEffect, useState } from "react"
import Image from "next/image"
import ProductPreview from './ProductPreview'
import { ProductsContext } from "../utils/ProductsContext"
import LoadingAnimation from './LoadingAnimation'
import { NotificationContext } from "../utils/NotificationContext"
import { LoadingContext } from "../utils/LoadingContext"
import 'animate.css'
import Modal from "./Modal"


export default function AddProductView(props){

    const remove = 'pfe/remove_kqcrbj.png' 
    const product = 'pfe/productPreview_gwcvck.png'
    const arrowIcon = 'pfe/return_jxgfqn.png'

    const [form,setForm] = useState({name:'',sizes:[0],description:'',category:'',subcategory:'',availability:'available'})
    const [productImage,setProductImage] = useState('')
    const [preview,setPreview] = useState({name:'Instrument médical',sizes:[1,2,3,4],description:'Vous allez voir les informations du produit ici en cliquant sur "Aperçu".',availability:'unavailable',productImage: product})
    const [sizeRemoval,setSizeRemoval] = useState(true)
    const {value,setValue} = useContext(ProductsContext)
    const [loading,setLoading] = useState(false)
    const [nameError,setNameError] = useState(false)
    const [imageError,setImageError] = useState(false)
    const {appear,setAppear} = useContext(NotificationContext)
    const [show,setShow] = useState(false)
    const {loadingContext,setLoadingContext} = useContext(LoadingContext)


    function handleChange(event){
        setNameError(false)
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        if(!props.addForm){
            let tempObj = {
                name: props.modifiedProduct.name,
                category: props.modifiedProduct.category,
                subcategory: props.modifiedProduct.subcategory,
                description: props.modifiedProduct.description,
                sizes: props.modifiedProduct.sizes,
                availability: props.modifiedProduct.availability,
            }
            setForm(tempObj)
            setProductImage(props.modifiedProduct.image)
            if(props.modifiedProduct.sizes.length == 1 ) {
                setSizeRemoval(true)
            }else {
                setSizeRemoval(false)
            }
            setPreview({
                name: props.modifiedProduct.name,
                sizes: props.modifiedProduct.sizes,
                description: props.modifiedProduct.description,
                availability: props.modifiedProduct.availability,
                productImage: props.modifiedProduct.image,
            })
        }
    },[props.addForm])

    function handleSizesChange(e,id){
        let newSizes = form.sizes
        newSizes[id] = parseFloat(e.target.value)
        setForm({
            ...form,
            sizes: newSizes
        })
    }

    function handleClick(){
        let newSizes = form.sizes
        newSizes.push(0)
        setForm({
            ...form,
            sizes: newSizes
        })
        if(newSizes.length == 1 ) {
            setSizeRemoval(true)
        }else {
            setSizeRemoval(false)
        }
    }
    
    function handleRemove(id){
        let newSizes = form.sizes.filter((item,index) => index != id)
        setForm({
            ...form,
            sizes: newSizes
        })
        if(newSizes.length == 1 ) {
            setSizeRemoval(true)
        }else {
            setSizeRemoval(false)
        }
    }

    const handleReference = (capCategory,capSubcategory) => {
        if(value.length > 0){
        const categoryExists = value.some(item => item.category == capCategory)
        if(categoryExists){
        const subcategoryExists = value.some(item => item.subcategory == capSubcategory)
            if(subcategoryExists){
                const productWithCategoryAndSubcategoryRef = value.find(item => item.subcategory == capSubcategory)
                const categoryAndSubcategoryRefArray = productWithCategoryAndSubcategoryRef.reference.split('.')
                const productsReferences = value.filter(item => item.subcategory == capSubcategory)
                const productRef = productsReferences.map(item => item.reference.split('.'))
                const maxProdRef = productRef.map(item => item[2])
                const productCounter = Math.max(...maxProdRef) + 1
                return `${categoryAndSubcategoryRefArray[0]}.${categoryAndSubcategoryRefArray[1]}.${productCounter}`
            }else{
                const subcategoryReferences = value.filter(item => item.category == capCategory)
                const subRefCount = subcategoryReferences.map(item => item.reference.split('.'))
                const subRef = subRefCount.map(item => item[1])
                const subcategoryCount = Math.max(...subRef) +1
                const categoryAndSubcategoryRefArray = subRefCount[0]
                return `${categoryAndSubcategoryRefArray[0]}.${subcategoryCount}.0`
            }
        }else {  
            const references = value.map(item => item.reference.split('.'))
            const categoryReferences = references.map(item => item[0])
            const categoryCount = Math.max(...categoryReferences) + 1
            return `${categoryCount}.0.0`
        }}else {
            return '0.0.0'
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        setLoadingContext(true)
        document.getElementById('scrolltop').scroll(0,0)
        try {
            let trimmedCategory = form.category.trim()
            let trimmedSubcategory = form.subcategory.trim()
            let capCategory = trimmedCategory.charAt(0).toUpperCase() + trimmedCategory.slice(1).toLowerCase();
            let capSubcategory = trimmedSubcategory.charAt(0).toUpperCase() + trimmedSubcategory.slice(1).toLowerCase();
            let reference = handleReference(capCategory,capSubcategory)
            let produit = {
                image: productImage,
                reference: reference,
                category: capCategory,
                subcategory: capSubcategory,
                name: form.name,
                description: form.description,
                sizes: form.sizes,
                availability: form.availability
            }
            const res = await fetch('api/products', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(produit)
            }).then(async (res) => {
                if(res.status == 201){
                    const newValue = [produit].concat(value)
                    setValue(newValue)
                    setAppear({display: true, action: 'ajouté'})
                    setForm({name:'',sizes:[0],description:'',category:'',subcategory:'',availability:'available'})
                    setProductImage('')
                    setPreview({name:'Instrument médical',sizes:[1,2,3,4],description:'Vous allez voir les informations du produit ici en cliquant sur "Aperçu".',availability:'unavailable',productImage: product})
                }else {
                    console.error(error)
                    const { error } = await res.json()
                    if(error.keyPattern.hasOwnProperty('name')){
                        setNameError(true)
                    }else{
                        setImageError(true)
                    }
                }
                setLoading(false)
                setLoadingContext(false)
            })
        } catch (error) {
            console.error(error)
        }
    }

    function handleRadioChange(e){
        setForm({
            ...form,
            availability: e.target.value
        })
    }

    function handleImageInput(e){
        
        setImageError(false)
        const reader = new FileReader();
        reader.onload = function () {
            setProductImage(reader.result)
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    function handlePreview(){
        let previewObject = {
            availability: form.availability
        }
        if(form.name != '') {previewObject.name = form.name} else {previewObject.name = preview.name}
        if(form.description != '') {previewObject.description = form.description} else {previewObject.description = preview.description}
        if(form.sizes.length > 1 || (form.sizes.length == 1 && form.sizes[0] != 0)) {previewObject.sizes = form.sizes.map(item => item)} else {previewObject.sizes = preview.sizes}
        if(productImage != '') {previewObject.productImage = productImage} else {previewObject.productImage = preview.productImage}
        setPreview(previewObject)
    }

    const handleModifications = async () => {
        setLoading(true)
        setLoadingContext(true)
        document.getElementById('scrolltop').scroll(0,0)
        try {
            const produit = {
                ...form,
                image: productImage,
            }
            const res = await fetch('api/products/'+props.modifiedProduct.reference,{
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(produit)
            }).then(async (res) => {
                if(res.status == 200){
                    const valueIndex = value.filter(item => item.reference != props.modifiedProduct.reference)
                    const data = {
                        ...form,
                        image: productImage,
                        reference: props.modifiedProduct.reference
                    }
                    let newValue = [data].concat(valueIndex)
                    setValue(newValue)
                    setAppear({display: true, action: 'modifié'})
                    props.handleCancel()
                }else{
                    const { error } = await res.json()
                    if(error.keyPattern.hasOwnProperty('name')){
                        setNameError(true)
                    }else{
                        setImageError(true)
                    }
                    setLoading(false)
                }
                setLoadingContext(false)
            })
            
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div id="scrolltop" className={loading ? "relative h-full overflow-hidden w-full border-2 border-zinc-300 rounded-md flex flex-wrap justify-around pt-14" : "relative h-full overflow-y-auto w-full border-2 border-zinc-300 rounded-md flex flex-wrap justify-around pt-14"}>
            {loading ? <LoadingAnimation key='productaaa' bgOpacity={false} /> : null}
            {!props.addForm ? <button className="absolute left-3 top-2 font-extrabold w-fit h-fit text-zinc-400 animate__animated animate__slideInLeft" onClick={e => props.handleCancel()}><Image src={arrowIcon} alt='go back icon' width={30} height={30} /></button> : null}
            <form className="relative grid w-11/12 h-fit bg-white shadow-3xl lg:w-4/6 xl:w-5/12 2xl:w-5/12 pr-10 pl-7 py-10 rounded-xl mb-10 animate__animated animate__slideInLeft" action="submit" onSubmit={e => {
                e.preventDefault()
                setShow(true)
            }}>
                
                    
                <p className="text-gray-bg-main font-medium">Nom:</p>
                <input type="text" name="name" value={form.name} onChange={(e) => handleChange(e)}  className="rounded-lg h-10 outline-none w-full border-2 border-main focus:border-secondary" required minLength={2} />
                
                {nameError ? <p className="text-red-500">Un produit avec ce nom déjà existe</p> : null}
                <p className="text-gray-bg-main font-medium mt-3">Taille&#40;s&#41;:</p>
                    
               
                {form.sizes.map((item,index) => {
                    return (<div key={index} className="w-full flex flex-nowrap justify-center items-center my-1">
                                <input type="number" name="sizes" min={0} value={item} onChange={(e) => handleSizesChange(e,index)} className="w-5/12 ml-8 rounded-lg mr-2 outline-none h-10 text-center border-2 border-main focus:border-secondary" required />
                                {sizeRemoval ? <Image src={remove} alt="remove" width={20} height={20} layout="fixed" id="removeSize" className="hover:cursor-pointer grayscale" /> : <Image src={remove} alt="remove" width={20} height={20} layout="fixed" id="removeSize" className="hover:cursor-pointer" onClick={e => handleRemove(index)}/>}
                            </div>
                    )
                })}
                <button type="button" onClick={e => { 
                    e.preventDefault()
                    handleClick()
                    }} className="w-fit mx-auto bg-main px-3 font-bold text-white py-1 rounded-lg h-fit" >+</button>
                <p className="text-gray-bg-main font-medium">Description:</p>
                <textarea rows="4" cols="50"  name="description" value={form.description} onChange={(e) => handleChange(e)}  className="rounded-lg outline-none border-2 w-full border-main focus:border-secondary" ></textarea>

                <label className="bg-yellow-500 mt-5 mx-auto rounded-lg px-3 py-2 text-gray-bg-main text-xs font-bold hover:cursor-pointer hover:bg-gray-500 hover:text-white hover:scale-105">{props.addForm ? 'Ajouter une image' : "Modifier l'image"}
                <input type="file" accept="image/*" name="productImageInput" value="" className="hidden" onChange={e => handleImageInput(e)} />
                </label>
                {imageError ? 
                <p className="text-red-500 whitespace-nowrap text-center w-full mt-1">Un produit avec cette image déjà existe</p> : null}
                <p className="text-gray-bg-main font-medium mt-5">Catégorie:</p>
                {props.addForm ? <input type="text" name="category" value={form.category} required minLength={4} onChange={(e) => handleChange(e)}  className="focus:border-secondary rounded-lg h-10 outline-none border-2 w-full border-main" /> : <input type="text" name="category" value={form.category} required minLength={4} disabled readOnly className="rounded-lg h-10 outline-none border-2 w-full border-main bg-zinc-300" />}
                <p className="text-gray-bg-main font-medium mt-5">Sous-catégorie:</p>
                {props.addForm ? <input type="text" name="subcategory" value={form.subcategory} required minLength={4} onChange={(e) => handleChange(e)}  className="focus:border-secondary rounded-lg h-10 outline-none w-full border-2 border-main" /> : <input type="text" name="subcategory" value={form.subcategory} required minLength={4} disabled  readOnly className="rounded-lg h-10 outline-none w-full border-2 bg-zinc-300 border-main" />}
                <p className="text-gray-bg-main font-medium mt-5">Disponibilité:</p>
                <label className="text-gray-bg-main">
                <input type="radio" name="availability" value='available' className="mr-1 ml-3" checked={form.availability === 'available'} onChange={e => handleRadioChange(e)} />Disponible
                </label>
                <label className="text-gray-bg-main">
                <input type="radio" name="availability" value='unavailable' className="mr-1 ml-3" checked={form.availability === 'unavailable'} onChange={e => handleRadioChange(e)} />Sur commande</label>
                <button type="button" className="absolute top-2 right-2 border-2 px-1 border-zinc-400 text-zinc-500 font-medium text-sm rounded-lg hover:bg-zinc-500 hover:text-white hover:border-zinc-500" onClick={e => handlePreview()}>Aper&ccedil;u</button>
                <button type="submit" className="mx-auto h-fit w-fit bg-main text-white p-3 rounded-lg font-medium text-sm md:text-medium xl:text-lg hover:bg-emerald-700 hover:scale-105 whitespace-nowrap text-gray-bg-main mt-8">{props.addForm ? 'Ajouter le produit' : 'Enregistrer les modifications'}</button>
            </form>
            <Modal show={show} onClose={() => setShow(false)} onConfirm={() => 
               { if(props.addForm){

                    handleSubmit()
                }else{
                    handleModifications()
                }}
                } action={'add'} content={props.addForm ? 'Êtes-vous sûr de vouloir ajouter ce produit ?' : 'Êtes-vous sûr de vouloir modifier ce produit ?'} />
            <ProductPreview productImage={preview.productImage} name={preview.name} sizes={preview.sizes} description={preview.description} availability={preview.availability} />
        </div>
    )
}
