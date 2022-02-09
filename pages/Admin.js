import PageView from "../components/PageView"
import AdminNavbar from "../components/AdminNavbar"
import { useState } from "react"
import { ProductsContext } from "../utils/ProductsContext"
import Image from "next/image"

export default function Admin(admindata){

    const [value,setValue] = useState([])
    const [selection,setSelection] = useState(1)
    const [loggedIn,setLoggedIn] = useState(false)
    const [login,setLogin] = useState({username: '', password: ''})

    function handleClick(id){
        setSelection(id)
    }

    function handleChange(e){
        setLogin(
            {...login,
            [e.target.name]: e.target.value}
        )
    }

    const handleSubmit = () => {
        if(login.username == admindata.username && login.password == admindata.password){
            setLoggedIn(true)
            getProducts()
        }
    }

    const getProducts = async () => {
        const res = await fetch('http://localhost:3000/api/products',{
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
        const { data } = await res.json()
        setValue(data)
    }

    return(
        <div className="bg-white h-screen w-screen flex flex-nowrap" action='submit' onSubmit={e => {
            e.preventDefault()
            handleSubmit()
        }}>
            {!loggedIn ? 
            <div className="relative w-screen h-screen flex justify-center items-center bg-zinc-700"> 
            <form className="w-5/6 sm:w-4/6 xl:w-2/6 h-fit bg-gray-700 grid p-5 sm:p-14 rounded-lg shadow-2xl">
                <label for="username" className="text-white font-bold ">Nom d'utilisateur:</label>
                <input type="text" name="username" id="username" value={login.username} onChange={e => handleChange(e)} className='rounded-lg w-full h-10 mb-5 outline-none' required minLength={4} />
                <label for="password" className="text-white font-bold ">Mot de passe:</label>
                <input type="password" name="password" id="password" value={login.password} onChange={e => handleChange(e)}  className='rounded-lg w-full h-10 outline-none' required minLength={4} />
                <button type="submit" className="bg-yellow-500 mt-14 w-fit h-fit px-4 py-2 rounded-lg mx-auto shadow-[0_0px_30px_5px_rgba(249,229,22,0.4)] text-md font-bold hover:scale-105 hover:bg-zinc-700 hover:shadow-[0_0px_15px_5px_rgba(255,255,255,0.4)] hover:text-white">Connexion</button>
            </form> 
            </div>
            : 
            <ProductsContext.Provider value={{ value,setValue }}>
                <AdminNavbar selected={selection} handleClick={handleClick} />
                <PageView selected={selection} />
            </ProductsContext.Provider>}
        </div>
    )
}


export async function getServerSideProps() {
  
        const res = await fetch('http://localhost:3000/api/admindata')
        const { data } = await res.json() 

        return {props: data[0]}

}
