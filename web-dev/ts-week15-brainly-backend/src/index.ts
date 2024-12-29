//standard require syntax ignore types and some old libraries doesn't have ts declaration files so you 
// can not import types from them without installing npm i @types/libraries @ts-ignore
// @ts-ignore ignores types errors in the next line
import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import {z} from "zod"
import userRouter from "./userRouter"
import 'dotenv/config'

console.log(`${process.env.MONGO_URL}`);

const app = express()
app.use(express.json())//without it req.body will be undefined
app.use("/api/v1/user", userRouter)

async function main(){
await mongoose.connect(`${process.env.MONGO_URL}`)//otherwise giving types error
console.log("connected");
app.listen(3000)
}
main()
