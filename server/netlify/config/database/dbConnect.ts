import { NextFunction } from "express";
import { Request, Response } from "express";
import mongoose from "mongoose";

const dbConnect = async (req?: Request, res?: Response, next?: NextFunction) => {
    mongoose.set("strictQuery", true);
    mongoose.set('toJSON', {
        virtuals: true,
        transform: (doc, converted) => {
            delete converted._id;
        }
    });
    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            dbName: "car_rent"
        });
        if (next) next();

    } catch (error) {
        console.log(error);
    }
}

export default dbConnect;