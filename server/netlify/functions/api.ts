import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";

import serverless from "serverless-http";
import promise from "es6-promise";
import cookieParser from "cookie-parser";

import { dbConnect, corsOptions, rateLimitOptions } from "@/config";
import { credentials, verifyJWT } from "@/middleware";
import { auth, refresh, image, route, logout } from "@/routes";
import redis from "@/routes/redis";

promise.polyfill();

const app = express();
app.disable("x-powered-by");
app.use(rateLimitOptions);
app.use(helmet());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "1mb" }))
app.use(credentials);
app.use(cors(corsOptions));

app.use(cookieParser());

app.use("/api/redis", redis)

const mergedRouter = express.Router();

mergedRouter.use("/auth", auth);
mergedRouter.use("/refresh", refresh);
mergedRouter.use("/logout", verifyJWT, logout);
mergedRouter.use("/image", image);
mergedRouter.use("/", route);

app.use("/api", dbConnect, mergedRouter);

mongoose.connection.once('open', () => {
  console.log("connected to mongoDB")
})
app.listen(8080, () => console.log("listening 8080"));

export const handler = serverless(app);