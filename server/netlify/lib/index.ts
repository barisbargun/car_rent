import { StatusCodes } from "http-status-codes";
import { Response } from "express";
import mongoose, { Model } from "mongoose";
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

export const setRedisValue = async () => {
  try {
    const modelNames = Object.keys(mongoose.models);
    let promises: any = {};
    const acceptedModels = ["menubar_tab", "footer_tab", "carousel", "nav_item", "review", "service", "header", "site_value"];
    for (const modelName of modelNames) {
      if (acceptedModels.includes(modelName.toLowerCase())) {
        const model = mongoose.model(modelName)
        let data: any = model.find({});
        const paths = model.schema.paths;
        if (paths.img)
          data = data.populate("img");
        if (paths.logoImg)
          data = data.populate("logoImg");
        if (paths.navImg)
          data = data.populate("navImg");
        if (paths.serviceImg)
          data = data.populate("serviceImg");
        if (paths.parent)
          data = data.populate("parent");

        if (model.schema.paths.children) {
          try {
            let data2 = data.clone();
            if (modelName == "Menubar_tab") {
              data2 = await data2.populate([
                { path: "children", populate: { path: "img" } },
                { path: "children", populate: { path: "children", populate: { path: "img" } } }
              ]);

            } else {
              data2 = await data2.populate({ path: "children", populate: { path: "img" } });
            }

            data = data2;
          } catch (error) {
            data = data.populate("children");
          }
        }
        promises[modelName.toLowerCase()] = await data;
      }
    }
    const redis = (await import("./redis/index")).redis;
    await redis.set("car-rent", JSON.stringify(promises));
  } catch (error) {
    console.log(error);
  }

}

export const getRedisValue = async (key: string) => {
  const redis = (await import("./redis/index")).redis;
  const result = (await redis.get(key));
  const json = typeof result == "string" ? JSON.parse(result) : result;
  return json;
}