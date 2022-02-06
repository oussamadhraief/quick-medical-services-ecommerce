import { useState } from "react"
import Image from "next/image"
import remove from '../assets/remove.png'

export default function AddProductView(){

    const [form,setForm] = useState({name:'',sizes:[0],description:'',category:'',subcategory:''})

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

    return (
        <div className="h-full overflow-y-scroll w-full border-2 border-zinc-300 rounded-md">
            <form className="grid w-full h-fit bg-gray-800 sm:w-4/6 xl:w-2/6 p-10 mx-auto rounded-xl mt-10 mb-10" action="submit" onSubmit={e => {
                e.preventDefault()
                handleSubmit()
            }}>
                <p className="text-white font-medium">Nom:</p>
                <input type="text" name="name" value={form.name} onChange={(e) => handleChange(e)}  className="rounded-lg h-10 outline-none" />
                <p className="text-white font-medium mt-5">Taille&#40;s&#41;:</p>
                {form.sizes.map((item,index) => {
                    return (<div className="w-full flex flex-nowrap justify-center items-center my-1">
                                <input type="number" name="sizes" min={0} value={item} onChange={(e) => handleSizesChange(e,index)} className="w-5/12 ml-8 rounded-lg mr-2 outline-none h-10 text-center" />
                                <Image src={remove} alt="remove" width={20} height={20} layout="fixed" className="hover:cursor-pointer" onClick={e => handleRemove(index)}/>
                            </div>
                    )
                })}
                <button onClick={e => { 
                    e.preventDefault()
                    handleClick()
                    }} className="w-fit mx-auto bg-white px-3 font-bold text-zinc-700 py-1 rounded-lg h-fit" >+</button>
                <p className="text-white font-medium mt-5">Description:</p>
                <input type="text" name="description" value={form.description} onChange={(e) => handleChange(e)}  className="rounded-lg h-10 outline-none" />
                <label for="images" className="mx-auto bg-yellow-600 mt-5 rounded-lg px-3 py-2 text-white text-xs font-medium hover:cursor-pointer hover:bg-gray-500 hover:scale-105">Ajouter une image</label>
                <input type="file" name="images" id="images" value="" className="hidden" onChange={e => handleImageInput()} />
                <p className="text-white font-medium mt-5">Categorie:</p>
                <input type="text" name="category" value={form.category} onChange={(e) => handleChange(e)}  className="rounded-lg h-10 outline-none" />
                <p className="text-white font-medium mt-5">Sous-categorie:</p>
                <input type="text" name="subcategory" value={form.subcategory} onChange={(e) => handleChange(e)}  className="rounded-lg h-10 outline-none" />
                <button type="submit" className="mx-auto h-fit w-fit bg-emerald-700 p-3 rounded-lg font-medium text-lg hover:bg-green-700 hover:scale-105 text-white mt-5">Ajouter le produit</button>
            </form>
        </div>
    )
}
