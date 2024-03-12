import { Router } from "express";
import { createImage, deleteImage, getImages } from "@/controllers/imageController";
import { verifyEditorRole } from "@/middleware/verifyRoles";
import { verifyJWT } from "@/middleware";
const router = Router();

router.get(``, (req, res) => getImages(req, res));
router.post(`/`, verifyJWT, verifyEditorRole, createImage);
router.delete(`/:id`, verifyJWT, verifyEditorRole, deleteImage);

export default router;