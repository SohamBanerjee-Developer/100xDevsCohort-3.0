import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prismaClient = new PrismaClient()   

export async function POST(req: NextRequest){//we get access to req object of type NextRequest
    const {email, password} = await req.json()//how we get acces to body
    console.log(email);
    
    // await prismaClient.user.create({
    //     data:{
    //         email,
    //         password
    //     }
    // })
    
    return NextResponse.json({
        message: "you are signed in"
    })
}