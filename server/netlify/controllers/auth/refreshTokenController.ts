import jwt from "jsonwebtoken";
import accessTokenSettings from "@/config/tokens/accessTokenConfig";
import User from "@/models/User";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { hasEnumList } from "@/lib";
import { ROLE_LIST } from "@/constants/enum";

const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(StatusCodes.FORBIDDEN);
  const refreshToken = cookies.jwt;

  try {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
      async (err: any, decoded: any) => {
        if (err) return res.sendStatus(StatusCodes.LOCKED);

        const [foundRefreshToken, foundUser] = await Promise.all([
          User.findOne({ refreshToken: refreshToken }).exec(),
          User.findById(decoded.id).exec()
        ])
        if (!foundRefreshToken || !hasEnumList(foundUser?.role!, ROLE_LIST)) {

          if (foundUser) {
            foundUser.refreshToken = "";
            await foundUser.save();
          }
          return res.sendStatus(StatusCodes.FORBIDDEN);
        }

        const accessToken = accessTokenSettings(decoded.id, foundUser!.role);

        return res.status(StatusCodes.OK).json({ token: accessToken });
      }
    );
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }

}

export default handleRefreshToken;