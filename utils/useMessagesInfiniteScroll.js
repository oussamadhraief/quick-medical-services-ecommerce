import { useEffect } from "react";
import { useState } from "react";

function useMessagesInfiniteScroll(pageNumber,setAdminLoading) {

    const [loading,setLoading] = useState(true)
    const [Error,setError] = useState(false)
    const [value,setValue] = useState([])
    const [hasMore,setHasMore] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        setError(false)
        async function fetchData() {
            try {
                const res = await fetch('/api/contact?page='+pageNumber)
                const { data,number,index } = await res.json()
                setValue(prev => {
                    return [...prev, ...data]
                })
                setAdminLoading(false)
                setHasMore(data.length > 0)
                setLoading(false)
            } catch (error) {
                setError(true)
            }
            
        }
        fetchData()
    },[pageNumber])

    return {loading, Error, value, hasMore, setValue}
}

export default useMessagesInfiniteScroll;