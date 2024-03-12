import { Router } from "express";
import userAuthController from "@/controllers/auth/userAuthController";
const router = Router();

router.post("/", userAuthController);

export default router;