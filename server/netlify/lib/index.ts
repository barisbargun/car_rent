import { StatusCodes } from "http-status-codes";
import { Response } from "express";
import { Model } from "mongoose";
import { PAGE_LIST } from "@/constants/enum";
import { Carousel, FooterLink, Image, MenubarVehicle, NavItem, Service, User } from "@/models";
import Vehicle from "@/models/explore/Vehicle";

export const hasEnumList = <T>(value: number, list: any) => {
  return Object.values(list).includes(value as typeof list);
}

export const responseMessage = (res: Response, statusCode: StatusCodes, message: string) => {
  return res.status(statusCode).json({ message });
}

export const setHeaderValues = async (model: Model<any>) => {
  try {
    const count = await model.countDocuments();

    if (count != 4) {
      const values = Object.values(PAGE_LIST).filter((v) => !isNaN(Number(v))).filter(v => v != 0);
      await Promise.allSettled(values.map(v => model.create({ index: v })))
    }
  } catch (error) {
    console.log(error)
  }

}

export const checkMaximumCount = async (model: Model<any>) => {
  const count = await model.countDocuments();
  let res;
  switch (model) {
    case Image:
      if (count >= 70) res = "Maximum 70 images";
      break;

    case User:
      if (count >= 5) res = "Maximum 5 users";
      break;

    case NavItem:
      if (count >= 6) res = "Maximum 6 nav items";
      break;

    case Carousel:
      if (count >= 12) res = "Maximum 12 carousels";
      break;

    case MenubarVehicle:
      if (count >= 30) res = "Maximum 30 menubar vehicles";
      break;

    case Vehicle:
      if (count >= 80) res = "Maximum 80 vehicles";
      break;

    case Service:
      if (count >= 5) res = "Maximum 5 services";
      break;

    case FooterLink:
      if (count >= 20) res = "Maximum 20 links";
      break;

    default:
      if (count >= 10) res = "Maximum 10 items"
      break;
  }
  if (res) throw res;
}