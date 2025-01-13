import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
//these components are demo to show that we can't use traditional token authorization in nextJS

export function GET(req: NextRequest){
const headers = req.headers
console.log(headers);

const token = headers.get("authorization")// way to get headers in next js
console.log(token);

const decoded = jwt.verify(token, "JWT_SECRET")
console.log(decoded);

if(decoded){
    const userId = decoded
    return NextResponse.json({
        avatarurl: "image/cat.png"
    })
}
}