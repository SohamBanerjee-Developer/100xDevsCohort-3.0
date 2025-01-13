"use client"
import axios from "axios"
//these components are demo to show that we can't use traditional token authorization in nextJS

export default function signin(){
    return <div>
        <input></input>
        <input></input>
        <div>
            <button onClick={async ()=>{
                const response = await axios.post("http://localhost:3000/api/signin",{
                    username: "asd",
                    password: "asd"
                })
                localStorage.setItem("token", response.data.token)
            }}> signin</button>
        </div>
    </div>
}