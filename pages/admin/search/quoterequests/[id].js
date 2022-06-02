import AdminMenu from "../../../../components/AdminMenu"
import { useState,useRef,useCallback } from "react"
import Notification from '../../../../components/Notification'
import AdminNavbar from '../../../../components/AdminNavbar'
import { NotificationContext } from '../../../../utils/NotificationContext'
import { LoadingContext } from "../../../../utils/LoadingContext"
import { PagesContext } from "../../../../utils/PagesContext"
import { PageSelectionContext } from "../../../../utils/PageSelectionContext"
import { SearchContext } from "../../../../utils/SearchContext"
import useInfiniteScrolling from "../../../../utils/useInfiniteScrolling"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import QuotesTable from "../../../../components/QuotesTable"




export default function Admin(){
    const { data: session, status } = useSession()

    const router = useRouter()
    
    const [adminLoading,setAdminLoading] = useState(true)
    const [appear,setAppear] = useState({display: false, action: ''})
    const [loadingContext,setLoadingContext] = useState(false)
    const [pages,setPages] = useState(0)
    const [open,setOpen] = useState(true)
    const [pageSelection,setPageSelection] = useState(0)
    const [searchContext,setSearchContext] = useState('')
    const query = '/api/search/quoterequests/'+router.query.id+'?page='
    const { loading, Error, value, hasMore, setValue} = useInfiniteScrolling(pageSelection,setAdminLoading,query)


    
    const observer = useRef()

    const lastElementRef = useCallback(node => {
        if(loading) return 
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting && hasMore){
                setPageSelection(prev => prev + 1)
            }
        })
        if(node) observer.current.observe(node)
    },[loading,hasMore])
    
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
                <NotificationContext.Provider value={{ appear,setAppear }}>
                <LoadingContext.Provider value={{ loadingContext,setLoadingContext }}>
                <PagesContext.Provider value={{ pages,setPages }}>
                <PageSelectionContext.Provider value={{ pageSelection,setPageSelection }}>
                    <AdminMenu selected={9} open={open} setOpen={setOpen} />
                    {value.length <1  ? <p className="w-full text-center h-fit mx-auto font-medium text-third mt-2">Pas de résultats trouvés :&#x28; ...</p> :
                    <QuotesTable value={value} setValue={setValue} lastElementRef={lastElementRef} loading={loading}/>}
                    <Notification />
                </PageSelectionContext.Provider>
                </PagesContext.Provider>
                </LoadingContext.Provider>
                </NotificationContext.Provider>
            </div>
                </SearchContext.Provider>

        </div>
    )

    
}

export async function getServerSideProps() {
    return { props: {hi: 'hi'}}
}