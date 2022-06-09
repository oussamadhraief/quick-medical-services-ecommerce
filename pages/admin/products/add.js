import AdminMenu from "../../../components/AdminMenu"
import AddProductView from "../../../components/AddProductView"
import { useEffect, useState } from "react"
import { ProductsContext } from "../../../utils/ProductsContext"
import Notification from '../../../components/Notification'
import AdminNavbar from '../../../components/AdminNavbar'
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
    const [appear,setAppear] = useState({display: false, action: ''})
    const [loadingContext,setLoadingContext] = useState(false)
    const [pages,setPages] = useState(0)
    const [pageSelection,setPageSelection] = useState(null)
    const [renderedArray,setRenderedArray] = useState([])
    const [searchContext,setSearchContext] = useState('')
    const [open,setOpen] = useState(true)



    if(status == 'loading') return  (
        <div className='bg-white h-screen w-screen overflow-hidden flex items-center absolute z-[9999] left-0 top-0'>
          <div id="contact-loading" className="w-fit h-fit bg-white/70 z-[9999] mx-auto ">
            <div className="reverse-spinner "></div>
          </div>
        </div>
       )
    
    if(status == 'unauthenticated'){
    router.push('/login')
        return null
    }

    if(status == 'authenticated' && !session.user?.isAdmin){
        router.push('/')
        return null
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
            <RenderedArrayContext.Provider value={{ renderedArray,setRenderedArray }}>
                <AdminMenu selected={1} open={open} setOpen={setOpen} />
                <AddProductView addForm={true} />
                <Notification />
            </RenderedArrayContext.Provider>
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
