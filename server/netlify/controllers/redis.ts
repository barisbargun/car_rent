import { getRedisValue } from "@/lib";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const getData = async (req: Request, res: Response) => {
  const value = await getRedisValue("car-rent");
  if(value) return res.status(StatusCodes.OK).json(value);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"An error happened while getting value from Redis"})
}

export default getData;