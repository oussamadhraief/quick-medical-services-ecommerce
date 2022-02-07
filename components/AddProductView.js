import { useState } from "react"
import Image from "next/image"
import remove from '../assets/remove.png'
import ProductPreview from './ProductPreview'
import product from '../assets/productPreview.png'

export default function AddProductView(){

    const [form,setForm] = useState({name:'',sizes:[0],description:'',category:'',subcategory:'',availability:'available'})
    const [productImage,setProductImage] = useState(product)
    const [preview,setPreview] = useState({name:'Instrument médical',sizes:[1,2,3,4],description:'Vous allez voir les informations du produit ici en cliquant sur Aperçu',availability:'available',productImage: product})

    function handleChange(event){
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

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
    }
    
    function handleRemove(id){
        let newSizes = form.sizes.filter((item,index) => index != id)
        setForm({
            ...form,
            sizes: newSizes
        })
    }

    const handleSubmit = async () => {
        try {
            let produit = {
                reference: '1.1.1.1',
                type: 'product',
                ...form
            }
            const res = await fetch('api/products', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(produit)
            }).then((res) =>{
                console.log(res.status);
            }
            )
            
            
        } catch (error) {
            console.error(error)
        }
    }

    function handleRadioChange(e){
        setForm({
            ...form,
            availability: e.target.value
        })
        console.log(e.target.value);
    }

    function handleImageInput(e){

        const reader = new FileReader();
        reader.onload = function () {
            setProductImage(reader.result)
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    function handlePreview(){
        setPreview({
            name: form.name,
            sizes: form.sizes,
            description: form.description,
            availability: availability,
            productImage: productImage
        })
    }

    return (
        <div className="h-full overflow-y-scroll w-full border-2 border-zinc-300 rounded-md flex flex-wrap justify-around pt-20">
            <form className="relative grid w-full h-fit bg-white shadow-3xl sm:w-4/6 xl:w-5/12 pr-10 pl-7 py-10 rounded-xl mb-10" action="submit" onSubmit={e => {
                e.preventDefault()
                handleSubmit()
            }}>
                <div className="w-full h-fit flex flex-nowrap justify-between mt-1 items-center">
                    
                <p className="text-gray-bg-gray-700 font-medium">Nom:</p>
                <input type="text" name="name" value={form.name} onChange={(e) => handleChange(e)}  className="rounded-lg h-10 outline-none w-4/5 ml-3 border-2 border-gray-700" />
                </div>
                <div className="w-full h-fit flex flex-nowrap justify-between mt-5">
                <p className="text-gray-bg-gray-700 font-medium mt-3">Taille&#40;s&#41;:</p>
                <div className="grid w-4/5 h-fit">
                    
               
                {form.sizes.map((item,index) => {
                    return (<div className="w-full flex flex-nowrap justify-center items-center my-1">
                                <input type="number" name="sizes" min={0} value={item} onChange={(e) => handleSizesChange(e,index)} className="w-5/12 ml-8 rounded-lg mr-2 outline-none h-10 text-center border-2 border-gray-700" />
                                <Image src={remove} alt="remove" width={20} height={20} layout="fixed" className="hover:cursor-pointer" onClick={e => handleRemove(index)}/>
                            </div>
                    )
                })}
                <button onClick={e => { 
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
                <div className="w-4/5 h-fit flex justify-center">

                    <label for="images" className="bg-yellow-500 rounded-lg px-3 py-2 text-gray-bg-gray-700 text-xs font-bold hover:cursor-pointer hover:bg-gray-500 hover:text-white hover:scale-105">Ajouter une image</label>
                    <input type="file" name="images" id="images" value="" className="hidden" onChange={e => handleImageInput(e)} />
                </div>
                </div>
                <div className="w-full h-fit flex flex-nowrap justify-between items-center mt-10">
                <p className="text-gray-bg-gray-700 font-medium">Categorie:</p>
                <input type="text" name="category" value={form.category} onChange={(e) => handleChange(e)}  className="rounded-lg h-10 outline-none border-2 w-4/5 border-gray-700" />
                </div>
                <div className="w-full h-fit flex flex-nowrap justify-between items-center mt-10">
                <p className="text-gray-bg-gray-700 font-medium">Sous-categorie:</p>
                <input type="text" name="subcategory" value={form.subcategory} onChange={(e) => handleChange(e)}  className="rounded-lg h-10 outline-none w-4/5 border-2 border-gray-700" />
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
                <button className="absolute top-2 right-2 border-2 px-1 border-zinc-400 text-zinc-500 font-medium rounded-lg hover:bg-zinc-500 hover:text-white hover:border-zinc-500" onClick={e => handlePreview()}>Aper&ccedil;u</button>
                <button type="submit" className="mx-auto h-fit w-fit bg-gray-700 text-white p-3 rounded-lg font-medium text-lg hover:bg-cyan-900 hover:scale-105 text-gray-bg-gray-700">Ajouter le produit</button>
                </div></div>
            </form>
            <ProductPreview productImage={preview.productImage} name={preview.name} sizes={preview.sizes} description={preview.description} availability={preview.availability} />
        </div>
    )
}
