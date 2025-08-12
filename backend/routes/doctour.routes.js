import express from "express"
import { doctorLogin } from "../controllers/doctor.controller.js"

const doctorRouter = express.Router()

doctorRouter.post('/doctor-login', doctorLogin)

export default doctorRouter