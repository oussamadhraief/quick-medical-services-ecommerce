import AdminNavbar from "../../../components/AdminNavbar"
import AddProductView from "../../../components/AddProductView"
import { useEffect, useState } from "react"
import { ProductsContext } from "../../../utils/ProductsContext"
import LoadingAnimation from "../../../components/LoadingAnimation"
import Notification from '../../../components/Notification'
import { NotificationContext } from '../../../utils/NotificationContext'
import { LoadingContext } from "../../../utils/LoadingContext"
import { PagesContext } from "../../../utils/PagesContext"
import { PageSelectionContext } from "../../../utils/PageSelectionContext"
import { RenderedArrayContext } from "../../../utils/RenderedArrayContext"
import { SearchContext } from "../../../utils/SearchContext"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'


export default function Admin(){
    const { data: session, status } = useSession()

    const router = useRouter()
    
    const [value,setValue] = useState([])
    const [adminLoading,setAdminLoading] = useState(true)
    const [appear,setAppear] = useState({display: false, action: ''})
    const [loadingContext,setLoadingContext] = useState(true)
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
            const res = await fetch('/api/products',{
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
    
    if(status == 'loading') return  (
        <div className='bg-white h-screen w-screen overflow-hidden flex items-center absolute z-[9999] left-0 top-0'>
          <div id="contact-loading" className="w-fit h-fit bg-white/70 z-[9999] mx-auto ">
            <div className="reverse-spinner "></div>
          </div>
        </div>
       )
    
    if(status == 'unauthenticated'){
    router.push('/login')
        return
    }

    if(status == 'authenticated' && !session.user.isAdmin){
        router.push('/')
        return
    }

    if(status == 'authenticated' &&  session.user.isAdmin)
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
            {adminLoading && status !== 'loading' ? <LoadingAnimation key='admin' bgOpacity={true} /> : null}
            
            <ProductsContext.Provider value={{ value,setValue }}>
            <NotificationContext.Provider value={{ appear,setAppear }}>
            <LoadingContext.Provider value={{ loadingContext,setLoadingContext }}>
            <PagesContext.Provider value={{ pages,setPages }}>
            <PageSelectionContext.Provider value={{ pageSelection,setPageSelection }}>
            <RenderedArrayContext.Provider value={{ renderedArray,setRenderedArray }}>
            <SearchContext.Provider value={{ searchContext,setSearchContext }}>
                <AdminNavbar selected={1} />
                <AddProductView addForm={true} />
                <Notification />
            </SearchContext.Provider>
            </RenderedArrayContext.Provider>
            </PageSelectionContext.Provider>
            </PagesContext.Provider>
            </LoadingContext.Provider>
            </NotificationContext.Provider>
            </ProductsContext.Provider>
        </div>
    )

    
}

export async function getServerSideProps() {
    return { props: {hi: 'hi'}}
}
