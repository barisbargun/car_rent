import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "@/models";

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(StatusCodes.UNAUTHORIZED);
  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!,
    async (err: any, decoded: any) => {
      if (err) return res.sendStatus(StatusCodes.UNAUTHORIZED);

      const resUser = await User.findById(decoded.UserInfo.id);
      if (!resUser) return res.sendStatus(StatusCodes.UNAUTHORIZED);

      res.locals.userId = resUser.id;
      next();
    }
  );
}

export default verifyJWT;