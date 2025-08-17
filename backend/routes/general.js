import { getAllDoctors } from "../controllers/general.js";
import express from 'express'
const generalRoute = express.Router()

generalRoute.get('/getAllDoctors', getAllDoctors)

export default generalRoute