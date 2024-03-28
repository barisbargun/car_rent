import { Router } from "express";
import redis from "@/controllers/redis";
const router = Router();

router.get("/", redis);

export default router;