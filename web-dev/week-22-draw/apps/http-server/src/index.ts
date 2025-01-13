import express from "express"
import jwt from "jsonwebtoken"
import {JWT_SECRET} from "./config"
const app = express()


app.post("/signUp", async (req, res)=>{
    const {email, password} = req.body

})

app.post("/signIn", async (req, res)=>{
    const userId = 1
    jwt.sign({
        userId
    },JWT_SECRET)

})

app.get("/room", authMiddlewire, async (req, res)=>{
    
})
