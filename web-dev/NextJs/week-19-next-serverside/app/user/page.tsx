// "use client"
//because by default a nextjs component is serverside and things like useEffect and useState only works in Client component
import axios from "axios"
import { log } from "console"
// import { useEffect, useState } from "react"

export default async function user(){
    const response = await axios.get("http://localhost:3000/api/v1/user")//here multiple fetches won't happen without useEffect 
    //as the components are rendered on server and there is no useState() here
    const data = response.data
    //harkirat: since the function is async an async component will not come on client but whatever logic written here will run on server
    // so the initial HTML itself will return the data
    console.log(data);//not logged on the browser but in the terminal or server
    
    return <div>
        user page<br/>
        {data?.name}<br/>
        {data?.email}
    </div>
}