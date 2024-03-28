import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import mongoose, { Model } from "mongoose";
import { PAGE_LIST, ROLE_LIST } from "@/constants/enum";
import { hasEnumList, responseMessage } from "@/lib";
import bcrypt from "bcryptjs";
import { Carousel, FooterLink, FooterTab, Image, MenubarTab, MenubarVehicle, Review, User } from "@/models";
import Vehicle from "@/models/explore/Vehicle";



export const getInfo = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const [editor, user, carousel, menubarTab, menubarVehicle, review, footerTab, footerLink, image, vehicle]
      : { value?: number } =
      await Promise.allSettled([
        User.countDocuments({ role: ROLE_LIST.EDITOR }),
        User.countDocuments({ role: ROLE_LIST.USER }),
        Carousel.countDocuments(),
        MenubarTab.countDocuments(),
        MenubarVehicle.countDocuments(),
        Review.countDocuments(),
        FooterTab.countDocuments(),
        FooterLink.countDocuments(),
        Image.countDocuments(),
        Vehicle.countDocuments()
      ])
    const info: IInfo = {
      users: {
        editor: editor.value || 0,
        user: user.value || 0
      },
      carousel: carousel.value || 0,
      menubar: {
        tab: menubarTab.value || 0,
        vehicle: menubarVehicle.value || 0
      },
      review: review.value || 0,
      footer: {
        tab: footerTab.value || 0,
        link: footerLink.value || 0
      },
      others: {
        images: image.value || 0,
        vehicles: vehicle.value || 0
      }
    };
    res.status(StatusCodes.OK).json(info);
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }

}


/**
 * Get Current User by the locals.userId
 * @param _req 
 * @param res 
 * @param UserModel 
 */
export const getCurrentUser = async (_req: Request, res: Response, model: Model<any>) => {
  try {
    const user = await model.findById(res?.locals?.userId).populate("img");
    if (!user) return res.sendStatus(StatusCodes.NOT_FOUND);
    const { id, username, email, img, role } = user;

    res.status(StatusCodes.OK).json({ id, username, email, img, role });
  } catch (error) {
    console.log(error)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}


/*

Get users

*/
export const getUsers = async (_req: Request, res: Response, model: Model<any>) => {
  try {
    const user = await model.find({}, { password: 0 }).populate("img");
    if (!user) return res.sendStatus(StatusCodes.NOT_FOUND);

    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.log(error)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}


/*

Patch user

*/
export const patchUser = async (req: Request, res: Response, model: Model<any>) => {
  try {
    if (!req?.params?.id || !req.body || !res?.locals?.userId) return responseMessage(res, StatusCodes.LOCKED, "Needed id and body");
    const { id } = req.params;
    const body = req.body;
    const userId = res.locals.userId;

    const [user, systemUser] = await Promise.all([
      model.findById(id).exec(),
      model.findById(userId).exec()
    ])


    if (!user || !systemUser) return res.sendStatus(StatusCodes.NOT_FOUND);

    if (systemUser.role != ROLE_LIST.ADMIN && userId != id)
      return responseMessage(res, StatusCodes.FORBIDDEN, "You can change other people' profile")


    for (const key in body) {
      if (Object.prototype.hasOwnProperty.call(model.schema.paths, key)) {
        if (!body[key].length) continue;

        if (key == "role") {
          if (systemUser.role == ROLE_LIST.ADMIN) {

            if (user.role == ROLE_LIST.ADMIN && body.role != ROLE_LIST.ADMIN)
              return res.status(StatusCodes.FORBIDDEN).json({ message: "You can't downgrade admin status" });

            if (body.role == ROLE_LIST.ADMIN && user.role != ROLE_LIST.ADMIN)
              return res.status(StatusCodes.FORBIDDEN).json({ message: "You can't make others users admin" });

          } else {
            if (user.role != body.role)
              return res.status(StatusCodes.FORBIDDEN).json({ message: "You can't change your role" });
            continue;
          }

        }

        if (key == "password") {
          if (user.password.length < 2)
            return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: "Minimum two character password" });
          user[key] = await bcrypt.hash(body[key], 12);
          continue;
        }

        user[key] = body[key];
      }
    }

    await user.save();

    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.log(error)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}


/*

Get Current User by the 

*/
export const patchSiteValue = async (req: Request, res: Response, model: Model<any>) => {
  try {
    if (!req?.body) return responseMessage(res, StatusCodes.LOCKED, "Needed body");

    const body = req.body;

    const count = await model.countDocuments();

    if (count == 0) {
      await model.create({ ...body });
      return res.sendStatus(StatusCodes.CREATED);
    } else {
      const site = await model.find({});
      if (site?.length == 0) throw Error;
      const value = site[0];

      for (const key in body) {
        if (Object.prototype.hasOwnProperty.call(model.schema.paths, key)) {
          if (!body[key].length) continue;

          value[key] = body[key];
        }


      }
      await value.save();
    }

    res.sendStatus(StatusCodes.OK);
  } catch (error) {
    console.log(error)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}


/*

Get car_rent collection data

*/
export const getHeaderValueByIndex = async (req: Request, res: Response, model: Model<any>) => {
  try {
    if (!req?.params?.id) return responseMessage(res, StatusCodes.FORBIDDEN, "No param id");
    const id = Number(req.params.id);

    if (hasEnumList(id, PAGE_LIST)) {
      const header = await model.findOne({ index: id });
      if (!header) return responseMessage(res, StatusCodes.FORBIDDEN, "Couldn't find any header")
      return res.status(StatusCodes.OK).json({ header });
    }
    res.sendStatus(StatusCodes.NOT_ACCEPTABLE);
  } catch (error) {
    console.log(error)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}



/*

Add to parent model

*/

export const addToParentModel = async (parentModel: Model<any>, parentId: string, childId: String) => {
  if (parentModel && parentId && childId) {
    const parent = await parentModel.findById(parentId);
    if (!parent) throw Error;
    await parent.children.push(childId);
    await parent.save();
  } else throw Error;
}

export const deleteFromParentModel = async (parentModel: Model<any>, childId: String) => {
  if (parentModel && childId) {
    const parent = await parentModel.updateOne(
      { children: childId },
      { $pull: { children: childId } });
  } else throw Error;
}