import PageView from "../components/PageView"
import AdminNavbar from "../components/AdminNavbar"
import { useState } from "react"
import { ProductsContext } from "../utils/ProductsContext"
import LoadingAnimation from "../components/LoadingAnimation"

export default function Admin(admindata){

    const [value,setValue] = useState([])
    const [selection,setSelection] = useState(1)
    const [loggedIn,setLoggedIn] = useState(false)
    const [login,setLogin] = useState({username: '', password: ''})
    const [adminLoading,setAdminLoading] = useState(false)

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
            setAdminLoading(true)
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
        setAdminLoading(false)
    }

    return(
        <div className="bg-white h-screen w-screen flex flex-nowrap">
            {adminLoading ? <LoadingAnimation key='admin' bgOpacity={true} /> : null}
            {!loggedIn ? 
            <div className="relative w-screen h-screen flex justify-center items-center bg-third"> 
            <form className="relative w-5/6 sm:w-4/6 xl:w-2/6 h-fit bg-white grid p-5 sm:p-14 rounded-lg shadow-[0_0px_40px_15px_rgba(0,0,0,0.4)]" action='submit' onSubmit={e => {
            e.preventDefault()
            handleSubmit()
        }}>
                <label for="username" className="text-third font-bold ">Nom d'utilisateur:</label>
                <input type="text" name="username" id="username" value={login.username} onChange={e => handleChange(e)} className='rounded-lg w-full h-10 mb-8 outline-none border-2 border-third' required minLength={4} />
                <label for="password" className="text-third font-bold ">Mot de passe:</label>
                <input type="password" name="password" id="password" value={login.password} onChange={e => handleChange(e)}  className='rounded-lg w-full h-10 outline-none border-2 border-third' required minLength={4} />
                <button type="submit" className="bg-third text-white mt-16 w-fit h-fit px-4 py-2 shadow-[0_3px_30px_5px_rgba(0,0,0,0.6)] rounded-lg mx-auto text-md font-bold hover:scale-105 hover:bg-yellow-500 hover:shadow-[0_0px_25px_10px_rgba(255,235,59,0.4)] hover:text-white">Connexion</button>
            </form> 
            </div>
            : 
            <ProductsContext.Provider value={{ value,setValue }}>
                <AdminNavbar selected={selection} handleClick={handleClick} />
                <PageView selected={selection} />
            </ProductsContext.Provider>}
        </div>
    )//login design
}


export async function getServerSideProps() {
  
        const res = await fetch('http://localhost:3000/api/admindata')
        const { data } = await res.json() 

        return {props: data[0]}

}
