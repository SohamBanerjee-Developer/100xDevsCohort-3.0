import { PrismaClient } from "@prisma/client";
import express from "express";
const app = express()

const client = new PrismaClient()

app.get('/users', async(req, res)=>{
    const response = await client.user.findMany()
    res.json({
        users: response
    })
})

app.get('/todos/:id', async (req, res)=>{
    const id = req.params.id //always returns a string
    
    const response = await client.user.findFirst({
        where:{
            userId: parseInt(id)//expects a integer as described in schema
        },
        select:{
            todo: true,
            userName: true,
            city: true
        }
    })
    
    res.json({
        response
    })
})

async function createUser(){
    const res = await client.user.findFirst({
        where:{
            userId: 1
        },
        include:{
            todo: true//this works because we have defined  a one to many relationship in the schema
        }
    })
    console.log(res);
    

}
createUser()
app.listen(3000)