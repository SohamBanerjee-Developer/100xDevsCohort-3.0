"use client"

import axios from "axios"
import { useRef } from "react"

export default function signin(){
    const emailRef = useRef({})
    const passwordRef = useRef({})
    return( <div className="w-screen h-screen flex justify-center items-center">
    <div className="bg-slate-900 w-80 h-1/3 flex justify-center items-center rounded-md p-4 border-2 border-white border-md">
    <div className="h-full">
        <input className="block py-2 px-4   rounded-md w-64 mt-4 mb-4 text-black" type="text" placeholder="email" onChange={(e)=>{
            emailRef.current = e.target.value
        }}></input><br/>
        <input className="block rounded-md w-64 py-2 px-4 text-black" type="password" placeholder="password" onChange={(e)=>{
            passwordRef.current = e.target.value
        }}></input>
        <button className="mt-8 ml-20 bg-black py-3 text-md px-5 rounded-md" onClick={()=>{
            axios.post("http://localhost:3000/api/v1/signup", {
                email:emailRef.current,
                password: passwordRef.current
            })
        }}
        >SignIn</button>
    </div>
    </div>
    </div>)
}