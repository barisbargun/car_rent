import { Response } from "express";
export const makeJWTCookie = (res: Response, refreshToken: string) => {
  res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });
}

export const clearJWTCookie = (res: Response) => {
  res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' });
}
