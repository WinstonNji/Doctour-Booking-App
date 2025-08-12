import { addDoctor } from "../controllers/admin.controller.js";
import { adminLogin } from "../controllers/admin.controller.js";
import upload from "../middlewares/multer.js";
import express from "express"
import { authentificateAdmin } from "../middlewares/admin.authentification.js";

const router = express.Router()

router.post('/add-doctor', authentificateAdmin , upload.single('image'), addDoctor)
router.post('/login', adminLogin)

export default router

