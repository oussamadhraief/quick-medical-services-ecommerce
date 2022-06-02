import { useEffect } from "react"


export default function Categories(){

    useEffect(() => {
        location.href = '/products?page=0'
    })

    return(null)
}