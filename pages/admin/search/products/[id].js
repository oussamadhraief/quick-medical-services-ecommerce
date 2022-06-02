import AdminMenu from "../../../../components/AdminMenu"
import ModifyProductsView from "../../../../components/ModifyProductsView"
import { useEffect, useState } from "react"
import { ProductsContext } from "../../../../utils/ProductsContext"
import Notification from '../../../../components/Notification'
import AdminNavbar from '../../../../components/AdminNavbar'
import { NotificationContext } from '../../../../utils/NotificationContext'
import { LoadingContext } from "../../../../utils/LoadingContext"
import { PagesContext } from "../../../../utils/PagesContext"
import { PageSelectionContext } from "../../../../utils/PageSelectionContext"
import { SearchContext } from "../../../../utils/SearchContext"
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
    const [open,setOpen] = useState(true)
    const [editing,setEditing] = useState(false)
    const [pageSelection,setPageSelection] = useState(0)
    const [searchContext,setSearchContext] = useState('')


    
    useEffect(() => {
        fetchData()
    },[router.query.page])
    
    async function fetchData() {
        setLoadingContext(true)
        let querypage = 0
        const id = router.query.id
        setSearchContext(id)
        if(typeof(router.query.page) == 'undefined' ) {
            router.push({
                pathname: router.pathname,  
                query: { id: id,page: 0 }
                }, 
                undefined, { shallow: true }
                )
            }else{
                querypage = router.query.page
            }
        const res = await fetch('/api/search/'+id+'?page='+querypage)
        const { data,number,index } = await res.json()
        let numberOfPages
            if(number> 0){
             numberOfPages = Math.ceil(number /10)
            }else{
                numberOfPages= 1
            }
        if(querypage != index) {
            router.push({
                pathname: router.pathname,
                query: { id: id,page: index }
                }, 
                undefined, { shallow: true }
                )
        }
        setValue(data)
        setPageSelection(index)
        setAdminLoading(false)
        setLoadingContext(false)
        setPages(numberOfPages)
}
    
    if(status == 'loading' || adminLoading) return  (
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

    if(status == 'authenticated' && !session.user?.isAdmin){
        router.push('/')
        return
    }

    if(status == 'authenticated' &&  session.user?.isAdmin)
    return(
        <div className="bg-white relative h-screen w-screen flex-col flex overflow-hidden">
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
            <SearchContext.Provider value={{ searchContext,setSearchContext }}>
            <AdminNavbar open={open} setOpen={setOpen} />
            <div className="bg-white relative h-full w-full grid md:flex md:flex-nowrap overflow-hidden">
                <ProductsContext.Provider value={{ value,setValue }}>
                <NotificationContext.Provider value={{ appear,setAppear }}>
                <LoadingContext.Provider value={{ loadingContext,setLoadingContext }}>
                <PagesContext.Provider value={{ pages,setPages }}>
                <PageSelectionContext.Provider value={{ pageSelection,setPageSelection }}>
                    <AdminMenu selected={9} open={open} setOpen={setOpen} />
                    {value.length <1  ? <p className="w-full text-center h-fit mx-auto font-medium text-third mt-2">Pas de résultats trouvés :&#x28; ...</p> :
                    <ModifyProductsView editing={editing} setEditing={setEditing} />}
                    <Notification />
                </PageSelectionContext.Provider>
                </PagesContext.Provider>
                </LoadingContext.Provider>
                </NotificationContext.Provider>
                </ProductsContext.Provider>
            </div>
                </SearchContext.Provider>

        </div>
    )

    
}

export async function getServerSideProps() {
    return { props: {hi: 'hi'}}
}
