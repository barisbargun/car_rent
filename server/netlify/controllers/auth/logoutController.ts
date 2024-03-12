import { clearJWTCookie } from "@/config/cookieOptions";
import { User } from "@/models";
import { Response, Request } from "express"
import { StatusCodes } from "http-status-codes"
import bcrypt from "bcryptjs";

const logout = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) res.sendStatus(StatusCodes.NOT_ACCEPTABLE);
  try {
    const user = await User.findOne({ refreshToken: cookies.jwt }).exec();
    if (user) {
      user.refreshToken = await bcrypt.hash(user.username,8);
      await user.save();
    }

    clearJWTCookie(res);
    res.sendStatus(StatusCodes.OK);
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }

}

export default logout;