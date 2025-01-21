import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from '@repo/backend-common/config'


export default function authMiddlewire(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"] ?? ""; // so that the type of the token variable is always not string | undefined
  const decoded = jwt.verify(token, JWT_SECRET); // because jwt.verify accepts only type dtring in the first argument
  if (decoded) {
    //@ts-ignore TODO: fix the below types error
      req.userId= decoded.userId
    next();
    res.json({
      message: "hello",
    })
    }else{
        res.status(403).json({
            message: "unauthorized"
        })
  }
}
