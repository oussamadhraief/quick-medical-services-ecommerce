import { useContext, useEffect, useState } from "react"
import Image from "next/image"
import remove from '../assets/remove.png'
import ProductPreview from './ProductPreview'
import product from '../assets/productPreview.png'
import { ProductsContext } from "../utils/ProductsContext"
import LoadingAnimation from './LoadingAnimation'

export default function AddProductView(props){

    const [form,setForm] = useState({name:'',sizes:[0],description:'',category:'',subcategory:'',availability:'available'})
    const [productImage,setProductImage] = useState('')
    const [preview,setPreview] = useState({name:'Instrument médical',sizes:[1,2,3,4],description:'Vous allez voir les informations du produit ici en cliquant sur "Aperçu".',availability:'unavailable',productImage: product})
    const [sizeRemoval,setSizeRemoval] = useState(true)
    const {value,setValue} = useContext(ProductsContext)
    const [loading,setLoading] = useState(false)
    const [nameError,setNameError] = useState(false)
    const [imageError,setImageError] = useState(false)


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
            setProductImage(props.modifiedProduct.productImage)
            setSizeRemoval(false)
            handlePreview()
        }
    })

    function handleSizesChange(e,id){
        let newSizes = form.sizes
        newSizes[id] = parseInt(e.target.value)
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
        const categoryArray = value.map(item => item.category)
        const categoryExists = categoryArray.some(item => item == capCategory)
        if(categoryExists){
            const subcategoryArray = value.map(item => item.subcategory)
            const subcategoryExists = subcategoryArray.some(item => item == capSubcategory)
            if(subcategoryExists){
                const productWithCategoryAndSubcategoryRef = value.find(item => item.subcategory == capSubcategory)
                const categoryAndSubcategoryRefArray = productWithCategoryAndSubcategoryRef.reference.split('.')
                const categoryAndSubcategoryRef = `${categoryAndSubcategoryRefArray[0]}.${categoryAndSubcategoryRefArray[1]}.`
                let productCounter = 0
                for (let index = 0; index < value.length; index++) {
                    if(value[index].subcategory == capSubcategory){
                        productCounter++
                    }
                }
                return `${categoryAndSubcategoryRef}${productCounter}`
            }else{
                const productWithCategoryRef = value.find(item => item.category == capCategory)
                const categoryAndSubcategoryRefArray = productWithCategoryRef.reference.split('.')
                const productsWithSameCategory = value.filter(item => item.category == capCategory)
                const subcategoriesOfTheCategory = productsWithSameCategory.map(item => item.subcategory)
                let subcategoryCount =  new Set(subcategoriesOfTheCategory).size
                return `${categoryAndSubcategoryRefArray[0]}.${subcategoryCount}.0`
            }
        }else {
            let categoryCount =  new Set(categoryArray).size
            return `${categoryCount}.0.0`
        }}else {
            return '0.0.0'
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
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
                image: productImage,
                sizes: form.sizes,
                availability: form.availability
            }
            const res = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(produit)
            }).then(async (res) => {
                if(res.status != 400){
                    const newValue = value
                    newValue.push(produit)
                    setValue(newValue)
                }else {
                    const { error } = await res.json()
                    if(error.keyPattern.hasOwnProperty('name')){
                        setNameError(true)
                    }else{
                        setImageError(true)
                    }
                }
                setLoading(false)
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

    function handleModifications(){

    }

    return (
        <div className={loading ? "relative h-full overflow-hidden w-full border-2 border-zinc-300 rounded-md flex flex-wrap justify-around pt-20" : "relative h-full overflow-y-scroll w-full border-2 border-zinc-300 rounded-md flex flex-wrap justify-around pt-20"}>
            {loading ? <LoadingAnimation key='productaaa' bgOpacity={false} /> : null}
            {props.addForm ? <button className="absolute left-3 top-1 font-extrabold text-4xl w-fit h-fit text-zinc-400 rotate-180">&#x27A0;</button> : null}
            <form className="relative grid w-full h-fit bg-white shadow-3xl sm:w-4/6 xl:w-5/12 pr-10 pl-7 py-10 rounded-xl mb-10" action="submit" onSubmit={e => {
                e.preventDefault()
                if(props.addForm){

                    handleSubmit()
                }else{
                    handleModifications()
                }
            }}>
                <div className="w-full h-fit flex flex-nowrap justify-between mt-1 items-center">
                    
                <p className="text-gray-bg-gray-700 font-medium">Nom:</p>
                <input type="text" name="name" value={form.name} onChange={(e) => handleChange(e)}  className="rounded-lg h-10 outline-none w-4/5 ml-3 border-2 border-gray-700" required minLength={2} />
                </div>
                {nameError ? <div className="w-full h-fit flex flex-nowrap justify-end">
                <div className="w-4/5 h-fit">
                <p className="text-red-500">Un produit avec ce nom déjà existe</p>
                </div>
                </div> : null}
                <div className="w-full h-fit flex flex-nowrap justify-between mt-5">
                <p className="text-gray-bg-gray-700 font-medium mt-3">Taille&#40;s&#41;:</p>
                <div className="grid w-4/5 h-fit">
                    
               
                {form.sizes.map((item,index) => {
                    return (<div className="w-full flex flex-nowrap justify-center items-center my-1">
                                <input type="number" name="sizes" min={0} value={item} onChange={(e) => handleSizesChange(e,index)} className="w-5/12 ml-8 rounded-lg mr-2 outline-none h-10 text-center border-2 border-gray-700" required />
                                {sizeRemoval ? <Image src={remove} alt="remove" width={20} height={20} layout="fixed" id="removeSize" className="hover:cursor-pointer grayscale" /> : <Image src={remove} alt="remove" width={20} height={20} layout="fixed" id="removeSize" className="hover:cursor-pointer" onClick={e => handleRemove(index)}/>}
                            </div>
                    )
                })}
                <button type="button" onClick={e => { 
                    e.preventDefault()
                    handleClick()
                    }} className="w-fit mx-auto bg-gray-700 px-3 font-bold text-white py-1 rounded-lg h-fit" >+</button>
                     </div>
                </div>
                <div className="w-full h-fit flex flex-nowrap justify-between mt-10">
                <p className="text-gray-bg-gray-700 font-medium">Description:</p>
                <textarea rows="4" cols="50"  name="description" value={form.description} onChange={(e) => handleChange(e)}  className="rounded-lg outline-none border-2 w-4/5 border-gray-700" ></textarea>
                </div>
                <div className="w-full h-fit flex flex-nowrap justify-end mt-10">
                <div className="w-4/5 h-fit grid">

                    <label for="productImageInput" className="bg-yellow-500 mx-auto rounded-lg px-3 py-2 text-gray-bg-gray-700 text-xs font-bold hover:cursor-pointer hover:bg-gray-500 hover:text-white hover:scale-105">{props.addForm ? 'Ajouter une image' : "Modifier l'image"}</label>
                    {imageError ? 
                    <p className="text-red-500 whitespace-nowrap text-center w-full mt-1">Un produit avec cette image déjà existe</p> : null}
                    <input type="file" name="productImageInput" id="productImageInput" value="" className="hidden" onChange={e => handleImageInput(e)} />
                </div>
                </div>
                <div className="w-full h-fit flex flex-nowrap justify-between items-center mt-10">
                <p className="text-gray-bg-gray-700 font-medium">Categorie:</p>
                {props.addForm ? <input type="text" name="category" value={form.category} required minLength={4} onChange={(e) => handleChange(e)}  className="rounded-lg h-10 outline-none border-2 w-4/5 border-gray-700" /> : <input type="text" name="category" value={form.category} required minLength={4} disabled className="rounded-lg h-10 outline-none border-2 w-4/5 border-gray-700 bg-zinc-300" />}
                </div>
                <div className="w-full h-fit flex flex-nowrap justify-between items-center mt-10">
                <p className="text-gray-bg-gray-700 font-medium">Sous-categorie:</p>
                {props.addForm ? <input type="text" name="subcategory" value={form.subcategory} required minLength={4} onChange={(e) => handleChange(e)}  className="rounded-lg h-10 outline-none w-4/5 border-2 border-gray-700" /> : <input type="text" name="subcategory" value={form.subcategory} required minLength={4} disabled  className="rounded-lg h-10 outline-none w-4/5 border-2 bg-zinc-300 border-gray-700" />}
                </div>
                <div className="w-full h-fit flex flex-nowrap justify-between items-center mt-10">
                <p className="text-gray-bg-gray-700 font-medium">Disponibilité:</p>
                <div className="w-4/5 flex flex-nowrap justify-evenly">
                <label for="available" className="text-gray-bg-gray-700">
                <input type="radio" id="available" name="availability" value='available' className="mr-1 ml-3" checked={form.availability === 'available'} onChange={e => handleRadioChange(e)} />Disponible
                </label>
                <label for="unavailable" className="text-gray-bg-gray-700">
                <input type="radio" id="unavailable" name="availability" value='unavailable' className="mr-1 ml-3" checked={form.availability === 'unavailable'} onChange={e => handleRadioChange(e)} />Sur commande</label>
                </div>
                </div>
                <div className="w-full h-fit flex flex-nowrap justify-end mt-10">
                <div className="w-4/5 h-fit flex justify-center">
                <button type="button" className="absolute top-2 right-2 border-2 px-1 border-zinc-400 text-zinc-500 font-medium text-sm rounded-lg hover:bg-zinc-500 hover:text-white hover:border-zinc-500" onClick={e => handlePreview()}>Aper&ccedil;u</button>
                <button type="submit" className="mx-auto h-fit w-fit bg-gray-700 text-white p-3 rounded-lg font-medium text-lg hover:bg-cyan-900 hover:scale-105 text-gray-bg-gray-700">{props.addForm ? 'Ajouter le produit' : 'Enregistrer les modifications'}</button>
                </div></div>
            </form>
            <ProductPreview productImage={preview.productImage} name={preview.name} sizes={preview.sizes} description={preview.description} availability={preview.availability} />
        </div>
    )
}
