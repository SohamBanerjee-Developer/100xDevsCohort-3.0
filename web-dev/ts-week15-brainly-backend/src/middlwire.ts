import { NextFunction, Request, Response } from "express";
import jwt, { decode } from 'jsonwebtoken'

export function authMiddlewire(req: Request, res: Response, next: NextFunction){
    const token = req.headers.token
    const decoded = jwt.verify(token as string, process.env.JWT_USER_SECRET as string)//avoiding type errors
    if(decoded){
        //@ts-ignore todo: add overwrite
        req.userId = decoded.id
        next()
    }else{
        res.status(403).json({
            message: "you are not signed in"
        })
    }

}