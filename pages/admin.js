import PageView from "../components/PageView"
import AdminNavbar from "../components/AdminNavbar"
import { useEffect, useState } from "react"
import { ProductsContext } from "../utils/ProductsContext"
import LoadingAnimation from "../components/LoadingAnimation"
import Notification from '../components/Notification'
import { NotificationContext } from '../utils/NotificationContext'
import { LoadingContext } from "../utils/LoadingContext"
import { PagesContext } from "../utils/PagesContext"
import { PageSelectionContext } from "../utils/PageSelectionContext"
import { RenderedArrayContext } from "../utils/RenderedArrayContext"

export default function admin(admindata){

    const [value,setValue] = useState([])
    const [selection,setSelection] = useState(1)
    const [loggedIn,setLoggedIn] = useState(false)
    const [login,setLogin] = useState({username: '', password: ''})
    const [adminLoading,setAdminLoading] = useState(false)
    const [appear,setAppear] = useState({display: false, action: ''})
    const [loadingContext,setLoadingContext] = useState(false)
    const [pages,setPages] = useState(0)
    const [pageSelection,setPageSelection] = useState(null)
    const [renderedArray,setRenderedArray] = useState([])

    useEffect(() => {
        if (value.length < 1){
            getProducts()
        }else{
            let count = Math.ceil(value.length / 8)
            setPages(count)
            setPageSelection(0)
        }
    },[value])

    useEffect(() => {
        let count = pageSelection * 7
        let arr = value.filter((item,index) => index >= count && index < count + 7)
        setRenderedArray(arr)
        console.log(value);
    },[pageSelection])

    const getProducts = async () => {
        try{
            const res = await fetch('api/products',{
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            })
            const { data } = await res.json()
            setValue(data)
            setAdminLoading(false)
            setLoadingContext(false)}
            
            catch(error){
                console.error(error)
            }
    }
    
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
             if (value.length < 1) {setAdminLoading(true)
            setLoadingContext(true)}
            setLoggedIn(true)
            
        }
    }

    

    return(
        <div className="bg-white relative h-screen w-screen flex flex-nowra overflow-hidden">
            {adminLoading ? <LoadingAnimation key='admin' bgOpacity={true} /> : null}
            {!loggedIn ? 
            <div className="relative w-screen h-screen flex justify-center items-center bg-third"> 
            <form className="relative w-5/6 sm:w-4/6 xl:w-2/6 h-fit bg-white grid p-5 sm:p-14 rounded-3xl shadow-[0_0px_80px_45px_rgba(0,0,0,0.4)]" action='submit' onSubmit={e => {
            e.preventDefault()
            handleSubmit()
        }}>
                <p className="font-extrabold text-xl mb-10 mx-auto text-third text-center">Connexion en tant qu&apos;administateur de QMS</p>
                <label className="text-third font-bold ">Nom d&apos;utilisateur:
                <input type="text" name="username" value={login.username} onChange={e => handleChange(e)} className='rounded-lg w-full h-10 mb-8 outline-none border-2 border-third' required minLength={4} />
                </label>
                <label className="text-third font-bold ">Mot de passe:
                <input type="password" name="password" value={login.password} onChange={e => handleChange(e)}  className='rounded-lg w-full h-10 outline-none border-2 border-third' required minLength={4} />
                </label>
                <button type="submit" className="bg-third text-white mt-16 w-fit h-fit px-4 py-2 shadow-[0_3px_30px_5px_rgba(0,0,0,0.6)] rounded-lg mx-auto text-md font-bold hover:scale-105 hover:bg-yellow-500 hover:shadow-[0_0px_25px_10px_rgba(255,235,59,0.4)] hover:text-white">Connexion</button>
            </form> 
            </div>
            : 
            <ProductsContext.Provider value={{ value,setValue }}>
            <NotificationContext.Provider value={{ appear,setAppear }}>
            <LoadingContext.Provider value={{ loadingContext,setLoadingContext }}>
            <PagesContext.Provider value={{ pages,setPages }}>
            <PageSelectionContext.Provider value={{ pageSelection,setPageSelection }}>
            <RenderedArrayContext.Provider value={{ renderedArray,setRenderedArray }}>
                <AdminNavbar selected={selection} handleClick={handleClick} />
                <PageView selected={selection} />
                <Notification />
            </RenderedArrayContext.Provider>
            </PageSelectionContext.Provider>
            </PagesContext.Provider>
            </LoadingContext.Provider>
            </NotificationContext.Provider>
            </ProductsContext.Provider>}
        </div>
    )//login design
}


export async function getServerSideProps() {
        try {
            const res = await fetch('https://vsdfgdgdfhfdhfghfghftghf.vercel.app/api/admindata')
            const { data } = await res.json() 

            return {props: data[0]}    
        } catch (error) {
            console.error(error)
        }  

}
