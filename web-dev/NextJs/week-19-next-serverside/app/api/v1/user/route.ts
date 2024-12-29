import { NextResponse } from "next/server";


// can't use page.tsx as it is treated as a component file and will not return objects
//route.ts(not tsx we won't be dealing with xml) deals with backend handler
// there will be multiple exports of handlers that's why we don't export by default
export function GET(){//must be in caps
    return NextResponse.json({
        name: "soham",
        email: "soham@gmail.com"
    })
}
export function POST(){
    return NextResponse.json({
        name: "soham post",
        email: "soham@gmail.com"
    })
}
export function PUT(){
    return NextResponse.json({
        name: "soham put",
        email: "soham@gmail.com"
    })
}
export function DELETE(){
    return NextResponse.json({
        name: "soham delete",
        email: "soham@gmail.com"
    })
}