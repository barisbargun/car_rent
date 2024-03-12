import { Router } from "express";
import refreshTokenController from "@/controllers/auth/refreshTokenController";
const router = Router();

router.get("/", refreshTokenController);

export default router;