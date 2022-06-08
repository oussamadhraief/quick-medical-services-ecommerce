import { useContext, useEffect, useState } from "react"
import Image from "next/image"
import ProductPreview from './ProductPreview'
import { ProductsContext } from "../utils/ProductsContext"
import LoadingAnimation from './LoadingAnimation'
import { NotificationContext } from "../utils/NotificationContext"
import { LoadingContext } from "../utils/LoadingContext"
import 'animate.css'
import Modal from "./Modal"
import { useRouter } from "next/router"


export default function AddProductView(props){

    const router = useRouter()

    const remove = 'pfe/remove_kqcrbj.png' 
    const product = 'pfe/productPreview_gwcvck.png'
    const arrowIcon = 'pfe/return_jxgfqn_pbrbnv.png'

    const [form,setForm] = useState({name:'',sizes:[0],description:'',category:'',subcategory:'',availability:'available'})
    const [productImage,setProductImage] = useState('')
    const [preview,setPreview] = useState({name:'Instrument médical',sizes:[1,2,3,4],description:'Vous allez voir les informations du produit ici en cliquant sur "Aperçu".',availability:'unavailable',productImage: product})
    const [sizeRemoval,setSizeRemoval] = useState(true)
    const {value,setValue} = useContext(ProductsContext)
    const [loading,setLoading] = useState(false)
    const [nameError,setNameError] = useState(false)
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

    const handleSubmit = async () => {
        setLoading(true)
        setLoadingContext(true)
        document.getElementById('scrolltop').scroll(0,0)
        try {
            
            let trimmedCategory = form.category.trim()
            let trimmedSubcategory = form.subcategory.trim()
            let capCategory = trimmedCategory.charAt(0).toUpperCase() + trimmedCategory.slice(1).toLowerCase();
            let capSubcategory = trimmedSubcategory.charAt(0).toUpperCase() + trimmedSubcategory.slice(1).toLowerCase()
            const formData = new FormData()
            formData.append('file',productImage)
            formData.append('upload_preset','test123')
            await fetch('https://api.cloudinary.com/v1_1/dwvwjxizk/image/upload',{
                method: 'POST',
                body: formData
            }).then(async r => {
                const image = await r.json()
                let produit = {
                    image: image.public_id,
                    category: capCategory,
                    subcategory: capSubcategory,
                    name: form.name,
                    description: form.description,
                    sizes: form.sizes,
                    availability: form.availability
                }
                await fetch('/api/products', {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(produit)
                }).then(async (res) => {
                    if(res.status == 201){
                        setLoading(false)
                        setLoadingContext(false)
                        setAppear({display: false, action: ''})
                        setAppear({display: true, action: 'ajouté'})
                        setForm({name:'',sizes:[0],description:'',category:'',subcategory:'',availability:'available'})
                        setProductImage('')
                        setPreview({name:'Instrument médical',sizes:[1,2,3,4],description:'Vous allez voir les informations du produit ici en cliquant sur "Aperçu".',availability:'unavailable',productImage: product})
                    }else {
                        const { error } = await res.json()
                        console.error(error)
                        setNameError(true)
                    }
                    setLoading(false)
                    setLoadingContext(false)
                })

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

   async  function handleImageInput(e){

        const reader = new FileReader();
        reader.onload = async function () {
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
            const res = await fetch('/api/products/'+props.modifiedProduct.reference,{
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(produit)
            }).then(async (res) => {
                if(res.status == 200){
                    setAppear({display: false, action: ''})
                    setAppear({display: true, action: 'modifié'})
                }else{
                    setNameError(true)
                    setLoading(false)
                }
                setLoadingContext(false)
                setLoading(false)
            })
            
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div id="scrolltop" className={loading ? "relative h-full overflow-hidden w-full flex flex-wrap justify-around pt-14" : "relative h-full overflow-y-auto w-full  flex flex-wrap justify-around pt-14"}>
            {loading || loadingContext ? <LoadingAnimation key='productaaa' bgOpacity={false} /> : null}
            {!props.addForm ? <button className="absolute left-3 top-2 font-extrabold w-fit h-fit text-zinc-400 animate__animated animate__slideInLeft" onClick={e => router.push('/admin/products/manage?page=0')}><Image src={arrowIcon} alt='go back icon' width={30} height={30} /></button> : null}
            <form className="relative grid w-11/12 max-w-[700px] h-fit bg-white shadow-form lg:w-4/6 xl:w-5/12 2xl:w-5/12 pr-10 pl-7 py-10 rounded-xl mb-10 animate__animated animate__slideInLeft" action="submit" onSubmit={e => {
                e.preventDefault()
                setShow(true)
            }}>
                
                    
                <p className="text-na3ne3i font-medium">Nom:</p>
                <input type="text" name="name" value={form.name} onChange={(e) => handleChange(e)}  className="rounded-lg h-10 outline-none w-full border border-na3ne3i focus:border-orange" required minLength={2} />
                
                {nameError ? <p className="text-red-500">Un produit avec ce nom déjà existe</p> : null}
                <p className="text-na3ne3i font-medium mt-3">Taille&#40;s&#41;:</p>
                    
               
                {form.sizes.map((item,index) => {
                    return (<div key={index} className="w-full flex flex-nowrap justify-center items-center my-1">
                                <input type="number" name="sizes" min={0} value={item} onChange={(e) => handleSizesChange(e,index)} className="w-5/12 ml-8 rounded-lg mr-2 outline-none h-10 text-center border border-na3ne3i focus:border-orange" required />
                                {sizeRemoval ? <Image src={remove} alt="remove" width={20} height={20} layout="fixed" id="removeSize" className="hover:cursor-pointer grayscale" /> : <Image src={remove} alt="remove" width={20} height={20} layout="fixed" id="removeSize" className="hover:cursor-pointer" onClick={e => handleRemove(index)}/>}
                            </div>
                    )
                })}
                <button type="button" onClick={e => { 
                    e.preventDefault()
                    handleClick()
                    }} className="w-fit mx-auto bg-na3ne3i px-3 font-bold text-white py-1 rounded-lg h-fit" >+</button>
                <p className="text-na3ne3i font-medium">Description:</p>
                <textarea rows="4" cols="50"  name="description" value={form.description} onChange={(e) => handleChange(e)}  className="rounded-lg outline-none border w-full border-na3ne3i focus:border-orange" ></textarea>

                <label className="bg-pinky shadow-[0px_3px_10px_rgba(247,177,162,0.4)] text-white mt-5 mx-auto rounded-lg px-3 py-2 text-xs font-bold hover:cursor-pointer hover:bg-na3ne3i transition-all hover:shadow-[0px_3px_10px_rgba(25,98,102,0.5)] hover:text-white hover:scale-105">{props.addForm ? 'Ajouter une image' : "Modifier l'image"}
                <input type="file" accept="image/*" name="productImageInput" value="" className="hidden" onChange={e => handleImageInput(e)} />
                </label>
                <p className="text-na3ne3i font-medium mt-5">Catégorie:</p>
                {props.addForm ? <input type="text" name="category" value={form.category} required minLength={4} pattern="^[A-Za-z][A-Za-z0-9]*" onChange={(e) => handleChange(e)}  className="focus:border-orange rounded-lg h-10 outline-none border w-full border-na3ne3i" /> : <input type="text" name="category" value={form.category} required minLength={4} disabled readOnly className="rounded-lg h-10 outline-none border w-full border-na3ne3i bg-zinc-300" />}
                <p className="text-na3ne3i font-medium mt-5">Sous-catégorie:</p>
                {props.addForm ? <input type="text" name="subcategory" value={form.subcategory} required minLength={4} pattern="^[A-Za-z][A-Za-z0-9]*" onChange={(e) => handleChange(e)}  className="focus:border-orange rounded-lg h-10 outline-none w-full border border-na3ne3i" /> : <input type="text" name="subcategory" value={form.subcategory} required minLength={4} disabled  readOnly className="rounded-lg h-10 outline-none w-full border bg-zinc-300 border-na3ne3i" />}
                <p className="text-na3ne3i font-medium mt-5">Disponibilité:</p>
                <label className="text-third">
                <input type="radio" name="availability" value='available' className="mr-1 ml-3" checked={form.availability === 'available'} onChange={e => handleRadioChange(e)} />Disponible
                </label>
                <label className="text-third">
                <input type="radio" name="availability" value='unavailable' className="mr-1 ml-3" checked={form.availability === 'unavailable'} onChange={e => handleRadioChange(e)} />Sur commande</label>
                <button type="button" className="absolute top-2 right-2 border px-1 border-zinc-400 text-zinc-500 font-medium text-sm rounded-lg hover:bg-zinc-500 hover:text-white hover:border-zinc-500" onClick={e => handlePreview()}>Aper&ccedil;u</button>
                <button type="submit" className="mx-auto h-fit w-fit bg-na3ne3i shadow-[0px_3px_10px_rgba(25,98,102,0.5)]  text-white p-3 rounded-lg font-medium text-sm md: xl:text-lg hover:bg-orange transition-all hover:shadow-[0px_3px_10px_rgba(249,191,135,0.5)] hover:scale-105 whitespace-nowrap mt-8">{props.addForm ? 'Ajouter le produit' : 'Enregistrer les modifications'}</button>
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
