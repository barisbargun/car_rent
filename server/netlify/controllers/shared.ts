import { StatusCodes } from "http-status-codes";
import { Model } from "mongoose";
import { Header, Image, User } from "@/models";
import { Request, Response } from "express";
import { ROLE_LIST } from "@/constants/enum";
import bcrypt from "bcryptjs";
import { checkMaximumCount, responseMessage, setHeaderValues, setRedisValue } from "@/lib";
import { addToParentModel, deleteFromParentModel } from "./custom";




/*

Get data by the parameter id, 
checking if the model in the database, then returns the value.

*/
export const getData = async (req: Request, res: Response, model: Model<any>) => {
  if (!model || !req?.params?.id) return res.sendStatus(StatusCodes.FORBIDDEN);
  const { id } = req.params;
  try {
    const data = await model.findById(id, { password: 0 }).populate("img");
    if (!data) return res.sendStatus(StatusCodes.NOT_FOUND);
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}


/*

Get data by the model, 
returns the model's value.

*/
export const getAllData = async (_req: Request, res: Response, model: Model<any>) => {

  try {
    if (!model) return res.sendStatus(StatusCodes.FORBIDDEN);
    if (model == Header) await setHeaderValues(model);

    let data: any = model.find({}, { password: 0 });
    if (model.schema.paths.img)
      data = data.populate("img");
    if (model.schema.paths.logoImg)
      data = data.populate("logoImg");
    if (model.schema.paths.navImg)
      data = data.populate("navImg");
    if (model.schema.paths.serviceImg)
      data = data.populate("serviceImg");
    if (model.schema.paths.parent)
      data = data.populate("parent");

    if (model.schema.paths.children) {
      try {
        let data2 = data.clone();
        data2 = await data2.populate({ path: "children", populate: { path: "img"}});
        data = data2;
      } catch (error) {
        data = data.populate("children");
      }

    }

    data = await data;

    if (!data) return res.sendStatus(StatusCodes.NOT_FOUND);
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    console.log(error)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}


/*

Update data by the parameter id, 
checking if the model in the database, then deletes.

*/
export const createData = async (req: Request, res: Response, model: Model<any>, parentModel?: Model<any>) => {
  if (!model || !req?.body) return res.status(StatusCodes.FORBIDDEN);

  try {
    await checkMaximumCount(model);
  } catch (error: any) {
    if (error)
      return responseMessage(res, StatusCodes.LOCKED, error);
  }

  if (model == User && req?.body?.role == ROLE_LIST.ADMIN) return res.status(StatusCodes.FORBIDDEN).json({ message: "You can't create other admin users" });
  try {

    const imgField = model.schema.paths?.img
    const indexField = model.schema.paths?.index
    if (imgField) {
      if (!req.body.img && imgField.isRequired)
        return res.status(StatusCodes.PRECONDITION_FAILED).json({ message: "You must put an image" });
      if (req.body.img) {
        const hasImage = await Image.findById(req.body.img);
        if (!hasImage) return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: "No founded image in database" });
      }
    }

    if (indexField) {
      const maxIndex = (await model.findOne().sort({ index: -1 }))?.index;
      req.body.index = maxIndex ? maxIndex + 1 : 1;
    }

    if (req.body.password) {
      if (req.body.password?.length < 2)
        return responseMessage(res, StatusCodes.NOT_ACCEPTABLE, "At least 2 characters password length")
      req.body.password = await bcrypt.hash(req.body.password, 12);
      req.body.refreshToken = await bcrypt.hash(req.body?.username, 8);
    }

    let parent;
    if (parentModel) {
      const parentId = req.body.parent;
      if (!parentId) return responseMessage(res, StatusCodes.NOT_ACCEPTABLE, "No parent id");
      parent = await parentModel.findById(parentId);
      if (!parent) return responseMessage(res, StatusCodes.NOT_ACCEPTABLE, "No parent found by given id");
    }

    const child = await model.create({
      ...req.body
    });
    if (parent)
      await addToParentModel(parentModel!, req.body.parent, child.id)

    if (model != User) setRedisValue();

    res.sendStatus(StatusCodes.CREATED);
  } catch (error) {
    res.sendStatus(StatusCodes.FORBIDDEN);
  }
}


/*

Update data by the parameter id
If the model has given body(req.body.name) will be change.
If the model has an image and given body has a img will be change.

*/
export const patchData = async (req: Request, res: Response, model: Model<any>, parentModel?: Model<any>) => {
  if (!model || !req?.params?.id || !req?.body) return res.status(StatusCodes.FORBIDDEN).json({ message: "Needed model, params.id, body" });
  const { id } = req.params;
  const body = req.body;

  try {
    const item = await model.findById(id).exec();
    if (!item) return res.status(StatusCodes.NOT_FOUND).json({ message: "No founded Model" })

    for (const key in body) {
      if (Object.prototype.hasOwnProperty.call(model.schema.paths, key)) {
        // if (!body[key].length) continue;

        if (key == "img" && item.img != body.img) {
          const hasImg = await Image.findById(body.img);
          if (!hasImg) return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: "No founded image in database" });
        }
        item[key] = body[key];

      }
    }
    await item.save();

    if (parentModel && model.schema.paths.parent) {
      try {
        await deleteFromParentModel(parentModel, id);
        await addToParentModel(parentModel, item.parent, id);
      } catch (error) {

      }
    }

    if (model != User) setRedisValue();

    res.sendStatus(StatusCodes.OK);
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}


/*

Update data by the parameter id, 
checking if the model in the database, then deletes.

*/
export const deleteData = async (req: Request, res: Response, model: Model<any>, parentModel?: Model<any>, childrenModel?: Model<any>) => {
  if (!model || !req?.params?.id) return res.sendStatus(StatusCodes.FORBIDDEN);
  const { id } = req.params;

  try {
    const item = await model.findById(id).exec();

    if (!item) return res.sendStatus(StatusCodes.NOT_ACCEPTABLE)

    if (item.role == ROLE_LIST.ADMIN) {
      return responseMessage(res, StatusCodes.FORBIDDEN, "You can't delete admin users");
    }

    try {
      if (model.schema.paths.parent && parentModel) {
        await deleteFromParentModel(parentModel, id);
      }

      if (model.schema.paths.children && childrenModel) {
        await childrenModel.deleteMany({ _id: { $in: item.children } })
      }
    } catch { }

    await item.deleteOne();

    if (model != User) setRedisValue();
    res.sendStatus(StatusCodes.OK);
  } catch (error) {
    console.log(error)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}


/*

Change all indexes by the list.
Head of the list's index will be 1 and last's index will be list's count.

*/
export const moveData = async (req: Request, res: Response, model: Model<any>) => {
  if (
    !model ||
    !req?.body?.list?.length ||
    !Object.prototype.hasOwnProperty.call(model.schema.paths, "index")
  ) return res.sendStatus(StatusCodes.FORBIDDEN);

  const { list }: { list: string[] } = req.body;

  try {
    let models = [];
    for (let i = 0; i < list.length; i++) {
      models.push(model.findById(list[i]));
    }
    models = await Promise.all(models);

    let updateModels = [];
    for (let i = 0; i < models.length; i++) {
      let model = models[i];
      if (!model) throw Error;
      model.index = i + 1;
      updateModels.push(model.save());
    }

    await Promise.all(updateModels);
    if (model != User) setRedisValue();
    res.sendStatus(StatusCodes.OK);
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}



