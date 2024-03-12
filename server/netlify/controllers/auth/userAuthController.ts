import bcrypt from "bcryptjs";

import User from "@/models/User";
import { makeJWTCookie } from "@/config/cookieOptions"
import { StatusCodes } from "http-status-codes";
import { accessTokenConfig, refreshTokenConfig } from "@/config";
import { Request, Response } from "express";

const handleUserAuth = async (req: Request, res: Response) => {

  const { username, password }: { username: string, password: string } = req.body;
  if (!username || !password) return res.sendStatus(StatusCodes.FORBIDDEN)

  const foundUser = await User.findOne({ username: username }).exec();
  if (!foundUser) return res.sendStatus(StatusCodes.UNAUTHORIZED);

  const match: boolean = await bcrypt.compare(password, foundUser.password);

  if (match) {
    try {
      const accessToken = accessTokenConfig(foundUser.id, foundUser.role);
      const refreshToken = refreshTokenConfig(foundUser.id);

      foundUser.refreshToken = refreshToken;
      await foundUser.save();

      makeJWTCookie(res, refreshToken);
      return res.status(StatusCodes.OK).json({ refreshToken, accessToken });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"User model error"});
    }
  }
  else
    return res.sendStatus(StatusCodes.UNAUTHORIZED);
}

export default handleUserAuth;