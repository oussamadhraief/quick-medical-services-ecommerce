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
import { SearchContext } from "../utils/SearchContext"
import Head from "next/head"
import { useSession, getSession } from "next-auth/react"
import {checkAdmin} from "../utils/isAdmin"




export default function Admin(props){
    const { data: session, status } = useSession()
    const [isAdmin,setIsAdmin] = useState()
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
    const [searchContext,setSearchContext] = useState({searching: false, value: []})

    useEffect(() => {
        if (value.length < 1){
            getProducts()
        }else{
            let count = 1
            if(searchContext.searching){
                count = Math.ceil(searchContext.value.length / 8)
                if(count > 0) {setPages(count)} else {setPages(1)}
                setPageSelection(0)
            }else
                count = Math.ceil(value.length / 8)
                if(count > 0) {setPages(count)} else {setPages(1)}
                setPageSelection(0)
            }
        },[value,searchContext])

    useEffect(() => {
        if(searchContext.searching){
            let count = pageSelection * 8
            let arr = searchContext.value.filter((item,index) => index >= count && index < count + 8)
            setRenderedArray(arr)
        }else{
            let count = pageSelection * 8
            let arr = value.filter((item,index) => index >= count && index < count + 8)
            setRenderedArray(arr)
        }
    },[pageSelection,value,searchContext])

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
        let mql = window.matchMedia('(max-width: 767px)');
        if(mql.matches)document.getElementById('navbutton').click()
    }

    function handleChange(e){
        setLogin(
            {...login,
            [e.target.name]: e.target.value}
        )
    }

    const handleSubmit = () => {
        if(login.username.toLowerCase().trim() == props.username && login.password == props.password){
             if (value.length < 1) {setAdminLoading(true)
            setLoadingContext(true)}
            setLoggedIn(true)
        }
    }
    useEffect(()=>{
        console.log(session)
        setIsAdmin(checkAdmin(session.user.email))
        console.log(isAdmin)
    },[])
    
    if (typeof window === "undefined") return null
    if(status === 'loading'){
        return <div>loading</div>
    }
    
    if (session && isAdmin){
    return(
        <div className="bg-white relative h-screen w-screen grid md:flex md:flex-nowrap overflow-hidden">
            <Head>
        <title>Admin - QUICK Medical Services</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Medical Supply Store"/>
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/logo.png"></link>
        <meta name="googlebot" content="index, follow"/>
        <meta name="keywords" content="" />
        <meta name='image' content="" />
        <meta itemProp="name" content="QUICK Medical Services"/>
        <meta itemProp="description" content="Medical Supply Store"/>
        <meta property="og:title" content="QUICK Medical Services"/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content=""/>
        <meta property="og:image" content=""/>
        <meta property="og:description" content="Medical Supply Store"/>
        <meta itemProp='name' content="QUICK Medical Services"/>
        <meta itemProp='description' content="Medical Supply Store"/>
        <meta itemProp='image' content=""/>
        <meta name="twitter:card" value="summary_large_image"/>
        <meta name="twitter:title" value="QUICK Medical Services"/>
        <meta name="twitter:description" value="Medical Supply Store"/>
        <meta name="twitter:image" value=""/>
      </Head>
            {adminLoading && status !== 'loading' && isAdmin !== null ? <LoadingAnimation key='admin' bgOpacity={true} /> : null}
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
            <SearchContext.Provider value={{ searchContext,setSearchContext }}>
                <AdminNavbar selected={selection} handleClick={handleClick} />
                <PageView selected={selection} />
                <Notification />
            </SearchContext.Provider>
            </RenderedArrayContext.Provider>
            </PageSelectionContext.Provider>
            </PagesContext.Provider>
            </LoadingContext.Provider>
            </NotificationContext.Provider>
            </ProductsContext.Provider>}
        </div>
    )}
    window.location = '/'
    return <div>deez</div>

}

export async function getServerSideProps(context) {
    return { props: {username: "admin",password: "admin", session: await getSession(context)} }
}