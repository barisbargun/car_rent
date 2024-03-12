import allowedOrigins from "@/config/allowedOrigins";
import { Request, Response } from "express";
import { NextFunction } from "express";

const credentials = (req:Request, res:Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', true as any)
  }
  next();
}

export default credentials;