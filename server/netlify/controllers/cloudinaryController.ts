import { UploadApiOptions, v2 as cloudinary } from 'cloudinary';
import * as dotenv from "dotenv";
import { Request } from 'express';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

export const _uploadImage = async (req: Request) => {
  const { imgUrl, file, width, height, x, y } = req.body;
  if (imgUrl.length < 10) throw Error;

  let cropOptions: { width?: number, height?: number, crop?: string, x?: number, y?: number } = {};
  if (width >= 5 && width <= 15000) cropOptions.width = width;
  else throw Error;

  if (height >= 5 && height <= 15000) cropOptions.height = height;
  else throw Error;

  if (x) cropOptions.x = x;

  if (y) cropOptions.y = y;

  const options: UploadApiOptions = {
    use_filename: true,
    overwrite: true,
    unique_filename: true,
    transformation: { quality: "70", crop: "crop", fetch_format: "avif", ...cropOptions }
  };
  const result = await cloudinary.uploader.upload(imgUrl, options);
  return { imgUrl: result.secure_url, id: result.public_id };
};

export const _delImage = async (public_id: string) => {
  await cloudinary.uploader.destroy(public_id);
}