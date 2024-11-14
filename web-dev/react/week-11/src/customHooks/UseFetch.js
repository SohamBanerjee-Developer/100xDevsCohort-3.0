import { useEffect, useState } from "react"

export default function useFetch(url){
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    async function getData(){
        setLoading(true)
        const response = await fetch(url)
        const value = await response.json()
        setLoading(false)
        setData(value)
    }
    useEffect(()=>{
        getData()
    },[url])//so that the function runs whenever the url changes not just only initial render
    return {
        data,
        loading
    }
}