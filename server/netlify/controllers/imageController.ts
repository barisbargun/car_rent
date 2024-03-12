import { _uploadImage, _delImage } from "./cloudinaryController";
import { Image } from "@/models/index";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { checkMaximumCount, responseMessage } from "@/lib";


/*

Get data by the imgId 

*/
export const getImages = async (req: Request, res: Response) => {
  try {

    const data = await Image.find({});
    if (!data) return res.sendStatus(StatusCodes.NOT_FOUND);
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}


/*

Add image cloud and database, if it fails deletes from cloud.
Returns model id.

*/
export const createImage = async (req: Request, res: Response) => {
  if (req?.body?.imgUrl?.length < 10) return res.sendStatus(StatusCodes.FORBIDDEN);

  try {
    try {
      await checkMaximumCount(Image);
    } catch (error: any) {
      if (error)
        return responseMessage(res, StatusCodes.LOCKED, error);
    }

    const uploadImg = await _uploadImage(req);
    try {
      const img = await Image.create({ index: req.body.index, imgUrl: uploadImg.imgUrl, publicId: uploadImg.id });
      return res.status(StatusCodes.CREATED).json({ id: img.id });
    } catch (error) {

      await _delImage(uploadImg.id);
      return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  } catch (error) {
    console.log(error)
    return res.sendStatus(StatusCodes.NOT_ACCEPTABLE)
  }
}



/*

Checking if the image in the database
Then deletes with Promise.allSettled()

*/
export const deleteImage = async (req: Request, res: Response) => {
  if (!req?.params?.id) return res.sendStatus(StatusCodes.FORBIDDEN);
  try {

    const img = await Image.findById(req.params.id);
    if (img) {
      await Promise.allSettled([
        _delImage(img.publicId),
        img.deleteOne()
      ])
      return res.status(StatusCodes.OK).json({ id: img.id });

    } else return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);

  } catch (error) {
    res.sendStatus(StatusCodes.NOT_ACCEPTABLE)
  }
}
