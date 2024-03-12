import { ROLE_LIST } from "@/constants/enum";
import { hasEnumList } from "@/lib";
import { User } from "@/models";
import { NextFunction } from "express";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const verifyRoles = async (_req: Request, res: Response, next: NextFunction, role: ROLE_LIST) => {
  try {
    const user = await User.findById(res?.locals?.userId);
    if (!user || !hasEnumList(user?.role!, ROLE_LIST)) return res.sendStatus(StatusCodes.NOT_ACCEPTABLE);

    if (user.role <= role) {
      next();
    } else {
      return res.status(StatusCodes.FORBIDDEN).json({message:"Not authorized for this role"});
    }
  } catch (error) {
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

export const verifyEditorRole = (req: Request, res: Response, next: NextFunction) => {
  verifyRoles(req, res, next, ROLE_LIST.EDITOR)
}

export const verifyAdminRole = (req: Request, res: Response, next: NextFunction) => {
  verifyRoles(req, res, next, ROLE_LIST.ADMIN)
}

export default verifyRoles;