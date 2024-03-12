import { Router } from "express";
import logoutController from "@/controllers/auth/logoutController";
const router = Router();

router.post("/", logoutController);

export default router;