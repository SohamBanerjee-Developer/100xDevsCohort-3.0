import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server";
//these components are demo to show that we can't use traditional token authorization in nextJS

export async function POST(req: NextRequest){
    const {email, password} = await req.json()
    const response =  jwt.sign({
        email
    },"JWT_SECRET")
    return NextResponse.json({
        token: response
    })
}