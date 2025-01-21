import express, { response } from "express"
import jwt from "jsonwebtoken"
import authMiddlewire from "./middlewire"
import {z} from 'zod'
import bcrypt from 'bcrypt'
import {JWT_SECRET} from '@repo/backend-common/config'
import {signUpSchema, signInSchema} from "@repo/common/types"
const app = express()
app.post("/signUp", async (req, res)=>{
    const parsed = signUpSchema.safeParse(req.body)// you can add extra fields
    //we use safeParse() over parse() bcoz it returns a object which contains data , error but doesn't return error like parse() which crashes the server if there's incorrect input
    //parse() returns data or error  safeParse returns a object which has two keys { success: true; data: "tuna" } or { success: false; error: ZodError }
     if(!parsed.success){
        res.json({
            message: "invalid format"
        })
        return
     }

    const {email, password} = req.body
    const hashedPassword = bcrypt.hash(password, 5)
    try {
        //db call       
    } catch (error) {
        response.json({
            message: "user with this credential already exits",
            error: error,
        })
        return
    }
    res.json({
        message: "signed up"
    })

})

app.post("/signIn", async (req, res)=>{
    const parsed = signInSchema.safeParse(req.body)
    if(!parsed.success){
        res.json({
            message: "invalid format"
        })
        return
    }

    const {email, password} = req.body

    const userId = 1
    jwt.sign({
        userId
    },JWT_SECRET)

})

app.get("/room", authMiddlewire, async (req, res)=>{
    
})
